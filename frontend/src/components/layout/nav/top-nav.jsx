import React from 'react'
import { Link } from 'react-router-dom'
import './top-nav.css'

export class TopNav extends React.PureComponent {
  render() {
    return (
      <nav role="navigation" aria-label="main navigation" className="navbar border-bottom">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <strong>🏠 Co viz 19</strong>
          </Link>
          <button data-target="navMenu" className="button navbar-burger">
            <span></span> <span></span> <span></span>
          </button>
        </div>
        <div id="navMenu" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/charts" className="navbar-item">
              Charts
            </Link>
            <Link to="/not-charts" className="navbar-item">
              Not charts
            </Link>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <Link to="/register" className="button is-primary">
                SIGN UP
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}