import React from 'react';
import Link from 'next/link'
import {
  Footer,
  FooterLinkHeader,
  FooterLinks,
  FooterLinkItem
} from '@code4ro/taskforce-fe-components';

const FooterPage = () => {
  return (
    <Footer>
      <FooterLinks>
        <FooterLinkHeader>Link-uri utile</FooterLinkHeader>
        <FooterLinkItem>
          <Link href="/about"><a>Despre proiect</a></Link>
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
          <a href="http://www.ms.ro/" target="_blank" rel="noopener noreferrer">
            Ministerul Sănătății
          </a>
        </FooterLinkItem>
      </FooterLinks>
    </Footer>
  );
};

export default FooterPage