import React from 'react';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import {Dashboard} from './components/pages/dashboard';
import {DevelopedBy, Logo} from "@code4ro/taskforce-fe-components";
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
              src="/images/logo-coviz.svg"
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
