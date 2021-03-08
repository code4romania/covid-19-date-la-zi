import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Card } from '../../layout/card/card';
import styles from './summary-card.module.css';
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
      error,
      embedPath,
      stale,
    } = this.props;
    return (
      <Card
        error={error}
        isStale={stale}
        embedPath={embedPath}
        title={title}
        subtitle={subTitle}
      >
        <h3 className="is-inline-block">{total}</h3>
        {special && (
          <span className={`${styles.special} is-inline-block`}>
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
          <div className={styles.mini_chart}>
            <ReactECharts
              lazyUpdate
              opts={{renderer: 'svg'}}
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
