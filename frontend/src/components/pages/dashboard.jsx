import React from 'react';
import { PageHeader } from '../layout/page.header';
import { SummaryRow } from '../layout/rows/summary.row';
import { GenderCard } from '../cards/gender/gender-card';
import { CasesPerDayCard } from '../cards/cases-per-day-card/cases-per-day-card';
import { GenderAndAgeCard } from '../cards/gender-and-age/gender-and-age';
import { InfectionSourceCard } from '../cards/infection-source/infection-source-card';
import { CountiesCard } from '../cards/counties/counties-card';

import './dashboard.css';
import Map from '../charts/map';

export class Dashboard extends React.PureComponent {
  chartData = {
    xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [26, 37, 11, 56, 122, 233, 98]
  };

  doughnutChartData = {
    legend: this.chartData.xAxisData,
    series: this.chartData.series.map((v, i) => ({
      value: v,
      name: this.chartData.xAxisData[i]
    }))
  };

  confirmedSummaryData = {
    data: this.chartData.series,
    total: 99,
    special: {
      value: '13.765',
      label: 'monitorizate',
      isGood: true
    }
  };

  rand(start, end) {
    return start + Math.floor(Math.random() * (end - start));
  }

  generateCasesPerDay(numberOfDays) {
    const today = new Date();

    let data = [];
    for (let i = numberOfDays; i >= 0; i--) {
      const date = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - i
      );
      data.push({
        date: date,
        symptomatic: this.rand(2, 700),
        confirmed: this.rand(5, 200),
        cured: this.rand(5, 200)
      });
    }
    return data;
  }

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
            <div className="column is-one-quarter">
              <CountiesCard />
            </div>
            <div className="column is-two-quarters">
              <GenderAndAgeCard
                title="După vârstă și gen"
              />
            </div>
            <div className="column is-one-quarter">
              <InfectionSourceCard
                title="Dupa sursa infectiei"
                data={this.generateCasesPerDay(60)}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
