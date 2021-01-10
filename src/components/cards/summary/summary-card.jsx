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
        xAxisData: data.xAxisData,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: data,
          type: 'line',
        },
      ],
    };
  }

  render() {
    const {
      title,
      subTitle,
      data,
      special,
      total,
      isLoaded,
      error,
      embedPath,
      stale,
    } = this.props;
    return (
      <Card
        isLoaded={isLoaded}
        error={error}
        isStale={stale}
        embedPath={embedPath}
        title={title}
        subtitle={subTitle}
      >
        <h4 className="is-inline-block">{total}</h4>
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
                width: '100%',
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
