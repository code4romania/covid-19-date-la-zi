import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { DevelopedBy } from '@code4ro/taskforce-fe-components';
import { Dashboard } from './dashboard';
import LogoImage from '../../images/logo-coviz.svg';
import './embed.css';

export default () => {
  return (
    <BrowserRouter>
      <div className="embed-container">
        <Route path="*/:particularChart" component={Dashboard} />

        <div className="embed-footer">
          <a
            href="https://datelazi.ro"
            className="embed-footer__logo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={LogoImage}
              width="120"
              height="37"
              alt="Date La Zi Logo"
            />
          </a>
          <div>
            <DevelopedBy />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};
