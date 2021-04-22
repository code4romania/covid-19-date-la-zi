import React from 'react'
import ReactECharts from 'echarts-for-react'
import { Card } from '../../layout/card/card'
import { formatDate } from '../../../utils/date'
import { parseAgeCategory } from '../../../utils/parse'

export const EMBED_PATH_AGE_CATEGORY = 'categorie-varsta'
export class AgeCategory extends React.PureComponent {
  getChartOptions = (state) => {
    const { ageCategories, dateStrings } = state
    const series =
      ageCategories &&
      Object.entries(ageCategories).map(([key, value]) => ({
        data: value,
        type: 'line',
        smooth: true,
        name: key,
      }))
    return {
      aria: {
        show: true,
      },
      baseOption: {
        grid: {
          left: 40,
          top: 10,
          right: 10,
          bottom: 100,
        },
        legend: {
          bottom: 0,
        },
        icon: 'roundRect',
        xAxis: {
          type: 'category',
          data: dateStrings,
          axisLabel: {
            color: 'gray',
            rotate: 45,
          },
        },
        yAxis: {},
        tooltip: {
          trigger: 'axis',
        },
        dataZoom: [
          {
            type: 'slider',
            start: 80,
            end: 100,
            bottom: 50,
          },
        ],
        series,
      },
      media: [
        {
          query: { maxWidth: 400 },
          option: {
            grid: { bottom: 160 },
            dataZoom: [{ bottom: 100 }],
          },
        },
      ],
    }
  }

  render() {
    const { title, state } = this.props
    const { error, lastUpdatedOn, stale, ...parsedData } = parseAgeCategory(
      state
    )
    return (
      <Card
        error={error}
        title={title}
        subtitle={`Ultima actualizare: ${formatDate(lastUpdatedOn)}`}
        isStale={stale}
        embedPath={EMBED_PATH_AGE_CATEGORY}
      >
        <ReactECharts
          lazyUpdate
          opts={{ renderer: 'svg' }}
          id="age-category"
          style={{
            height: '470px',
          }}
          option={this.getChartOptions(parsedData)}
        />
      </Card>
    )
  }
}
