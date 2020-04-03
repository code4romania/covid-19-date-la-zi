import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card } from '../../layout/card/card';
import './summary-card.css';
import { SUMMARY_CHART_THEME } from './summary-chart.theme';

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
      series: [
        {
          data: data,
          type: 'line'
        }
      ]
    };
  }

  render() {
    const {
      title,
      data,
      special,
      total,
      isLoaded,
      error,
      embedPath
    } = this.props;
    return (
      <Card isLoaded={isLoaded} error={error} embedPath={embedPath}>
        <h3 className="is-uppercase summary-title">{title}</h3>
        <h4 className="is-inline-block total">{total}</h4>
        {special && (
          <span className="is-inline-block special">
            <span
              className={
                special.isGood ? 'has-text-success' : 'has-text-danger'
              }
            >
              {special.value}
            </span>
            &nbsp;
            {special.label}
          </span>
        )}
        {data && (
          <div className="mini-chart">
            <ReactEcharts
              style={{
                height: '100%',
                width: '100%'
              }}
              option={this.getChartOptions(data)}
              theme={SUMMARY_CHART_THEME}
            />
          </div>
        )}
      </Card>
    );
  }
}
