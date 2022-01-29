import React, {useState, useCallback, useEffect} from 'react';

import styled from 'styled-components'

import {Frame, Page, Card, ResourceList, ResourceItem, TextStyle, Avatar, TextField, Filters, Button, ResourceListSelectedItems, Tooltip, Stack} from '@shopify/polaris';


import Sidebar from '../../components/sidebar/index';
import LoginSignup from '../../components/login-sigup/index';


function Home() {
    return <Frame navigation={<Sidebar />}>
        <Page title="Home"></Page>
    </Frame>
  }

export default Home;
