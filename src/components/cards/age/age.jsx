import React from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { Card } from '../../layout/card/card';
import { Constants } from '../../../config/globals';
import { formatDate } from '../../../utils/date';

export const EMBED_PATH_AGE = 'varsta';
export class AgeCard extends React.PureComponent {
  getChartOptions = (state) => {
    // this is here to prevent errors until state is defined
    const yAxisData = state.data && state.data.map((item) => item.name);
    const seriesValues = state.data;

    const labels = ['Confirmați'];
    return {
      xAxis: {
        type: 'value',
        axisLabel: {
          color: 'gray',
        },
      },
      yAxis: {
        type: 'category',
        data: yAxisData,
        axisLabel: {
          color: 'gray',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          axis: 'y',
        },
        formatter: (rawData) => {
          const [item] = rawData;
          return `${item.name}: ${item.data.value} (${item.data.percentage}%)`;
        },
      },
      legend: {
        show: false,
      },
      grid: {
        left: 0,
        right: '40px',
        bottom: '0',
        top: 0,
        containLabel: true,
      },
      series: [
        {
          data: seriesValues,
          name: labels[0],
          stack: 'one',
          type: 'bar',
          color: Constants.confirmedColor,
          label: {
            show: true,
            position: 'right',
            formatter: (rawData) => {
              const { data } = rawData;
              return ` ${data.value} (${data.percentage}%) `;
            },
            color: 'black',
            fontWeight: 'bold',
          },
        },
      ],
    };
  };

  render() {
    const { title, state } = this.props;
    const { isLoaded, error, lastUpdatedOn, stale } = state;
    return (
      <Card
        isLoaded={isLoaded}
        error={error}
        title={title}
        subtitle={`Ultima actualizare: ${formatDate(lastUpdatedOn)}`}
        isStale={stale}
        embedPath={EMBED_PATH_AGE}
      >
        <div className="pie-chart">
          <ReactEChartsCore
            echarts={echarts}
            lazyUpdate
            id="age-chart"
            style={{
              height: '250px',
              width: '100%',
            }}
            option={this.getChartOptions(state)}
            theme="light"
          />
        </div>
      </Card>
    );
  }
}
