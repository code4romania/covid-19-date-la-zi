import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import echarts from 'echarts';
import 'bulma/css/bulma.css';
import '@code4ro/taskforce-fe-components/dist/index.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import roGeoJson from './config/roGeo';
import { Embeddable } from './components/pages/embed';
import { BannerChartsPage } from './components/pages/banner-charts';


echarts.registerMap('RO', roGeoJson);

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/embed">
        <Embeddable />
      </Route>
      <Route path="/banners/:bannerSize?/">
        <BannerChartsPage />
      </Route>
      <Route path="*">
        <App />
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
