import React from 'react';
import { TopNav } from './components/layout/nav/top-nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BottomNav } from './components/layout/nav/bottom-nav';

// pages
import { Dashboard } from './components/pages/dashboard';
import { AboutPage } from './components/pages/about';

function App() {
  return (
    <Router>
      <div id="app">
        <TopNav />
        <Switch>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
