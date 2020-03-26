import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card } from '../../layout/card';
import { Constants } from '../../../config/globals';
import './cases-per-day-card.css';

export const EMBED_PATH_CASES_PER_DAY = 'cazuri-pe-zi';
export class CasesPerDayCard extends React.PureComponent {

  getSubtitle(state) {
    let firstDate = state.startDate;
    let lastDate = state.endDate;
    return `de la ${firstDate} la ${lastDate}`;
  }

  getChartOptions(state) {
    const labels = ['Confirmați', 'Vindecați', 'Decedaţi'];
    return {
      xAxis: {
        type: 'category',
        data: state.dates,
        axisLabel: {
          color: 'gray'
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: 'gray'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          axis: 'x'
        }
      },
      legend: {
        data: labels,
        bottom: '0px',
        icon: 'circle',
      },
      grid: {
        left: '1%',
        right: 0,
        bottom: '50px',
        top: '20%',
        containLabel: true
      },
      series: [
        {
          data: state.confirmedCasesHistory,
          name: labels[0],
          stack: 'one',
          type: 'bar',
          color: Constants.confirmedColor
        },
        {
          data: state.curedCasesHistory,
          name: labels[1],
          stack: 'one',
          type: 'bar',
          color: Constants.curedColor
        },
        {
          data: state.deathCasesHistory,
          name: labels[2],
          stack: 'one',
          type: 'bar',
          color: Constants.deathColor
        }
      ]
    };
  }

  render() {
    const state = this.props.state
    const { isLoaded, error } = state;

    return (
      <Card isLoaded={isLoaded} error={error} embedPath={EMBED_PATH_CASES_PER_DAY}>
        <div className="title-container is-overlay">
          <h3 className="summary-title is-uppercase">Număr de cazuri pe zile</h3>
          <h4 className="summary-subtitle">
            De la {state.startDate} la {state.endDate}
          </h4>
        </div>
        <ReactEcharts
          style={{
            height: '470px',
            width: '100%'
          }}
          option={this.getChartOptions(state)}
          theme="light"
        />
      </Card>
    );
  }
}
