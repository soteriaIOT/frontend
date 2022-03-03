import React, {useState, useCallback, useEffect} from 'react';

import styled from 'styled-components'

import {Frame, Page} from '@shopify/polaris';

import { useParams } from 'react-router';


import NavigationFrame from '../../components/frame';


function Dashboard() {
  
  const { device_id } = useParams();
    
    return (
    <NavigationFrame>
      <iframe src='https://soteria-metrics.ml/d/bOYL0Bf7k/device-data?orgId=2' width='98%' height='95%' style={{margin: "1%"}}/>
    </NavigationFrame>
    );
  
  }

export default Dashboard;
