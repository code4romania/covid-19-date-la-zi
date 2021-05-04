import React from 'react'
import ReactECharts from 'echarts-for-react'
import { Card } from '../../layout/card/card'
import { Constants } from '../../../config/globals'
import { Tabs } from '../../layout/tabs/tabs'
import { formatDate } from '../../../utils/date'
import { parseVaccinesHistory } from '../../../utils/parse'

const VIEW_TABS = [
  {
    label: 'Creștere zilnică',
    value: 'daily',
  },
  { label: 'Creștere cumulativă', value: 'cumulative' },
]
export const EMBED_PATH_VACCINES_PER_DAY = 'doze-pe-zi'
export class VaccinesPerDayCard extends React.PureComponent {
  state = {
    activeTab: VIEW_TABS[0].value,
  }

  getZoomStartPercentage = (dates) => {
    const datesCount = dates?.length
    const daysToShow = 14
    return datesCount ? ((datesCount - daysToShow) * 100) / datesCount : 0
  }

  getChartOptions(records) {
    const { dates, pfizer, moderna, astraZeneca } = records
    const labels = ['Pfizer BioNTech', 'Moderna', 'AstraZeneca', 'Johnson&Johnson']
    const chartType =
      this.state.activeTab === VIEW_TABS[0].value ? 'bar' : 'line'
    const chartStack = chartType === 'bar' ? 'one' : false
    const zoomStart = this.getZoomStartPercentage(dates)
    const listPfizer = pfizer
    const listModerna = moderna
    const listAstraZeneca = astraZeneca
    const listJohnsonAndJohnson = johnsonAndJohnson
    const series = [
      listPfizer?.length && {
        data: listPfizer,
        name: labels[0],
        stack: chartStack,
        type: chartType,
        color: Constants.pfizerColor,
      },
      listModerna?.length && {
        data: listModerna,
        name: labels[1],
        stack: chartStack,
        type: chartType,
        color: Constants.modernaColor,
      },
      listAstraZeneca?.length && {
        data: listAstraZeneca,
        name: labels[2],
        stack: chartStack,
        type: chartType,
        color: Constants.astraZenecaColor,
      },
      listJohnsonAndJohnson?.length && {
        data: listJohnsonAndJohnson,
        name: labels[3],
        stack: chartStack,
        type: chartType,
        color: Constants.johnsonAndJohnsonColor,
      },
    ]

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
      },
      legend: {
        data: labels,
        bottom: 0,
        icon: 'circle',
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
      series: series,
    }
  }

  handleClickTab = (tab) => {
    this.setState({ activeTab: tab.value })
  }

  render() {
    const { activeTab } = this.state
    const daily = parseVaccinesHistory(this.props.state, {
      cumulative: false,
    })
    const cumulative = parseVaccinesHistory(this.props.state, {
      cumulative: true,
    })
    const records = activeTab === VIEW_TABS[0].value ? daily : cumulative
    const { isStale, error, lastUpdatedOn } = records

    return (
      <Card
        title="Doze de vaccin administrate pe zile"
        subtitle={`Ultima actualizare: ${formatDate(lastUpdatedOn)}`}
        isStale={isStale}
        error={error}
        embedPath={EMBED_PATH_VACCINES_PER_DAY}
      >
        <ReactECharts
          lazyUpdate
          opts={{ renderer: 'svg' }}
          style={{
            height: '470px',
            marginBottom: '1rem',
          }}
          option={this.getChartOptions(records)}
        />
        <Tabs
          tabList={VIEW_TABS}
          activeTab={activeTab}
          onSelect={this.handleClickTab}
        />
        <p>
          În cazul vaccinelor Pfizer BioNTech, Moderna și AstraZeneca sunt
          necesare două doze pentru imunizare. În cazul vaccinului
          Johnson&Johnson este necesară o singură doză pentru 
          imunizare.
        </p>
      </Card>
    )
  }
}
