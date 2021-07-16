import React from 'react'
import ReactECharts from 'echarts-for-react'
import { Card } from '../../layout/card/card'
import { AccessibilityTable } from '../../accessibility-table'
import { Constants } from '../../../config/globals'
import { Tabs } from '../../layout/tabs/tabs'
import { formatDate } from '../../../utils/date'
import { parseVaccinesHistory } from '../../../utils/parse'
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
  Constants.pfizerText,
  Constants.modernaText,
  Constants.astraZenecaText,
  Constants.johnsonAndJohnsonText,
]

export const EMBED_PATH_VACCINES_PER_DAY = 'doze-pe-zi'

export class VaccinesPerDayCard extends React.PureComponent {
  state = {
    activeTab: VIEW_TABS[0].value,
    selected: getSelectedState(LABELS),
  }

  getChartOptions(records) {
    const { dates, pfizer, moderna, astraZeneca, johnsonAndJohnson } = records
    const labels = getLegendLabels(LABELS, this.state.selected)
    const chartType =
      this.state.activeTab === VIEW_TABS[0].value ? 'bar' : 'line'
    const chartStack = chartType === 'bar' ? 'one' : false
    const zoomStart = getZoomStartPercentage(dates)
    const listPfizer = pfizer
    const listModerna = moderna
    const listAstraZeneca = astraZeneca
    const listJohnsonAndJohnson = johnsonAndJohnson
    const series = [
      listPfizer?.length && {
        data: listPfizer,
        name: Constants.pfizerText,
        stack: chartStack,
        type: chartType,
        color: Constants.pfizerColor,
      },
      listModerna?.length && {
        data: listModerna,
        name: Constants.modernaText,
        stack: chartStack,
        type: chartType,
        color: Constants.modernaColor,
      },
      listAstraZeneca?.length && {
        data: listAstraZeneca,
        name: Constants.astraZenecaText,
        stack: chartStack,
        type: chartType,
        color: Constants.astraZenecaColor,
      },
      listJohnsonAndJohnson?.length && {
        data: listJohnsonAndJohnson,
        name: Constants.johnsonAndJohnsonText,
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
        <AccessibilityTable
          isStale={isStale}
          columns={[
            { name: 'Data', data: records.dates },
            { name: 'Pfizer BioNTech', data: records.pfizer },
            { name: 'Moderna', data: records.moderna },
            { name: 'AstraZeneca', data: records.astraZeneca },
            { name: 'Johnson&Johnson', data: records.johnsonAndJohnson },
          ]}
        />
        <p>
          În cazul vaccinelor Pfizer BioNTech, Moderna și AstraZeneca sunt
          necesare două doze pentru imunizare. În cazul vaccinului
          Johnson&Johnson este necesară o singură doză pentru imunizare.
        </p>
        <p>
          Datele despre vaccin din 9 iulie se regăsesc în
          setul de date din 10 iulie. 
        </p>
      </Card>
    )
  }
}
