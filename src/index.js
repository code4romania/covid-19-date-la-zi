import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as echarts from 'echarts/core';
import '@code4ro/taskforce-fe-components/dist/index.css';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import roGeoJson from './config/roGeo';
const Embeddable = lazy(() => import('./components/pages/embed'));
const BannerChartsPage = lazy(() => import('./components/pages/banner-charts'));
import { LineChart, BarChart, PieChart, MapChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  DataZoomComponent,
  LegendPlainComponent,
  VisualMapComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// Register the required components
echarts.use([
  LineChart,
  BarChart,
  PieChart,
  MapChart,
  GridComponent,
  TooltipComponent,
  DataZoomComponent,
  LegendPlainComponent,
  VisualMapComponent,
  CanvasRenderer,
]);
echarts.registerMap('RO', roGeoJson);

ReactDOM.render(
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
