import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import echarts from 'echarts';
import roGeoJson from './config/roGeo';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Embeddable} from "./Embed";

echarts.registerMap('RO', roGeoJson);

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route path="/embed" >
        <Embeddable />
      </Route>
      <Route path="*">
        <App />
      </Route>
    </Switch>
  </BrowserRouter>
  ), document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
