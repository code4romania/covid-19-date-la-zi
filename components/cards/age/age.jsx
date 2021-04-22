import React from 'react'
import ReactECharts from 'echarts-for-react'
import { Card } from '../../layout/card/card'
import { Constants } from '../../../config/globals'
import { formatDate } from '../../../utils/date'
import { parseAgeStats } from '../../../utils/parse'

export const EMBED_PATH_AGE = 'varsta'
export class AgeCard extends React.PureComponent {
  getChartOptions = (state) => {
    // this is here to prevent errors until state is defined
    const yAxisData = state.data && state.data.map((item) => item.name)
    const seriesValues = state.data

    const labels = ['Confirmați']
    return {
      aria: {
        show: true,
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          color: 'gray',
          rotate: 45,
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
          const [item] = rawData
          return `${item.name}: ${item.data.value} (${item.data.percentage}%)`
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
              const { data } = rawData
              return ` ${data.value} (${data.percentage}%) `
            },
            color: 'black',
            fontWeight: 'bold',
          },
        },
      ],
    }
  }

  render() {
    const { title, state } = this.props
    const { error, lastUpdatedOn, stale, ...parsedData } = parseAgeStats(state)
    return (
      <Card
        error={error}
        title={title}
        subtitle={`Ultima actualizare: ${formatDate(lastUpdatedOn)}`}
        isStale={stale}
        embedPath={EMBED_PATH_AGE}
      >
        <div className="pie-chart">
          <ReactECharts
            lazyUpdate
            opts={{ renderer: 'svg' }}
            id="age-chart"
            style={{
              height: '250px',
              width: '100%',
            }}
            option={this.getChartOptions(parsedData)}
          />
        </div>
      </Card>
    )
  }
}
