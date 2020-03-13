import React from 'react'

export class TopNav extends React.PureComponent {
  render() {
    return (
      <nav role="navigation" aria-label="main navigation" className="navbar">
        <div className="navbar-brand">
          <a href="/" className="navbar-item">
            <strong>🏠 Co viz 19</strong>
          </a>
          <button data-target="navMenu" className="button navbar-burger">
            <span></span> <span></span> <span></span>
          </button>
        </div>
        <div id="navMenu" className="navbar-menu">
          <div className="navbar-start">
            <a href="/charts" className="navbar-item">
              Charts
            </a>
            <a href="/not-charts" className="navbar-item">
              Not charts
            </a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <a href="/register" className="button is-primary">
                SIGN UP
              </a>
            </div>
            <div className="navbar-item">
              <a href="/login" className="button is-light">
                LOG IN
              </a>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}