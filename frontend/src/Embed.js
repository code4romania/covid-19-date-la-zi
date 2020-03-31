import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Dashboard} from './components/pages/dashboard';

export function Embeddable() {
  return (
    <BrowserRouter>
      <Route path="*/:particularChart" component={Dashboard} />
    </BrowserRouter>
  );
}
