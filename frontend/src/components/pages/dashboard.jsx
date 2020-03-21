import React from 'react';
import { PageHeader } from '../layout/page.header';
import { SummaryRow } from '../layout/rows/summary.row';
import { GenderCard } from '../cards/gender/gender-card';
import { CasesPerDayCard } from '../cards/cases-per-day-card/cases-per-day-card';
import { GenderAndAgeCard } from '../cards/gender-and-age/gender-and-age';
import { InfectionSourceCard } from '../cards/infection-source/infection-source-card';
// import { CountiesCard } from '../cards/counties/counties-card';

import './dashboard.css';
import { Constants } from '../../config/globals';

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
            venim în sprijinul publicului și al mediului mass-media din România prin accesibilizarea
            datelor punându-le într-o formă grafică ușor de parcurs, urmând modelul portalului de
            informare din <a href="https://co.vid19.sg/">Singapore</a>.
          </p>
          <p>
            Infografiile se actualizează periodic cu date anonimizate provenite de la Ministerul
            Sănătății și le transformă în informație grafică, ușor de înțeles pentru publicul larg.
          </p>
          <p>
            Acest proiect este realizat pro-bono de voluntarii Code for Romania, organizație
            neguvernamentală independentă, neafiliată politic și apolitică, în cadrul Code for
            Romania Task Force și în parteneriat cu Guvernul României prin Autoritatea pentru
            Digitalizarea României și Ministerul Sănătății.
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
      </section>
    );
  }
}
