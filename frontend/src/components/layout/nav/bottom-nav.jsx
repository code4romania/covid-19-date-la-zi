import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import './bottom-nav.css';

class BottomNavClass extends React.PureComponent {
  render() {
    const {t} = this.props;
    return (
      <footer className="footer border-top">
        <div className="container team is-clearfix">
          <div className="is-pulled-right">
            <span>{t('footer_developed_by')}</span>
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
                <h4>{t('useful_links')}</h4>
                <ul>
                  <li><Link to="/about">{t('about_project')}</Link></li>
                  <li>
                    <a href="https://stirioficiale.ro/informatii" target="_blank" rel="noopener noreferrer">
                      {t('official_news')}
                    </a>
                  </li>
                  <li>
                    <a href="https://www.gov.ro/" target="_blank" rel="noopener noreferrer">{t('gov')}</a>
                  </li>
                  <li>
                    <a href="http://www.ms.ro/" target="_blank" rel="noopener noreferrer">{t('min_health')}</a>
                  </li>
                </ul>
              </div>
              <div className="column levels copyright vbottom">
                <div className="level-left" />
                <div className="level-right">
                  <div>
                    <p>
                      <a href="https://code4.ro/ro/" target="_blank" rel="noopener noreferrer">
                        <img
                          src="/images/logo-code4-gray.svg" className="logo-code4-gray"
                          alt="Code4Romania Logo"
                        />
                      </a>
                    </p>
                    <p>{t('copyright')}</p>
                    <p>{t('ngo')}</p>
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

export const BottomNav = withTranslation()(BottomNavClass);
