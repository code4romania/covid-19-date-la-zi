import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { Card } from '../layout/card'

export class LineChart extends React.PureComponent {
  render() {
    const {chartData, title} = this.props
    const chartOptions = {
      xAxis: {
        type: 'category',
        data: chartData.xAxisData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'line',
          data: chartData.series
        }
      ]
    }
    return (
      <Card title={title}>
        <ReactEcharts option={chartOptions} />
      </Card>
    )
  }
}
