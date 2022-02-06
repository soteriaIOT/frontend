import React from 'react';
import {Navigation, Stack} from '@shopify/polaris';
import {AnalyticsMajor, HomeMajor, TeamMajor, SecureMajor, SettingsMajor} from '@shopify/polaris-icons';
import {useLocation} from 'react-router-dom'

import styled from 'styled-components';

const FullHeight = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

function Sidebar() {
    const location = useLocation();
    return (
        <Navigation location={location.pathname}>
            <FullHeight>
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
