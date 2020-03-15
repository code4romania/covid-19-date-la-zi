import React from 'react';
import { PageHeader } from '../layout/page.header';
import { SummaryRow } from '../layout/rows/summary.row';
import { GenderCard } from '../cards/gender/gender-card';
import { CasesPerDayCard } from '../cards/cases-per-day-card/cases-per-day-card';
import { GenderAndAgeCard } from '../cards/gender-and-age/gender-and-age';
import { InfectionSourceCard } from '../cards/infection-source/infection-source-card';
import './dashboard.css';

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
  }


  rand(start, end){
    return start + Math.floor(Math.random() * (end - start))
  }

  generateCasesPerDay(numberOfDays) {
    const today = new Date();

    let data = [];
    for (let i = numberOfDays; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
      data.push({
        date: date,
        symptomatic: this.rand(2, 700),
        confirmed: this.rand(5, 200),
        cured: this.rand(5, 200),
      })
    }
    return data;
  }

  render() {
    return (
      <section className="section">
        <div className="container cards-row">
          <PageHeader
            title="Date Oficiale"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit, duis pretium. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Elit, duis pretium.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Elit, duis pretium."
          />
        </div>

        <SummaryRow />

        <div className="container cards-row second-row">
          <div className="columns">
            <div className="column is-three-quarters">
              <CasesPerDayCard />
            </div>
            <div className="column is-one-quarter">
              <GenderCard
                to="/"
                title="După gen"
              />
            </div>
          </div>
        </div>

        <div className="container cards-row third-row">
          <div className="columns">
            <div className="column is-two-quarters">
              <GenderAndAgeCard
                title="După vârstă și gen (mock)"
                data={this.generateCasesPerDay(60)}
              />
            </div>
            <div className="column is-two-quarters">
              <InfectionSourceCard
                title="Dupa sursa infectiei"
                data={this.generateCasesPerDay(60)}
              />
            </div>
            <div className="column" />
          </div>
        </div>
      </section>
    );
  }
}
