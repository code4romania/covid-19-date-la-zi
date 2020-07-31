import React from 'react';
import ReactEcharts from 'echarts-for-react';
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
      grid: {
        left: 40,
        top: 40,
        right: 0,
        bottom: 20,
      },
      legend: { type: 'scroll' },
      icon: 'roundRect',
      xAxis: {
        type: 'category',
        data: dateStrings,
      },
      yAxis: {},
      tooltip: {
        trigger: 'axis',
      },
      series,
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
        <ReactEcharts
          id="age-category"
          option={this.getChartOptions(state)}
          theme="light"
        />
      </Card>
    );
  }
}
