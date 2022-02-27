import React from 'react';
import {Navigation, Stack} from '@shopify/polaris';
import {AnalyticsMajor, HomeMajor, TeamMajor, SecureMajor, SettingsMajor} from '@shopify/polaris-icons';
import {useLocation} from 'react-router-dom'

import styled from 'styled-components';

import icon from '../../assets/logo-with-name.svg';

const FullHeight = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 5vh;
`;

const Logo = styled.img`
    max-width: 60%;
    height: auto;
    margin-left: 1em;
    margin-top: -4vh;
    margin-bottom: 2vh;
`

function Sidebar() {
    const location = useLocation();
    return (
        <Navigation location={location.pathname}>
            <FullHeight>
                <Logo src={icon} />
                <Navigation.Section
                    items={[
                        {
                            url: '/home',
                            label: 'Home',
                            icon: HomeMajor,
                        },
                        {
                            url: '/dashboard',
                            label: 'Dashboard',
                            icon: AnalyticsMajor,
                        },
                        {
                            url: '/vulnerabilities',
                            label: 'Vulnerabilities',
                            icon: SecureMajor,
                        },
                        {
                            url: '/devices',
                            label: 'Devices',
                            icon: TeamMajor,
                        }
                    ]}
                /> 
                <Navigation.Section
                    items={[
                        {
                            url: '/settings',
                            label: 'Settings',
                            icon: SettingsMajor,
                        },
                        
                    ]}
                    separator
                />
            </FullHeight>
           
        </Navigation>
    );
}

export default Sidebar;
