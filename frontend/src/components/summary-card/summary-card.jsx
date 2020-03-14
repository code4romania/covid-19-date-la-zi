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
        data: data,
        type: 'line',
      }]
    };
  }

  getTotal(data) {
    return data && data.reduce((a, b) => a + b, 0);
  }

  render() {
    const { title, data, special } = this.props;
    const total = this.getTotal(data);
    return (
      <Card>
        <h3>{title}</h3>
        <h4 className="is-inline-block total">{total}</h4>
        {special &&
          <span className="is-inline-block special">
            <span className={special.isGood ? 'has-text-success' : 'has-text-danger'}>
              {special.value}
            </span>
            &nbsp;
            {special.label}
          </span>}
        {data &&
          <div className="mini-chart">
            <ReactEcharts
              style={{
                height: '100%',
                width: '100%',
              }}
              option={this.getChartOptions(data)}
              theme={SUMMARY_CHART_THEME}
            />
          </div>}
      </Card>
    );
  }
}
