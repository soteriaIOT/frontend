import React from 'react';

import '@shopify/polaris/build/esm/styles.css';

import {
  BrowserRouter,
  Routes,
  Route
  
} from "react-router-dom";

import Vulnerabilities from './pages/vulnerabilities';

import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Page, Card, Button} from '@shopify/polaris';


function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/vulnerabilities" element={<Vulnerabilities />} />
            <Route path="/" element={<Vulnerabilities />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
