import React from 'react';
import { TopNav } from './components/layout/nav/top-nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BottomNav } from './components/layout/nav/bottom-nav';

// pages
import { Dashboard } from './components/pages/dashboard';
import { AboutPage } from './components/pages/about';
import { Billboard } from './components/pages/billboard';

function App() {
  return (
    <Router>
      <div id="app">
        <Switch>
          <Route path="/about">
            <TopNav />
            <AboutPage />
            <BottomNav />
          </Route>
          <Route path="/billboard">
            <Billboard />
          </Route>
          <Route path="/">
            <TopNav />
            <Dashboard />
            <BottomNav />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
