import React from 'react'
import { LineChart } from './components/charts/line'
import {Doughnut} from './components/charts/doughnut'
import {TopNav} from './components/layout/nav/top-nav'

function App() {
  const chartData = {
    xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], 
    series: [26, 37, 11, 56, 122, 233, 98]
  }
  const doughnutChartData = {
    legend: chartData.xAxisData,
    series: chartData.series.map((v, i) => ({ value: v, name: chartData.xAxisData[i] }))
  }
  return (
    <div id="app">
      <TopNav></TopNav>
      <div className="container">
        <section>
          <div className="columns is-mobile">
            <div className="column">
              <LineChart title={'My line chart'} chartData={chartData} />
            </div>
            <div className="column">
              <Doughnut title={'My doughnut chart'} chartData={doughnutChartData} />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
