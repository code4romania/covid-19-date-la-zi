import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card } from '../../layout/card/card';
import { Constants } from '../../../config/globals';

export const EMBED_PATH_CASES_PER_DAY = 'cazuri-pe-zi';
export class CasesPerDayCard extends React.PureComponent {
  // how many days to limit the chart to
  recordsLimit = Constants.dailyRecordsLimit;

  lastRecords(array, limit) {
    if (array !== undefined && limit > 0) {
      return array.slice(Math.max(array.length - limit, 0))
    } else {
      return array
    }
  }

  getChartOptions(state) {
    const dates = this.lastRecords(state.dates, this.recordsLimit);
    const listConfirmed = this.lastRecords(state.confirmedCasesHistory, this.recordsLimit);
    const listCured = this.lastRecords(state.curedCasesHistory, this.recordsLimit);
    const listDeaths = this.lastRecords(state.deathCasesHistory, this.recordsLimit);

    const labels = ['Confirmați', 'Vindecați', 'Decedaţi'];
    return {
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: {
          color: 'gray',
          fontWeight: 'bold',
          rotate: 45,
          interval: 0
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
        },
        formatter:
          '<h4 style="color: white">{b}</h4><span>{a2}: {c2}<br />{a1}: {c1}<br />{a0}: {c0}</span>'
      },
      legend: {
        data: labels,
        bottom: '0px',
        icon: 'circle'
      },
      grid: {
        left: '1%',
        right: 0,
        bottom: '20px',
        top: '20px',
        containLabel: true
      },
      series: [
        {
          data: listConfirmed,
          name: labels[0],
          stack: 'one',
          type: 'bar',
          color: Constants.confirmedColor
        },
        {
          data: listCured,
          name: labels[1],
          stack: 'one',
          type: 'bar',
          color: Constants.curedColor
        },
        {
          data: listDeaths,
          name: labels[2],
          stack: 'one',
          type: 'bar',
          color: Constants.deathColor
        }
      ]
    };
  }

  render() {
    const { state } = this.props;
    const { isLoaded, error, isStale } = state;

    return (
      <Card
        isLoaded={isLoaded}
        title="Număr de cazuri pe zile"
        subtitle={`Pana la ${state.endDate} (Ultimele ${this.recordsLimit} zile)`}
        isStale={isStale}
        error={error}
        embedPath={EMBED_PATH_CASES_PER_DAY}
      >
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
