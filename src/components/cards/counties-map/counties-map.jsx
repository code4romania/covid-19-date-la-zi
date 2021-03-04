import React from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { Card } from '../../layout/card/card';
import { Constants } from '../../../config/globals';
import { formatDate } from '../../../utils/date';

export const EMBED_COUNTIES_MAP = 'counties-map';

export class CountiesMap extends React.PureComponent {
  getChartOptions(data) {
    return {
      tooltip: {
        trigger: 'item',
        formatter: (item) => `
          <strong style="color:#fff">${item.name}</strong></br>
          Cazuri totale: ${item.data.countyInfectionsNumbers}</br>
          Incidență cumulată: ${item.value}`,
      },
      visualMap: {
        type: 'piecewise',
        show: true,
        pieces: [
          { min: 3, color: Constants.red, label: '> 3 la 1000' },
          { min: 1.5, max: 3, color: Constants.orange, label: '> 1.5 la 1000' },
          { min: 1, max: 1.5, color: Constants.yellow, label: '> 1 la 1000' },
          { max: 1, color: Constants.green, label: '< 1 la 1000' },
        ],
        left: 'left',
        top: 'bottom',
        text: ['Ridicat', 'Scăzut'],
        calculable: false,
        showLabel: true,
      },
      series: [
        {
          name: 'Cazuri',
          type: 'map',
          mapType: 'RO',
          itemStyle: {
            areaColor: Constants.curedColor,
          },
          emphasis: {
            label: {
              show: false,
            },
          },
          data,
        },
      ],
    };
  }

  render() {
    const { state } = this.props;
    const { isLoaded, error, counties, stale, lastUpdatedOn } = state;

    return (
      <Card
        error={error}
        isLoaded={isLoaded}
        title=" Incidenta cumulata a cazurilor la nivel județean în ultimele 14 zile la mia de locuitori"
        subtitle={`Ultima actualizare: ${formatDate(lastUpdatedOn)}`}
        isStale={stale}
        embedPath={EMBED_COUNTIES_MAP}
      >
        {counties && (
          <ReactEChartsCore
            echarts={echarts}
            lazyUpdate
            option={this.getChartOptions(counties)}
            style={{ height: '400px' }}
            className="react_for_echarts"
          />
        )}
      </Card>
    );
  }
}
