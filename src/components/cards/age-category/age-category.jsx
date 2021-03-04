import React from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { Card } from '../../layout/card/card';
import { formatDate } from '../../../utils/date';

export const EMBED_PATH_AGE_CATEGORY = 'categorie-varsta';
export class AgeCategory extends React.PureComponent {
  getChartOptions = (state) => {
    const { ageCategories, dateStrings } = state;
    const series =
      ageCategories &&
      Object.entries(ageCategories).map(([key, value]) => ({
        data: value,
        type: 'line',
        smooth: true,
        name: key,
      }));
    return {
      baseOption: {
        grid: {
          left: 40,
          top: 10,
          right: 10,
          bottom: 100,
        },
        legend: {
          bottom: 0,
        },
        icon: 'roundRect',
        xAxis: {
          type: 'category',
          data: dateStrings,
        },
        yAxis: {},
        tooltip: {
          trigger: 'axis',
        },
        dataZoom: [
          {
            type: 'slider',
            start: 80,
            end: 100,
            bottom: 50,
          },
        ],
        series,
      },
      media: [
        {
          query: { maxWidth: 400 },
          option: {
            grid: { bottom: 160 },
            dataZoom: [{ bottom: 100 }],
          },
        },
      ],
    };
  };

  render() {
    const { title, state } = this.props;
    const { isLoaded, error, lastUpdatedOn, stale } = state;
    return (
      <Card
        isLoaded={isLoaded}
        error={error}
        title={title}
        subtitle={`Ultima actualizare: ${formatDate(lastUpdatedOn)}`}
        isStale={stale}
        embedPath={EMBED_PATH_AGE_CATEGORY}
      >
        <ReactEChartsCore
          echarts={echarts}
          lazyUpdate
          id="age-category"
          style={{
            height: '470px',
          }}
          option={this.getChartOptions(state)}
          theme="light"
        />
      </Card>
    );
  }
}
