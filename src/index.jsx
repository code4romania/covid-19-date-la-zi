import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as echarts from 'echarts/core';
import '@code4ro/taskforce-fe-components/dist/index.css';
import './index.scss';
import App from './App.jsx';
import roGeoJson from './config/roGeo.json';
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
import { SVGRenderer } from 'echarts/renderers';

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
  SVGRenderer,
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
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
