import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { DevelopedBy } from '@code4ro/taskforce-fe-components';
import { Dashboard } from './dashboard';
import LogoImage from '../../images/logo-coviz.svg';
import './embed.css';

export function Embeddable() {
  return (
    <BrowserRouter>
      <div className="embed-container">
        <Route path="*/:particularChart" component={Dashboard} />

        <div className="embed-footer">
          <a
            className="embed-website-logo"
            href="https://datelazi.ro"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={LogoImage}
              className="embed-logo-covid"
              alt="Date La Zi Logo"
            />
          </a>

          <div className="detailed-logos">
            <DevelopedBy />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
