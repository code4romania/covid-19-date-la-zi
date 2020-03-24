import React from 'react';
import { PageHeader } from '../layout/page.header';
import { SummaryRow } from '../layout/rows/summary.row';
import { GenderCard } from '../cards/gender/gender-card';
import { CasesPerDayCard } from '../cards/cases-per-day-card/cases-per-day-card';
import { GenderAndAgeCard } from '../cards/gender-and-age/gender-and-age';
import { InfectionSourceCard } from '../cards/infection-source/infection-source-card';
// import { CountiesCard } from '../cards/counties/counties-card';

import './dashboard.css';
import {Hero, Instruments, InstrumentsItem, SocialsShare} from '@code4ro/taskforce-fe-components';
import '@code4ro/taskforce-fe-components/dist/index.css';
import {Switch} from 'react-router-dom';
// import { Constants } from '../../config/globals';

export class Dashboard extends React.PureComponent {

  render() {
    return (
      <section className="section">
        <div className="container cards-row content">
          <PageHeader
            title="Date Oficiale"
          />
          <p>
            Accesul la date din surse oficiale ce descriu evoluția cazurilor de COVID-19 în România
            este esențial în adoptarea măsurilor de sănătate publică împotriva pandemiei. Astfel,
            venim în sprijinul publicului și al mass-media din România prin accesibilizarea datelor
            punându-le într-o formă grafică ușor de parcurs, urmând modelul portalului de informare
            din <a href="https://co.vid19.sg/">Singapore</a>.
          </p>
          <p>
            Infografiile se actualizează periodic și sunt centralizate în graficele de mai jos.
          </p>
          <p>
            Acest proiect este realizat pro-bono în parteneriat cu Guvernul României prin
            Autoritatea pentru Digitalizarea României pe baza datelor furnizate de Ministerul
            Sănătății, de către Code for Romania.
          </p>
        </div>

        <SummaryRow />

        <div className="container cards-row second-row">
          <div className="columns">
            <div className="column is-three-quarters">
              <CasesPerDayCard />
            </div>
            <div className="column is-one-quarter">
              <GenderCard to="/" title="După gen" />
            </div>
          </div>
        </div>

        <div className="container cards-row third-row">
          <div className="columns">
            {/* <div className="column is-one-quarter">
              <CountiesCard />
            </div> */}
            <div className="column is-two-quarters">
              <GenderAndAgeCard
                title="După vârstă și gen"
              />
            </div>
            <div className="column is-one-quarter">
              <InfectionSourceCard
                title="Dupa sursa infectiei"
              />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="border-bottom">
            <Hero title="Instrumente utile" useFallbackIcon />
          </div>

          <Instruments layout="grid">
            <section>
              <InstrumentsItem
                color="green"
                title="Instalează-ţi extensia de Firefox"
                ctaLink="https://addons.mozilla.org/en-US/firefox/addon/covid-19-%C8%99tiri-oficiale/"
                ctaText="Instalează add-on"
              />
              <InstrumentsItem
                color="green"
                title="Instalează-ti extensia de Chrome"
                ctaLink={'https://chrome.google.com/webstore/detail/' +
                'covid-19-stiri-oficiale/pdcpkplohipjhdfdchpmgekifmcdbnha'}
                ctaText="Instalează add-on"
              />
            </section>
            <section>
              <InstrumentsItem
                color="green"
                title="Ştiri oficiale la zi"
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit, duis pretium."
                ctaText="Cele mai noi informaţii oficiale"
                ctaLink="https://stirioficiale.ro/informatii"
              />
            </section>
            <section>
              <InstrumentsItem
                color="yellow"
                title="Recomandări oficiale"
                content="15 recomandări privind conduita socială responsabilă în prevenirea răspândirii coronavirus."
                ctaText="Citeşte aici"
                ctaLink={'https://stirioficiale.ro/' +
                '15-recomandari-privind-conduita-sociala-responsabila-in-prevenirea-raspandirii-coronavirus'}
              />
            </section>
          </Instruments>
        </div>
      </section>
    );
  }
}
