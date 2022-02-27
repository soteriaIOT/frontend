import React, {useState, useCallback, useEffect} from 'react';

import styled from 'styled-components'

import {Frame, TopBar} from '@shopify/polaris';


import Sidebar from '../../components/sidebar/index';

import useWindowDimensions from '../../hooks/useWindowDimensions';


function NavigationFrame({children}: {children: React.ReactNode}) {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive,
      ),
    [],
  );

  const { height, width } = useWindowDimensions();

  return (
    <Frame 
        navigation={<Sidebar />} 
        topBar={width <= 768 ? <TopBar showNavigationToggle onNavigationToggle={toggleMobileNavigationActive}/> : null} 
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigationActive}
    >
        {children}
    </Frame>
    );
  
  }

export default NavigationFrame;
