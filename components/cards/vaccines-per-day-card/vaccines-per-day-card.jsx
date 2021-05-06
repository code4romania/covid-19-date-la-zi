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
const VACCINES_LABELS = [
  Constants.pfizerName,
  Constants.modernaName,
  Constants.astraZenecaName,
  Constants.johnsonAndJohnsonName,
]

export const EMBED_PATH_VACCINES_PER_DAY = 'doze-pe-zi'

export class VaccinesPerDayCard extends React.PureComponent {
  state = {
    activeTab: VIEW_TABS[0].value,
    selected: VACCINES_LABELS.reduce((o, key) => ({ ...o, [key]: true }), {}),
  }

  getZoomStartPercentage = (dates) => {
    const datesCount = dates?.length
    const daysToShow = 14
    return datesCount ? ((datesCount - daysToShow) * 100) / datesCount : 0
  }

  getLegendIcon = (selected) => {
    return selected
      ? 'path://M10.6667 0H1.33333C0.593333 0 0 0.6 0 1.33333V10.6667C0 11.4 0.593333 12 1.33333 12H10.6667C11.4067 12 12 11.4 12 10.6667V1.33333C12 0.6 11.4067 0 10.6667 0ZM4.66667 9.33333L1.33333 6L2.27333 5.06L4.66667 7.44667L9.72667 2.38667L10.6667 3.33333L4.66667 9.33333Z'
      : 'path://M10.6667 1.33333V10.6667H1.33333V1.33333H10.6667ZM10.6667 0H1.33333C0.6 0 0 0.6 0 1.33333V10.6667C0 11.4 0.6 12 1.33333 12H10.6667C11.4 12 12 11.4 12 10.6667V1.33333C12 0.6 11.4 0 10.6667 0Z'
  }

  getLegendLabels = (labels) => {
    return labels.map((label) => ({
      name: label,
      icon: this.getLegendIcon(this.state.selected[label]),
    }))
  }

  getChartOptions(records) {
    const { dates, pfizer, moderna, astraZeneca, johnsonAndJohnson } = records
    const labels = this.getLegendLabels(VACCINES_LABELS)
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
        name: Constants.pfizerName,
        stack: chartStack,
        type: chartType,
        color: Constants.pfizerColor,
      },
      listModerna?.length && {
        data: listModerna,
        name: Constants.modernaName,
        stack: chartStack,
        type: chartType,
        color: Constants.modernaColor,
      },
      listAstraZeneca?.length && {
        data: listAstraZeneca,
        name: Constants.astraZenecaName,
        stack: chartStack,
        type: chartType,
        color: Constants.astraZenecaColor,
      },
      listJohnsonAndJohnson?.length && {
        data: listJohnsonAndJohnson,
        name: Constants.johnsonAndJohnsonName,
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

  onChartLegendselectchanged = ({ selected }) => {
    this.setState({ selected })
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
          onEvents={{ legendselectchanged: this.onChartLegendselectchanged }}
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
