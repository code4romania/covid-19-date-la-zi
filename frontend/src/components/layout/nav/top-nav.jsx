import React from 'react';
import { Link } from 'react-router-dom';
import './top-nav.css';
import { withTranslation } from 'react-i18next';

class TopNavClass extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isBurgerMenuActive: false
    }
  }

  toggleBurgerMenu() {
    this.setState({
      isBurgerMenuActive: !this.state.isBurgerMenuActive
    })
  }

  hideBurgerMenu() {
    this.setState({
      isBurgerMenuActive: false
    })
  }

  setCurrentLanguage(key) {
    const {t, i18n} = this.props;
    i18n.changeLanguage(key)
  }

  render() {
    const {t, i18n} = this.props;
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
                <a href="https://code4.ro/ro/apps" className="navbar-item">
                  Ecosistemul Covid-19
                </a>
                <a href="https://code4.ro/ro/doneaza" className="navbar-item">
                  Sprijină proiectul
                </a>
                <a className="navbar-item" role="button" href="#" onClick={() => this.setCurrentLanguage('ro')}>
                  <span role="img" alt="Romanian flag">🇷🇴</span>
                   Română
                </a>
                <a className="navbar-item" role="button" href="#" onClick={() => this.setCurrentLanguage('en')}>
                  <span role="img" alt="English flag">🇬🇧</span>
                   English
                </a>
              </div>
            </div>
          </div>
        </nav>
        <div className="container is-clearfix">
          <div className="is-pulled-right">
            <div className="developer border-bottom level-right is-clearfix">
              <div>
                <span className="is-inline-block">
                  Un proiect în parteneriat cu
                </span>
                &nbsp;&nbsp;
                <a
                  href="https://www.gov.ro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="is-inline-block"
                >
                  <img
                    src="/images/logo-gov.png"
                    alt="Guvernul Romaniei"
                    className="logo-gov"
                  />
                </a>
                <a
                  href="http://www.ms.ro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="is-inline-block link-ms"
                >
                  <img
                    src="/images/logo-ms.png"
                    alt="Ministerul Sanatatii"
                    className="logo-ms"
                  />
                </a>
              </div>
              <div>
                &nbsp;&nbsp;
                <span>dezvoltat de</span>
                &nbsp;&nbsp;
                <a
                  href="https://code4.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="is-inline-block"
                >
                  <img
                    src="/images/logo-code4.svg"
                    alt="Code 4 Romania Logo"
                    className="logo-code4"
                  />
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

export const TopNav = withTranslation()(TopNavClass);
