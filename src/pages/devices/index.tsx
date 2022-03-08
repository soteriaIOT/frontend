import React, {useState, useCallback, useEffect, Fragment} from 'react';

import styled from 'styled-components'

import {Page, Card, ResourceList, ResourceItem, TextStyle, Filters, ResourceListSelectedItems, EmptyState, FilterInterface, AppliedFilterInterface, Toast, Tooltip} from '@shopify/polaris';
import {Icon} from '@shopify/polaris';
import {CircleAlertMajor} from '@shopify/polaris-icons';


import {gql, useQuery} from '@apollo/client';

import loadingD from '../../assets/loading_devices.png';


import NavigationFrame from '../../components/frame';

enum DeviceStatus {
    Normal=1,
    Warning=2,
    Error=3
}

interface Dependency {
  name: string;
  version: string;
}

interface VulnerabilityItem {
  name: string;
  summary: string;
}


interface DeviceItem {
    id: string;
    url: string;
    name: string;
    status: DeviceStatus;
    dependencies: Dependency[];
    vulnerabilitiesAffecting: number;
    vulnerabilityItems: VulnerabilityItem[];
}


function Devices() {
    const [selectedItems, setSelectedItems] = useState<ResourceListSelectedItems>([]);
    const [queryValue, setQueryValue] = useState('');

    const [filteredItems, setFilteredItems] = useState<DeviceItem[]>([]);

    const [active, setActive] = useState(false);

    const toggleActive = useCallback(() => setActive((active) => !active), []);

    const toastMarkup = active ? (
      <Toast content="Checking for vulnerabilities asynchronously, check back later to see the results" onDismiss={toggleActive} />
    ) : null;


    const { loading, error, data } = useQuery(gql`
      query {
        devices {
          id
          name
          dependencies {
            name
            version
          }
          vulnerabilities {
            name
            summary
            dependency {
              name
            }
          }
        }
      }
    `);

    useEffect(() => {
      if (data) {
        let k = data.devices.map((item: any) => {
              return {
                id: item.id,
                name: item.name,
                url: `/dashboard/${item.id}`,
                dependencies: item.dependencies,
                vulnerabilitiesAffecting: item.vulnerabilities.length,
                vulnerabilityItems: item.vulnerabilities,
                status: item.vulnerabilities.length == 0 ? DeviceStatus.Normal : item.vulnerabilities.length < 2 ? DeviceStatus.Warning : DeviceStatus.Error,
              }
            });
        k.sort((a: DeviceItem, b: DeviceItem) => {
          if (a.vulnerabilitiesAffecting > b.vulnerabilitiesAffecting) {
            return -1;
          }
          if (a.vulnerabilitiesAffecting < b.vulnerabilitiesAffecting) {
            return 1;
          }
          return 0;
        });
        setItems(k);
        setFilteredItems(k);
      }
      if(loading || error){
        console.log(loading, error)
      }
    }, [loading, error, data]);

    const [items, setItems] = useState<DeviceItem[]>([]);


    useEffect(() => {
        const filteredItems = items.filter(item => {
            if (queryValue) {
                return item.name.toLowerCase().includes(queryValue.toLowerCase());
            }
            return true;
        });
        setFilteredItems(filteredItems);
    }, [queryValue, items])

    
    const handleQueryValueChange = useCallback(
      (value) => setQueryValue(value),
      [],
    );
    const handleQueryValueRemove = useCallback(() => setQueryValue(''), []);
    const handleClearAll = useCallback(() => {
      handleQueryValueRemove();
    }, [handleQueryValueRemove]);
  
    const resourceName = {
      singular: 'device',
      plural: 'devices',
    };
  
    const promotedBulkActions = [
      {
        content: 'Check for vulnerabilities',
        onAction: () => {console.log('Todo: implement check'); setSelectedItems([]); toggleActive();},
      },
    ];

  
    const filters: FilterInterface[] = [];
  
    const appliedFilters: AppliedFilterInterface[] = []
  
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
        heading="Loading devices"
        image={loadingD}
      >
        <p>
          We're fetching the devices for you.
        </p>
      </EmptyState>
    ) : (
        !appliedFilters.length && !items.length ? (
          <EmptyState
            heading="No devices found"
            image={loadingD}
          >
            <p>
              Try changing up the filters or check back later.
            </p>
          </EmptyState>
        ) : undefined
    )
  
    return (
    <NavigationFrame>
        <Page title="Devices">
          <Card>
              <ResourceList
              resourceName={resourceName}
              items={filteredItems}
              renderItem={renderItem}
              emptyState={emptyStateMarkup}
              selectedItems={selectedItems}
              onSelectionChange={(v) => setSelectedItems(v as ResourceListSelectedItems)}
              promotedBulkActions={promotedBulkActions}
              filterControl={filterControl}
              />
          </Card>
          {toastMarkup}
        </Page>
    </NavigationFrame>
        
      
    );

    function renderItem(item: DeviceItem) {
      const {id, url, name, vulnerabilitiesAffecting, status, vulnerabilityItems} = item;
      const media = <Icon source={CircleAlertMajor} color={status == DeviceStatus.Error ? "critical" : (status == DeviceStatus.Warning ? "warning" : "success")} backdrop/>;
      const description = <Fragment><p>Current device vulns.</p>{vulnerabilityItems.map((vulnerability: VulnerabilityItem) => {
        return <p key={vulnerability.summary}><TextStyle variation="strong">{vulnerability.name}</TextStyle> with {vulnerability.summary}</p> 
      })}</Fragment>;
      return (
        <ResourceItem
          id={String(id)}
          url={url}
          media={media}
          accessibilityLabel={`View details for ${name}`}
          persistActions
          verticalAlignment="center"
        >
          <TextStyle variation="strong">{name}</TextStyle>
          <br />
          <Tooltip content={description}>
            <TextStyle variation="subdued">{vulnerabilitiesAffecting} {vulnerabilitiesAffecting > 1 ? "vulnerabilities": "vulnerability"} affecting</TextStyle>
          </Tooltip>
        </ResourceItem>
      );
    }
  
  }

export default Devices;
