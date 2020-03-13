import React from 'react'
import {TopNav} from './components/layout/nav/top-nav'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { DemoComponent } from './components/demo-component';
import { ChartsDemo } from './components/charts/charts-demo';

function App() {
  return (
    <Router>
      <div id="app">
        <TopNav></TopNav>
        <Switch>
          <Route path="/charts">
            <ChartsDemo title={'charts here'} subtitle={'A page with charts!'} />
          </Route>
          <Route path="/not-charts">
            <DemoComponent title={'No beautiful charts here'} subtitle={'A page without charts!'} />
          </Route>
          <Route path="/register">
            <DemoComponent title={'Register page'} subtitle={'Just for demo purposes!'} />
          </Route>
          <Route path="/">
            <DemoComponent title={'Home page'} subtitle={'Made with Bulma!'} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
