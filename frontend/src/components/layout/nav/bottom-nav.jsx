import React from 'react';
import { Link } from 'react-router-dom';
import './bottom-nav.css';
import {
  Footer,
  FooterLinkHeader,
  FooterLinks,
  FooterLinkItem
} from '@code4ro/taskforce-fe-components';

export class BottomNav extends React.PureComponent {
  render() {
    return (
      <footer className="footer border-top">
        <div className="container team is-clearfix">
          <div className="is-pulled-right">
            <span>proiect dezvoltat în programul</span>
            <a href="https://code4.ro/ro/apps">
              <img
                className="logo-force"
                src="/images/logo-code4romania-force.svg"
                alt="Code4Romania Task Force Logo"
              />
            </a>
            &nbsp;
          </div>
        </div>
        <Footer>
          <FooterLinks>
            <FooterLinkHeader>Link-uri utile</FooterLinkHeader>
            <FooterLinkItem>
              <Link to="/about">Despre Proiect</Link>
            </FooterLinkItem>
            <FooterLinkItem>
              <a
                href="https://stirioficiale.ro/informatii"
                target="_blank"
                rel="noopener noreferrer"
              >
                Știri Oficiale
              </a>
            </FooterLinkItem>
            <FooterLinkItem>
              <a
                href="https://www.gov.ro/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Guvernul României
              </a>
            </FooterLinkItem>
            <FooterLinkItem>
              <a
                href="http://www.ms.ro/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ministerul Sănătății
              </a>
            </FooterLinkItem>
            <FooterLinkItem>
              <a
                href="http://www.code4.ro/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Code for Romania
              </a>
            </FooterLinkItem>
          </FooterLinks>
        </Footer>
      </footer>
    );
  }
}
