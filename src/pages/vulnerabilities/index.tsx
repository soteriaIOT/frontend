import React, {useState, useCallback, useEffect} from 'react';

import styled from 'styled-components'

import {Page, Card, ResourceList, ResourceItem, TextStyle, Select, Filters, ResourceListSelectedItems, Tooltip, Stack, EmptyState} from '@shopify/polaris';
import {Icon} from '@shopify/polaris';
import {CircleAlertMajor, InfoMinor} from '@shopify/polaris-icons';

import {gql, useQuery, useMutation} from '@apollo/client';

import loadingV from '../../assets/loading_vulnerabilities.png';



import NavigationFrame from '../../components/frame';

enum Priority {
    High=1,
    Medium=2,
    Low=3
}

const VulnerabilityItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const CVEHeading = styled(Stack)`
.Polaris-Icon{
    margin: 0;
    margin-left: 1%;
}
`

const CVESubtext = styled.div`
max-width: 40ch;
white-space: nowrap;
overflow: hidden !important;
text-overflow: ellipsis;
`

interface VulnerabilityItem {
    id: string;
    url: string;
    name: string;
    description: string;
    priority: Priority;
    patchAvailable: boolean;
    devicesAffected: number;
}


function Vulnerabilities() {
    const [selectedItems, setSelectedItems] = useState<ResourceListSelectedItems>([]);
    const [sortValue, setSortValue] = useState('PRIORITY_ASC');
    const [taggedWith, setTaggedWith] = useState('');
    const [queryValue, setQueryValue] = useState('');
    const [filteredItems, setFilteredItems] = useState<VulnerabilityItem[]>([]);

    let { loading, error, data, refetch } = useQuery(gql`
      query {
        vulnerabilities {
          id
          dependency {
            name
          }
          severity
          key_is_patched
          patch_available
          permalink
          summary
          devices_affected {
            id
          }
        }
      }
    `);

    const [updateVulnerabilitiesMutation, {}] = useMutation(gql`mutation UpdateVulnerabilities($ids: [ID!]!){
      updateVulnerabilities(input:$ids){
        id
        name
        dependency {
          name
        }
      },
    }
    `, {
    });

    useEffect(() => {
        if (data) {
          let k = data.vulnerabilities.map((item: any) => {
                return {
                  id: String(item.id),
                  url: item.permalink,
                  name: item.dependency.name,
                  description: item.summary,
                  priority: item.severity === 'HIGH' ? Priority.High : item.severity === 'MODERATE' ? Priority.Medium : Priority.Low,
                  patchAvailable: item.patch_available,
                  devicesAffected: item.devices_affected.length
                }
             });
          setItems(k);
          setFilteredItems(k);
        }
    }, [loading, error, data]);

    const [items, setItems] = useState<VulnerabilityItem[]>([]);

    const handleTaggedWithChange = useCallback(
      (value) => setTaggedWith(value),
      [],
    );
    const handleQueryValueChange = useCallback(
      (value) => setQueryValue(value),
      [],
    );

    useEffect(() => {
      let filteredItems = items.filter(item => {
          if (queryValue) {
              return item.name.toLowerCase().includes(queryValue.toLowerCase());
          }
          return true;
      });

      if (taggedWith) {
        filteredItems = filteredItems.filter(item => {
            switch(taggedWith) {
                case 'High': return item.priority === Priority.High;
                case 'Medium': return item.priority === Priority.Medium;
                case 'Low': return item.priority === Priority.Low;
                default: return "true";
            }
          });
      }

      let key = "priority" as keyof VulnerabilityItem;
      if(sortValue.startsWith("PRIORITY")){
          key = "priority" as keyof VulnerabilityItem;
      }
      let direction = 1
      if(sortValue.endsWith("DESC")){
          direction = -1;
      }
      const sorted = [...filteredItems].sort((a, b) => {
          return a[key] > b[key] ? 1 * direction : -1 * direction;
      });

      setFilteredItems(sorted);
  }, [queryValue, taggedWith, sortValue, setFilteredItems, items])

    const handleTaggedWithRemove = useCallback(() => setTaggedWith(''), []);
    const handleQueryValueRemove = useCallback(() => setQueryValue(''), []);
    const handleClearAll = useCallback(() => {
      handleTaggedWithRemove();
      handleQueryValueRemove();
    }, [handleQueryValueRemove, handleTaggedWithRemove]);

    const resourceName = {
      singular: 'vulnerability',
      plural: 'vulnerabilities',
    };

    const promotedBulkActions = [
      {
        content: 'Update vulnerabilities',
        onAction: () => {
          updateVulnerabilitiesMutation({
            variables: {
              ids:selectedItems,
            },
          })
          refetch()
        }
      },
    ]

    const options = [
      {label: 'High', value:'High'},
      {label: 'Medium', value: 'Medium'},
      {label: 'Low', value: 'Low'},
    ];

    const filters = [
      {
        key: 'taggedWith3',
        label: 'Tagged with',
        filter: (
          <Select
            label="Priority"
            options={options}
            onChange={handleTaggedWithChange}
            value={taggedWith}
          />
        ),
        shortcut: true,
      },
    ];

    const appliedFilters = !isEmpty(taggedWith)
      ? [
          {
            key: 'taggedWith3',
            label: disambiguateLabel('taggedWith3', taggedWith),
            onRemove: handleTaggedWithRemove,
          },
        ]
      : [];

    const filterControl = (
      <Filters
        queryValue={queryValue}
        filters={filters}
        appliedFilters={appliedFilters}
        onQueryChange={handleQueryValueChange}
        onQueryClear={handleQueryValueRemove}
        onClearAll={handleClearAll}
      >
      </Filters>
    );

    const emptyStateMarkup =
    loading ? (
      <EmptyState
        heading="Loading vulnerabilities"
        image={loadingV}
      >
        <p>
          We're fetching the vulnerabilities for you.
        </p>
      </EmptyState>
    ) : (
        !appliedFilters.length && !items.length ? (
          <EmptyState
            heading="No vulnerabilities found"
            image={loadingV}
          >
            <p>
              Try changing up the filters or check back later.
            </p>
          </EmptyState>
        ) : undefined
    )

    return (
    <NavigationFrame>
        <Page title="Vulnerabilties">

        <Card>
            <ResourceList
              resourceName={resourceName}
              items={filteredItems}
              isFiltered={filteredItems.length != items.length}
              renderItem={renderItem}
              emptyState={emptyStateMarkup}
              selectedItems={selectedItems}
              onSelectionChange={(v) => setSelectedItems(v as ResourceListSelectedItems)}
              promotedBulkActions={promotedBulkActions}
              sortValue={sortValue}
              sortOptions={[
                  {label: 'Highest Priority', value: 'PRIORITY_ASC'},
                  {label: 'Lowest Priority', value: 'PRIORITY_DESC'},
              ]}
              onSortChange={(selected) => {
                  setSortValue(selected);
              }}
              filterControl={filterControl}
              resolveItemId={resolveItemIds}
            />
        </Card>
        </Page>
    </NavigationFrame>


    );

    function renderItem(item: VulnerabilityItem) {
      const {id, url, name, description, priority, devicesAffected, patchAvailable} = item;
      const media = <Icon source={CircleAlertMajor} color={priority == Priority.High ? "critical" : (priority == Priority.Medium ? "warning" : "success")} backdrop/>;
      return (
        <ResourceItem
          id={String(id)}
          url={url}
          external={true}
          media={media}
          accessibilityLabel={`View details for ${name}`}
          persistActions
          verticalAlignment="center"
        >
            <Stack distribution="fillEvenly" spacing="extraLoose">
              <Stack.Item fill>
                    <CVEHeading>
                        <TextStyle variation="strong">{name}</TextStyle>
                        <Icon source={InfoMinor} color="subdued" />
                    </CVEHeading>
                    <CVESubtext>
                        <Tooltip content={description}>
                            <TextStyle variation="subdued">{description}</TextStyle>
                        </Tooltip>
                    </CVESubtext>
              </Stack.Item>
              <Stack distribution="fill" spacing="extraLoose" alignment="center">
                <Stack.Item>
                    {devicesAffected} device(s)
                </Stack.Item>
                <Stack.Item>
                    {patchAvailable ? "Patch Available" : "No Patch Available"}
                </Stack.Item>
              </Stack>

            </Stack>


        </ResourceItem>
      );
    }

    function disambiguateLabel(key: string, value: string) {
      switch (key) {
        case 'taggedWith3':
          return `Tagged with ${value}`;
        default:
          return value;
      }
    }

    function resolveItemIds({id}: VulnerabilityItem) {
      return String(id);
    }

    function isEmpty(value: string | Array<any>) {
      if (Array.isArray(value)) {
        return value.length === 0;
      } else {
        return value === '' || value == null;
      }
    }
  }

export default Vulnerabilities;
