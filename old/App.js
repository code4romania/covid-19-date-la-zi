import React, { useEffect, Suspense, lazy } from "react";
import {
  Header,
  DevelopedBy,
  IncubatedBy,
} from "@code4ro/taskforce-fe-components";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Image from "next/image";
import { initializeGA, logPageView } from "./analyticsTracker";
import FooterWrapper from "./components/layout/footer/footer";

// pages
import { Dashboard } from "./components/pages/dashboard";
const AboutPage = lazy(() => import("./components/pages/about"));

initializeGA();

const Logo = () => (
  <Link href="/">
    <Image
      width="110"
      height="30"
      alt="Covid-19. Ce trebuie să fac?"
      src="/images/logo-coviz.svg"
    />
  </Link>
);

const MenuItems = [
  <Link href="/about" key="des">
    Despre proiect
  </Link>,
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
        </main>
      </Suspense>
      <IncubatedBy />
      <FooterWrapper />
    </>
  );
};

export default AppWrapper;
