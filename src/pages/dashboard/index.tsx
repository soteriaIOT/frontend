import React, {useState, useCallback, useEffect} from 'react';

import styled from 'styled-components'

import {Frame, Page} from '@shopify/polaris';

import { useParams } from 'react-router';


import Sidebar from '../../components/sidebar/index';


function Dashboard() {
  
  const { device_id } = useParams();
    
    return (
    <Frame navigation={<Sidebar />}>
        <Page title="Dashboard">
            <h1>{device_id && device_id}</h1>
        </Page>
    </Frame>
    );
  
  }

export default Dashboard;
