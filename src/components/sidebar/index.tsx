import React from 'react';
import {Navigation} from '@shopify/polaris';
import {AnalyticsMajor, HomeMajor, TeamMajor, SecureMajor} from '@shopify/polaris-icons';
import {useLocation} from 'react-router-dom'

function Sidebar() {
    const location = useLocation();
    return (
        <Navigation location={location.pathname}>

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
        </Navigation>
    );
}

export default Sidebar;
