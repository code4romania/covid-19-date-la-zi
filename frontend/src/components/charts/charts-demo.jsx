import React from 'react';
import { LineChart } from './line';
import { Doughnut } from './doughnut';
import { SummaryCard } from '../summary-card/summary-card';
import { CasesPerDayCard } from '../cases-per-day-card/cases-per-day-card';

export class ChartsDemo extends React.PureComponent {
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

  summaryCardData = {
    data: this.chartData.series,
    special: {
      value: 0,
      label: 'people got an error page',
      isGood: true
    }
  }

  rand(start, end){
    return start + Math.floor(Math.random() * (end - start))
  }

  generateCasesPerDay(numberOfDays) {
    const today = new Date();

    var data = [];
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
        <div className="container">
          <div className="columns is-mobile">
            {/* <div className="column">
              <LineChart title="My line chart" chartData={this.chartData} />
            </div>
            <div className="column">
              <Doughnut
                title="My doughnut chart"
                chartData={this.doughnutChartData}
              />
            </div> */}
            <div className="column">
              <SummaryCard
                to="/"
                title="People who clicked this card and got home"
                data={this.summaryCardData.data}
                special={this.summaryCardData.special}
              />
            </div>
            <div className="column">
              <SummaryCard
                to="/"
                title="People who clicked this card and got home"
                data={this.summaryCardData.data}
                special={this.summaryCardData.special}
              />
            </div>
            <div className="column">
              <SummaryCard
                to="/"
                title="People who clicked this card and got home"
                data={this.summaryCardData.data}
                special={this.summaryCardData.special}
              />
            </div>
            <div className="column">
              <SummaryCard
                to="/"
                title="People who clicked this card and got home"
                data={this.summaryCardData.data}
                special={this.summaryCardData.special}
              />
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column">
              <CasesPerDayCard
                data={this.generateCasesPerDay(50)}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
