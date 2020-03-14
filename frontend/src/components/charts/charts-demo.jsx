import React from 'react';
import { LineChart } from './line';
import { Doughnut } from './doughnut';
import { SummaryCard } from '../summary-card/summary-card';

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
    chartData: this.chartData,
    special: {
      value: 0,
      label: 'people got an error page',
      isGood: true
    }
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-mobile">
            <div className="column">
              <LineChart title="My line chart" chartData={this.chartData} />
            </div>
            <div className="column">
              <Doughnut
                title="My doughnut chart"
                chartData={this.doughnutChartData}
              />
            </div>
            <div className="column">
              <SummaryCard
                to="/"
                title="People who clicked this card and got home"
                chartData={this.summaryCardData.chartData}
                special={this.summaryCardData.special}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
