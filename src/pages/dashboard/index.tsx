import React, {useState, useCallback, useEffect} from 'react';

import styled from 'styled-components'

import {Frame, Page} from '@shopify/polaris';

import { useParams } from 'react-router';


import NavigationFrame from '../../components/frame';


function Dashboard() {
  
  const { device_id } = useParams();
    
    return (
    <NavigationFrame>
        <iframe src='http://AWS_IPV4_GOES_HERE:3000/d/bOYL0Bf7k/test-dashboard?orgId=2&from=1645499234224&to=1645500487912' width='100%' height='100%'/>
    </NavigationFrame>
    );
  
  }

export default Dashboard;
