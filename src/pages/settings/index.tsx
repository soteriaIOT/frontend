import React, {useState, useCallback, useEffect} from 'react';

import styled from 'styled-components'

import {Frame, Page} from '@shopify/polaris';


import Sidebar from '../../components/sidebar/index';
import Logout from '../../components/logout/index';


function Settings() {
  
    return (
    <Frame navigation={<Sidebar />}>
        <Page title="Settings">
          <Logout />
        </Page>
    </Frame>
    );
  
  }

export default Settings;
