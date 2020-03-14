import React from 'react';
import { Link } from 'react-router-dom';
import ReactEcharts from 'echarts-for-react';
import { Card } from '../layout/card';
import './summary-card.css'
import { SUMMARY_CHART_THEME } from './summary-chart.theme'

export class SummaryCard extends React.PureComponent {

  getChartOptions(data) {
    return {
      xAxis: {
        type: 'category',
        xAxisData: data.xAxisData
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: data.series,
        type: 'line',
      }]
    };
  }

  render() {
    const { title, chartData, special, to } = this.props;
    const total = chartData.series.reduce((a, b) => a + b, 0);
    return (
      <Link to={to}>
        <Card>
          <h3>{title}</h3>
          <h4 className="is-inline-block">{total}</h4>
          {
            special && <span className="is-inline-block special">
              <span className={special.isGood ? 'has-text-success' : 'has-text-danger'}>
                {special.value}
              </span>
              &nbsp;
            {special.label}
            </span>
          }
          <div className="mini-chart">
            <ReactEcharts
              style={{
                height: "100%",
                width: '100%',
              }}
              option={this.getChartOptions(chartData)}
              theme={SUMMARY_CHART_THEME} />
          </div>
        </Card>
      </Link>
    );
  }
}
