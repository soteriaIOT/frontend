import React, {useState, useCallback, useEffect} from 'react';

import styled from 'styled-components'

import {Button, Stack, Layout} from '@shopify/polaris';

import LoginSignup from '../../components/login-sigup/index';

import Logo from '../../assets/logo-with-name.svg';

function Topbar() {
    const [active, setActive] = useState(false);

    const activator = <Button onClick={() => setActive(!active)}>Open</Button>;
    return (
        <Stack distribution="equalSpacing">
            <img src={Logo} alt="logo" style={{height: '60px'}}/>
            {activator}
            <LoginSignup active={active} setActive={(value: boolean) => setActive(value)}/>
        </Stack>
    );
}

export default Topbar;
