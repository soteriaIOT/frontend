import React, {useState, useCallback, useEffect} from 'react';

import styled from 'styled-components'

import {Frame, TopBar} from '@shopify/polaris';


import Sidebar from '../../components/sidebar/index';


function NavigationFrame({children}: {children: React.ReactNode}) {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive,
      ),
    [],
  );

  return (
    <Frame 
        navigation={<Sidebar />} 
        topBar={<TopBar showNavigationToggle onNavigationToggle={toggleMobileNavigationActive}/>} 
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigationActive}
    >
        {children}
    </Frame>
    );
  
  }

export default NavigationFrame;
