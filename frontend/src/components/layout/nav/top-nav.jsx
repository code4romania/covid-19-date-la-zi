import React from 'react';
import { Link } from 'react-router-dom';
import './top-nav.css';
import { DevelopedBy } from '@code4ro/taskforce-fe-components';

export class TopNav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isBurgerMenuActive: false
    };
  }

  toggleBurgerMenu() {
    this.setState({
      isBurgerMenuActive: !this.state.isBurgerMenuActive
    });
  }

  hideBurgerMenu() {
    this.setState({
      isBurgerMenuActive: false
    });
  }

  render() {
    return (
      <div className="navigation-container">
        <nav role="navigation" aria-label="main navigation" className="navbar">
          <div className="container border-bottom">
            <div className="navbar-brand">
              <Link
                to="/"
                className="navbar-item"
                onClick={() => this.hideBurgerMenu()}
              >
                <img
                  src="/images/logo-coviz.svg"
                  className="logo-coviz"
                  alt="Date La Zi Logo"
                />
              </Link>
              <a
                role="button"
                className="navbar-burger"
                aria-label="menu"
                data-target="navMenu"
                href="#/"
                aria-expanded={this.state.isBurgerMenuActive ? 'true' : 'false'}
                onClick={() => this.toggleBurgerMenu()}
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </a>
            </div>
            <div
              id="navMenu"
              className={
                this.state.isBurgerMenuActive
                  ? 'navbar-menu is-active'
                  : 'navbar-menu'
              }
            >
              <div className="navbar-start" />
              <div className="navbar-end">
                <Link
                  to="/about"
                  className="navbar-item"
                  onClick={() => this.hideBurgerMenu()}
                >
                  Despre Proiect
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <DevelopedBy />
      </div>
    );
  }
}
