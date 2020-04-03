import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card } from '../../layout/card/card';
import { Constants } from '../../../config/globals';

export const EMBED_COUNTIES_MAP = 'counties-map';

export class CountiesMap extends React.PureComponent {
  getChartOptions(data) {
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{a} </br> {b}: {c}‰'
      },
      visualMap: {
        show: true,
        min: 0,
        max: this.props.state.max,
        left: 'left',
        top: 'bottom',
        text: ['Ridicat', 'Scazut'],
        calculable: false,
        inRange: {
          color: [Constants.countyLowestColor, Constants.countyHighestColor]
        }
      },
      series: [
        {
          name: 'Cazuri',
          type: 'map',
          mapType: 'RO',
          itemStyle: {
            areaColor: Constants.curedColor
          },
          emphasis: {
            label: {
              show: false
            }
          },
          data
        }
      ]
    };
  }

  render() {
    const { state } = this.props;
    const { isLoaded, error, counties, stale, lastUpdatedOnString } = state;

    return (
      <Card
        error={error}
        isLoaded={isLoaded}
        title="Cazuri confirmate pe judete"
        subtitle={`Ultima actualizare: ${lastUpdatedOnString}`}
        isStale={stale}
        embedPath={EMBED_COUNTIES_MAP}
      >
        {counties && (
          <ReactEcharts
            option={this.getChartOptions(counties)}
            style={{ height: '400px' }}
            className="react_for_echarts"
          />
        )}
      </Card>
    );
  }
}
