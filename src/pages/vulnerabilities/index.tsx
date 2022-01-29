import React, {useState, useCallback, useEffect} from 'react';

import styled from 'styled-components'

import {Frame, Page, Card, ResourceList, ResourceItem, TextStyle, Avatar, TextField, Filters, Button, ResourceListSelectedItems, Tooltip, Stack} from '@shopify/polaris';
import {Icon} from '@shopify/polaris';
import {CircleAlertMajor, InfoMinor} from '@shopify/polaris-icons';



import Sidebar from '../../components/sidebar/index';

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
    id: number;
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
    const [taggedWith, setTaggedWith] = useState('High');
    const [queryValue, setQueryValue] = useState('');

    const [items, setItems] = useState([
        {
            id: 1,
            url: "https://github.com/advisories/GHSA-c36v-fmgq-m8hx",
            name: "CVE-2021-3757",
            description: "immer is vulnerable to Improperly Controlled Modification of Object Prototype Attributes ('Prototype Pollution')",
            priority: Priority.High,
            patchAvailable: false,
            devicesAffected: 26,
          },
          {
            id: 12122,
            url: "https://github.com/advisories/GHSA-c36v-fmgq-m8hx",
            name: "CVE-2021-3754",
            description: "immer is vulnerable to Improperly Controlled Modification of Object Prototype Attributes ('Prototype Pollution')",
            priority: Priority.Medium,
            patchAvailable: true,
            devicesAffected: 64,
          },
    ]);

    const handleTaggedWithChange = useCallback(
      (value) => setTaggedWith(value),
      [],
    );
    const handleQueryValueChange = useCallback(
      (value) => setQueryValue(value),
      [],
    );
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

    useEffect(() => {
        let key = "priority" as keyof VulnerabilityItem;
        if(sortValue.startsWith("PRIORITY")){
            key = "priority" as keyof VulnerabilityItem;
        }
        let direction = 1
        if(sortValue.endsWith("DESC")){
            direction = -1;
        }
        const sorted = [...items].sort((a, b) => {
            return a[key] > b[key] ? 1 * direction : -1 * direction;
        });

        setItems(sorted);
    }, [sortValue, setItems])
  
    const promotedBulkActions = [
      {
        content: 'Edit customers',
        onAction: () => console.log('Todo: implement bulk edit'),
      },
    ];
  
    const bulkActions = [
      {
        content: 'Add tags',
        onAction: () => console.log('Todo: implement bulk add tags'),
      },
      {
        content: 'Remove tags',
        onAction: () => console.log('Todo: implement bulk remove tags'),
      },
      {
        content: 'Delete customers',
        onAction: () => console.log('Todo: implement bulk delete'),
      },
    ];
  
    const filters = [
      {
        key: 'taggedWith3',
        label: 'Tagged with',
        filter: (
          <TextField
            label="Tagged with"
            value={taggedWith}
            onChange={handleTaggedWithChange}
            autoComplete="off"
            labelHidden
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
        <div style={{paddingLeft: '8px'}}>
          <Button onClick={() => console.log('New filter saved')}>Save</Button>
        </div>
      </Filters>
    );
  
    return (
    <Frame navigation={<Sidebar />}>
        <Page title="Vulnerabilties">
        
        <Card>
            <ResourceList
            resourceName={resourceName}
            items={items}
            renderItem={renderItem}
            selectedItems={selectedItems}
            onSelectionChange={(v) => setSelectedItems(v as ResourceListSelectedItems)}
            promotedBulkActions={promotedBulkActions}
            bulkActions={bulkActions}
            sortValue={sortValue}
            sortOptions={[
                {label: 'Highest Priority', value: 'PRIORITY_ASC'},
                {label: 'Lowest Priority', value: 'PRIORITY_DESC'},
            ]}
            onSortChange={(selected) => {
                setSortValue(selected);
                console.log(selected);
            }}
            filterControl={filterControl}
            />
        </Card>
        </Page>
    </Frame>
        
      
    );

    function renderItem(item: VulnerabilityItem) {
      const {id, url, name, description, priority, devicesAffected, patchAvailable} = item;
      const media = <Icon source={CircleAlertMajor} color={priority == Priority.High ? "critical" : (priority == Priority.Medium ? "warning" : "success")} backdrop/>;
    // const media = <Avatar initials={String(id)}/>
      return (
        <ResourceItem
          id={String(id)}
          url={url}
          media={media}
          accessibilityLabel={`View details for ${name}`}
          persistActions
        >
            <Stack distribution="fillEvenly" spacing="extraLoose">
                <div>
                    <CVEHeading>
                        <TextStyle variation="strong">{name}</TextStyle>
                        <Icon source={InfoMinor} color="subdued" />
                    </CVEHeading>
                    <CVESubtext>
                        <Tooltip content={description}>
                            <TextStyle variation="subdued">{description}</TextStyle>
                        </Tooltip>
                    </CVESubtext>
                </div>
                <div>
                    <Stack distribution="fill" spacing="extraLoose">
                    <div>
                        {devicesAffected} device(s)
                    </div>
                    <div>
                        {patchAvailable ? "Patch Available" : "No Patch Available"}
                    </div>
                    </Stack>
                </div>
                
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
  
    function isEmpty(value: string | Array<any>) {
      if (Array.isArray(value)) {
        return value.length === 0;
      } else {
        return value === '' || value == null;
      }
    }
  }

export default Vulnerabilities;
