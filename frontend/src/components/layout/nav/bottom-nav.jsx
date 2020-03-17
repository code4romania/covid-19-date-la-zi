import React from 'react';
import { Link } from 'react-router-dom';
import './bottom-nav.css';

export class BottomNav extends React.PureComponent {
  render() {
    return (
      <footer className="footer border-top">
        <div className="container team is-clearfix">
          <div className="is-pulled-right">
            <span>proiect incubat în programul</span>
            <a href="https://code4.ro/ro/apps">
              <img className="logo-force" src="/images/logo-code4romania-force.svg" />
            </a>
            &nbsp;
          </div>
        </div>
        <div className="bottom-navigation">
          <div className="container">
            <div className="columns">
              <div className="column is-one-quarter">
                <h4>Link-uri utile</h4>
                <ul>
                  <li><Link to="/about">Despre Proiect</Link></li>
                  <li><a href="https://code4.ro/ro/apps">Ecosistemul Covid-19</a></li>
                  <li><a href="https://code4.ro/ro/doneaza">Sprijină proiectul</a></li>
                  <li>
                    <a href="https://addons.mozilla.org/en-US/firefox/addon/covid-19-%C8%99tiri-oficiale/">
                      Instalează add-on-ul Firefox
                    </a>
                  </li>
                  <li>
                    <a href="https://chrome.google.com/webstore/detail/pdcpkplohipjhdfdchpmgekifmcdbnha">
                    Instalează add-on-ul Chrome
                    </a>
                  </li>
                  <li><a href="https://stirioficiale.ro">CoVid-19: Stiri Oficiale</a></li>
                  <li><a href="https://cemafac.ro/">CoVid-19: Ce Mă Fac</a></li>
                  <li><a href="https://diasporahub.ro/">CoVid-19: Diaspora Hub</a></li>
                  <li><a href="https://stamacasa.ro/">CoVid-19: Stăm Acasă</a></li>
                </ul>
              </div>
              <div className="column levels copyright vbottom">
                <div className="level-left" />
                <div className="level-right">
                  <div>
                    <p>
                      <a href="https://code4.ro/ro/">
                        <img src="/images/logo-code4-gray.svg" className="logo-code4-gray" />
                      </a>
                    </p>
                    <p>© 2020 Code for Romania.</p>
                    <p>Organizație neguvernamentală independentă, neafiliată politic și apolitică.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
