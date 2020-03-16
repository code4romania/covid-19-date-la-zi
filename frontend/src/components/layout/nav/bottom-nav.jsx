import React from 'react';
import './bottom-nav.css';

export class BottomNav extends React.PureComponent {
  render() {
    return (
      <footer className="footer border-top">
        <div className="container team is-clearfix">
          <div className="is-pulled-right">
            <span>proiect incubat în programul</span>
            <img className="logo-force" src="/images/logo-code4romania-force.svg" />
                &nbsp;
          </div>
        </div>
        <div className="bottom-navigation">
          <div className="container">
            <div className="columns">
              <div className="column is-one-quarter">
                <h4>Linkuri utile</h4>
                <ul>
                  <li><a href="#">Link 1</a></li>
                  <li><a href="#">Link 2</a></li>
                  <li><a href="#">Link 3</a></li>
                  <li><a href="#">Link 4</a></li>
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
