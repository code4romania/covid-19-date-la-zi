import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card } from '../layout/card';

export class Doughnut extends React.PureComponent {
  render() {
    const { chartData, title } = this.props;
    const chartOptions = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 10,
        data: chartData.legend
      },
      series: [
        {
          name: 'Descriptive name',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: chartData.series
        }
      ]
    };
    return (
      <Card title={title}>
        <ReactEcharts option={chartOptions} />
      </Card>
    );
  }
}
