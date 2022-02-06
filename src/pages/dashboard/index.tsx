import React, {useState, useCallback, useEffect} from 'react';

import styled from 'styled-components'

import {Frame, Page} from '@shopify/polaris';

import { useParams } from 'react-router';


import NavigationFrame from '../../components/frame';


function Dashboard() {
  
  const { device_id } = useParams();
    
    return (
    <NavigationFrame>
        <Page title="Dashboard">
            <h1>{device_id && device_id}</h1>
        </Page>
    </NavigationFrame>
    );
  
  }

export default Dashboard;
