import React from 'react';
import { TopNav } from './components/layout/nav/top-nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DemoComponent } from './components/demo-component';
import { ChartsDemo } from './components/charts/charts-demo';
import { Link } from 'react-router-dom';
import { BottomNav } from './components/layout/nav/bottom-nav';

function App() {
  return (
    <Router>
      <div id="app">
        <TopNav />
        <Switch>
          <Route path="/about">
            <DemoComponent
              title="About this site"
              subtitle="Code 4 Romania FTW!"
            />
          </Route>
          <Route path="/">
            <ChartsDemo title="Charts" subtitle="main page with example charts" />
          </Route>
        </Switch>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
