import React from 'react';
import { Link } from 'react-router-dom';
import './bottom-nav.css';

export class BottomNav extends React.PureComponent {
  render() {
    return (
      <footer className="footer border-top">
        <div className="container team is-clearfix">
          <div className="is-pulled-right">
            <span>proiect dezvoltat în programul</span>
            <a href="https://code4.ro/ro/apps">
              <img
                className="logo-force" src="/images/logo-code4romania-force.svg"
                alt="Code4Romania Task Force Logo"
              />
            </a>
            &nbsp;
          </div>
        </div>
        <section className="bottom-navigation">
          <div className="container">
            <div className="columns">
              <div className="column is-one-quarter">
                <h4>Link-uri utile</h4>
                <ul>
                  <li><Link to="/about">Despre Proiect</Link></li>
                  <li><a href="https://stirioficiale.ro/informatii">Știri Oficiale</a></li>
                  <li><a href="https://www.gov.ro/">Guvernul României</a></li>
                  <li><a href="http://www.ms.ro/">Ministerul Sănătății</a></li>
                </ul>
              </div>
              <div className="column levels copyright vbottom">
                <div className="level-left" />
                <div className="level-right">
                  <div>
                    <p>
                      <a href="http://www.code4.ro/">
                        <img
                          src="/images/logo-code4-gray.svg" className="logo-code4-gray"
                          alt="Code4Romania Logo"
                        />
                      </a>
                    </p>
                    <p>© 2020 Code for Romania.</p>
                    <p>Organizație neguvernamentală independentă, neafiliată politic și apolitică.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </footer>
    );
  }
}
