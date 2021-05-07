import React from 'react'
import ReactECharts from 'echarts-for-react'
import { Card } from '../../layout/card/card'
import { Tabs } from '../../layout/tabs/tabs'
import { Constants } from '../../../config/globals'
import { formatDate } from '../../../utils/date'
import { parseDailyStats } from '../../../utils/parse'
import {
  getZoomStartPercentage,
  getLegendLabels,
  getSelectedState,
} from '../../../utils/echarts'

const VIEW_TABS = [
  {
    label: 'Creștere zilnică',
    value: 'daily',
  },
  { label: 'Creștere cumulativă', value: 'cumulative' },
]
const LABELS = [
  Constants.confirmedText,
  Constants.curedText,
  Constants.deathText,
]
export const EMBED_PATH_CASES_PER_DAY = 'cazuri-pe-zi'
export class CasesPerDayCard extends React.PureComponent {
  state = {
    activeTab: VIEW_TABS[0].value,
    selected: getSelectedState(LABELS),
  }

  getChartOptions(records) {
    const dates = records.dates
    const listConfirmed = records.confirmedCasesHistory
    const listCured = records.curedCasesHistory
    const listDeaths = records.deathCasesHistory
    const labels = getLegendLabels(LABELS, this.state.selected)
    const chartType =
      this.state.activeTab === VIEW_TABS[0].value ? 'bar' : 'line'
    const tooltipItemColorStyle =
      'border-radius: 50%; margin-right: 6px; width: 10px; height: 10px;'
    const tooltipItemStyle =
      'height: 20px; display: flex; flex-wrap: nowrap; align-items: center;'
    const chartStack = chartType === 'bar' ? 'one' : false
    const zoomStart = getZoomStartPercentage(dates)

    return {
      aria: {
        show: true,
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: {
          color: 'gray',
          fontWeight: 'bold',
          rotate: 45,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: 'gray',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          axis: 'x',
        },
        formatter: function (params) {
          const date = `${params[0].axisValueLabel}`
          const cases = params.map(
            (param) => `
          <span style="${tooltipItemStyle}">
            <span
            style="${tooltipItemColorStyle} background-color: ${param.color};"
            ></span>
            <p style={"text-align: right;"}>${param.seriesName}: ${param.value}</p>
          </span>`
          )

          return `
            ${date}
            ${cases.reverse().join('')}
          `
        },
      },
      legend: {
        data: labels,
        bottom: 0,
      },
      grid: {
        left: '1%',
        right: '1%',
        bottom: 80,
        top: 20,
        containLabel: true,
      },
      dataZoom: [
        {
          type: 'slider',
          start: zoomStart,
          end: 100,
          bottom: 50,
        },
      ],
      series: [
        {
          data: listConfirmed,
          name: Constants.confirmedText,
          stack: chartStack,
          type: chartType,
          color: Constants.confirmedColor,
        },
        {
          data: listCured,
          name: Constants.curedText,
          stack: chartStack,
          type: chartType,
          color: Constants.curedColor,
        },
        {
          data: listDeaths,
          name: Constants.deathText,
          stack: chartStack,
          type: chartType,
          color: Constants.deathColor,
        },
      ],
    }
  }

  handleClickTab = (tab) => {
    this.setState({ activeTab: tab.value })
  }

  onChartLegendselectchanged = ({ selected }) => {
    this.setState({ selected })
  }

  render() {
    const { activeTab } = this.state
    const daily = parseDailyStats(this.props.state, { cumulative: false })
    const cumulative = parseDailyStats(this.props.state, { cumulative: true })
    const records = activeTab === VIEW_TABS[0].value ? daily : cumulative
    const { error, isStale, lastUpdatedOn } = records
    return (
      <Card
        title="Număr de cazuri pe zile"
        subtitle={`Ultima actualizare: ${formatDate(lastUpdatedOn)}`}
        isStale={isStale}
        error={error}
        embedPath={EMBED_PATH_CASES_PER_DAY}
      >
        <ReactECharts
          lazyUpdate
          opts={{ renderer: 'svg' }}
          style={{
            height: '470px',
            marginBottom: '1rem',
          }}
          option={this.getChartOptions(records)}
          onEvents={{ legendselectchanged: this.onChartLegendselectchanged }}
        />
        <Tabs
          tabList={VIEW_TABS}
          activeTab={activeTab}
          onSelect={this.handleClickTab}
        />
      </Card>
    )
  }
}
