import React from 'react';

import '@shopify/polaris/build/esm/styles.css';

import {
  BrowserRouter,
  Routes,
  Route
  
} from "react-router-dom";


import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Page, Card, Button} from '@shopify/polaris';

import Vulnerabilities from './pages/vulnerabilities';
import Home from './pages/home';
import Frontpage from './pages/frontpage';


function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <BrowserRouter>
        <Routes>
          <Route path="/vulnerabilities" element={<Vulnerabilities />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Frontpage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
