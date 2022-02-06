import React, {useState, useCallback, useEffect} from 'react';

import styled from 'styled-components'

import {Page} from '@shopify/polaris';


import NavigationFrame from '../../components/frame';


function Home() {
    return <NavigationFrame>
        <Page title="Home"></Page>
    </NavigationFrame>
  }

export default Home;
