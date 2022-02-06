import React, {useState, useCallback, useEffect} from 'react';

import styled from 'styled-components'

import {Page} from '@shopify/polaris';


import Logout from '../../components/logout/index';
import NavigationFrame from '../../components/frame/index';


function Settings() {

  return (
    <NavigationFrame>
        <Page title="Settings">
          <Logout />
        </Page>
    </NavigationFrame>
    );
  
  }

export default Settings;
