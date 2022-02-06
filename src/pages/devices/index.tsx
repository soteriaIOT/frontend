import React, {useState, useCallback, useEffect} from 'react';

import styled from 'styled-components'

import {Frame, Page, Card, ResourceList, ResourceItem, TextStyle, Avatar, TextField, Filters, Button, ResourceListSelectedItems, Tooltip, Stack, FilterInterface, AppliedFilterInterface} from '@shopify/polaris';
import {Icon} from '@shopify/polaris';
import {CircleAlertMajor, InfoMinor} from '@shopify/polaris-icons';



import Sidebar from '../../components/sidebar/index';

enum DeviceStatus {
    Normal=1,
    Warning=2,
    Error=3
}

const DVCHeading = styled(Stack)`
.Polaris-Icon{
    margin: 0;
    margin-left: 1%;
}
`

const DVCSubtext = styled.div`
max-width: 40ch;
white-space: nowrap;
overflow: hidden !important;
text-overflow: ellipsis;
`

interface DeviceItem {
    id: string;
    url: string;
    name: string;
    status: DeviceStatus
    vulnerabilitiesAffecting: number;
}


function Devices() {
    const [selectedItems, setSelectedItems] = useState<ResourceListSelectedItems>([]);
    const [sortValue, setSortValue] = useState('PRIORITY_ASC');
    const [queryValue, setQueryValue] = useState('');

    const [filteredItems, setFilteredItems] = useState<DeviceItem[]>([]);

    const [items, setItems] = useState([
        {
            id: "1",
            url: "/dashboard/DVC-2021-3757",
            name: "DVC-2021-3757",
            vulnerabilitiesAffecting: 2,
            status: DeviceStatus.Normal,
          },
          {
            id: "12122",
            url: "/dashboard/DVC-2021-3754",
            name: "DVC-2021-3754",
            vulnerabilitiesAffecting: 3,
            status: DeviceStatus.Warning,
          },
          {
            id: "12122",
            url: "/dashboard/DVC-2021-3758",
            name: "DVC-2021-3758",
            vulnerabilitiesAffecting: 10,
            status: DeviceStatus.Error,
          },
    ]);

    useEffect(() => {
        const filteredItems = items.filter(item => {
            if (queryValue) {
                return item.name.toLowerCase().includes(queryValue.toLowerCase());
            }
            return true;
        });
        setFilteredItems(filteredItems);
    }, [queryValue])

    
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
        content: 'Patch devices',
        onAction: () => console.log('Todo: implement patch devices'),
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
        <div style={{paddingLeft: '8px'}}>
          <Button onClick={() => console.log('New filter saved')}>Save</Button>
        </div>
      </Filters>
    );
  
    return (
    <Frame navigation={<Sidebar />}>
        <Page title="Devices">
        <Card>
            <ResourceList
            resourceName={resourceName}
            items={filteredItems}
            renderItem={renderItem}
            selectedItems={selectedItems}
            onSelectionChange={(v) => setSelectedItems(v as ResourceListSelectedItems)}
            promotedBulkActions={promotedBulkActions}
            sortValue={sortValue}
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

    function renderItem(item: DeviceItem) {
      const {id, url, name, vulnerabilitiesAffecting, status} = item;
      const media = <Icon source={CircleAlertMajor} color={status == DeviceStatus.Error ? "critical" : (status == DeviceStatus.Warning ? "warning" : "success")} backdrop/>;
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
          <TextStyle variation="subdued">{vulnerabilitiesAffecting} {vulnerabilitiesAffecting > 1 ? "vulnerabilities": "vulnerability"} affecting</TextStyle>
        </ResourceItem>
      );
    }
  
  }

export default Devices;
