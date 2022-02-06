import React from 'react';

import '@shopify/polaris/build/esm/styles.css';

import {
  BrowserRouter,
  Routes,
  Route,
  Link as ReactRouterLink
} from "react-router-dom";


import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider} from '@shopify/polaris';

import Vulnerabilities from './pages/vulnerabilities';
import Devices from './pages/devices';
import Dashboard from './pages/dashboard';
import Settings from './pages/settings';
import Home from './pages/home';
import Frontpage from './pages/frontpage';

function App() {
  return (
    <AppProvider
      i18n={enTranslations} 
      theme={{colors: {
        primary: "#615EEE",
      }}}
      linkComponent={Link}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/devices" element={<Devices />} />
          <Route path="/vulnerabilities" element={<Vulnerabilities />} />
          <Route path="/dashboard/" element={<Dashboard />} />
          <Route path="/dashboard/:device_id" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Frontpage />} />
        </Routes>
      </BrowserRouter>
  </AppProvider>
  );
}


// used from https://github.com/Shopify/polaris-react/issues/2575
// to avoid hard-refresh on switching pages
function Link({children, url = '', ...rest}: any) {
  // Use an regular a tag for external and download links
  if (isOutboundLink(url) || rest.download) {
    delete rest.external;
    return (
      <a href={url} {...rest} target="_blank">
        {children}
      </a>
    );
  }

  return (
    <ReactRouterLink to={url} {...rest}>
      {children}
    </ReactRouterLink>
  );
}

function isOutboundLink(url: string) {
  return /^(?:[a-z][a-z\d+.-]*:|\/\/)/.test(url);
}

export default App;
