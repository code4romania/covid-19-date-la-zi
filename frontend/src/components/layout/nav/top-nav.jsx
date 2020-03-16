import React from 'react';
import { Link } from 'react-router-dom';
import './top-nav.css';

export class TopNav extends React.PureComponent {
  render() {
    return (
      <div className="navigation-container">
        <nav
          role="navigation"
          aria-label="main navigation"
          className="navbar"
        >
          <div className="container border-bottom">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item">
                <img src="/images/logo-coviz.svg" className="logo-coviz" />
              </Link>
              <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>
            <div id="navMenu" className="navbar-menu">
              <div className="navbar-start"></div>
              <div className="navbar-end">
                <Link to="/" className="navbar-item">
                Home
                </Link>
                <Link to="/about" className="navbar-item">
                Despre Proiect
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="container is-clearfix">
          <div className="is-pulled-right">
            <div className="developer border-bottom level-right is-clearfix">
              <div>
              <span className="is-inline-block">Un proiect dezvoltat de</span>
              &nbsp;&nbsp;
              <a href="https://code4.ro" target="_blank" rel="noopener noreferrer" className="is-inline-block">
                <img src="/images/logo-code4.svg" alt="Code 4 Romania Logo" className="logo-code4" />
              </a>
              &nbsp;
              </div>
              <div>
                &nbsp;&nbsp;
                <span>În parteneriat cu</span>
                &nbsp;&nbsp;
                <a href="https://www.gov.ro/" target="_blank" rel="noopener noreferrer" className="is-inline-block">
                  <img src="/images/logo-gov.svg" height="30" alt="Guvernul Romaniei Logo" className="logo-gov" />
                </a>
                &nbsp;
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
