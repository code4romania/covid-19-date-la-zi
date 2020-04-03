import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card } from '../../layout/card/card';
import { Constants } from '../../../config/globals';

export const EMBED_PATH_AGE = 'varsta';
export class AgeCard extends React.PureComponent {
  getChartOptions = state => {
    // this is here to prevent errors until state is defined
    const yAxisData = state.data && state.data.map(item => item.name);
    const seriesValues =
      state.data &&
      state.data.map(item => {
        return {
          value: item.value,
          percentage: item.percentage
        };
      });

    const labels = ['Confirmați'];
    return {
      xAxis: {
        type: 'value',
        axisLabel: {
          color: 'gray'
        }
      },
      yAxis: {
        type: 'category',
        data: yAxisData,
        axisLabel: {
          color: 'gray'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          axis: 'y'
        },
        formatter: rawData => {
          const item = rawData[0];
          return `${item.name}: ${item.data.value} (${item.data.percentage}%)`;
        }
      },
      legend: {
        show: false
        // data: labels[0],
        // bottom: '0px',
        // icon: 'circle',
      },
      grid: {
        left: '1%',
        right: '2%',
        bottom: '0',
        top: '2%',
        containLabel: true
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
            formatter: rawData => {
              const item = rawData;
              return ` ${item.data.value} (${item.data.percentage}%) `;
            },
            color: 'black',
            fontWeight: 'bold'
          }
        }
      ]
    };
  };

  render() {
    const { title, state } = this.props;
    const { isLoaded, error, lastUpdatedOnString, isStale } = state;

    let knownPercentage = '';
    if (Constants.specifyUnknownData) {
      knownPercentage =
        this.state.knownPercentage !== undefined
          ? ' (' + this.state.knownPercentage + '% cunoscuți)'
          : '';
    }

    return (
      <Card
        isLoaded={isLoaded}
        error={error}
        title={`${title}${knownPercentage}`}
        subtitle={`Ultima actualizare: ${lastUpdatedOnString}`}
        isStale={isStale}
        embedPath={EMBED_PATH_AGE}
      >
        <div className="pie-chart">
          <ReactEcharts
            id="age-chart"
            style={{
              height: '250px',
              width: '100%'
            }}
            option={this.getChartOptions(state)}
            theme="light"
          />
        </div>
      </Card>
    );
  }
}
