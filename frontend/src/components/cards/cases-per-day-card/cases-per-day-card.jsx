import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card } from '../../layout/card/card';
import { Constants } from '../../../config/globals';

export const EMBED_PATH_CASES_PER_DAY = 'cazuri-pe-zi';
export class CasesPerDayCard extends React.PureComponent {
  getChartOptions(state) {
    const labels = ['Confirmați', 'Vindecați', 'Decedaţi'];
    return {
      xAxis: {
        type: 'category',
        data: state.dates,
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
    const { state } = this.props;
    const { isLoaded, error, isStale } = state;

    return (
      <Card
        isLoaded={isLoaded}
        title="Număr de cazuri pe zile"
        subtitle={`De la ${state.startDate} la ${state.endDate}`}
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
