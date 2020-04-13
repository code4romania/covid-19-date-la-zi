import React, { useEffect, Suspense, lazy } from 'react';
import {
  Header,
  DevelopedBy,
  IncubatedBy
} from '@code4ro/taskforce-fe-components';
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  useHistory,
  BackToTop,
} from 'react-router-dom';
import LogoSvg from './images/logo-coviz.svg';
import { initializeGA, logPageView } from './analyticsTracker';
import FooterWrapper from './components/layout/footer/footer';

// pages
import { Dashboard } from './components/pages/dashboard';
const AboutPage = lazy(() => import('./components/pages/about'));

initializeGA();

const Logo = () => (
  <Link to="/">
    <img width="110" alt="Covid-19. Ce trebuie să fac?" src={LogoSvg} />
  </Link>
);

const MenuItems = [
  <Link to="/about" key="des">
    Despre proiect
  </Link>
];

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

const App = () => {
  const history = useHistory();
  useEffect(() => {
    logPageView(history);
  }, [history]);

  return (
    <>
      <Header Logo={Logo()} MenuItems={MenuItems} />
      <DevelopedBy />
      <Suspense fallback={<div style={{ height: 500 }} />}>
        <main>
          <Switch>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
          <BackToTop />
        </main>
      </Suspense>
      <IncubatedBy />
      <FooterWrapper />
    </>
  );
};

export default AppWrapper;
