import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card } from '../../layout/card/card';
import { Constants } from '../../../config/globals';

export const EMBED_COUNTIES_TABLE = 'counties';

export class CountiesCard extends React.PureComponent {
  getChartOptions() {
    return {
      tooltip: {
        trigger: 'item'
      },
      visualMap: {
        show: false,
        min: 0,
        max: this.props.state.max,
        left: 'left',
        top: 'bottom',
        text: ['Ridicat', 'Scazut'],
        calculable: true,
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
          label: {
            normal: {
              show: false
            }
          },
          data: this.props.state.counties
        }
      ]
    };
  }

  render() {
    const state = this.props.state;
    const { isLoaded, error, topCounties, isStale } = state;

    const topLines =
      topCounties &&
      topCounties.map(county => (
        <tr key={county.name}>
          <td>{county.name}</td>
          <td className="has-text-right">{county.value}</td>
        </tr>
      ));

    return (
      <Card
        error={error}
        isLoaded={isLoaded}
        title="Cazuri confirmate pe judete"
        isStale={isStale}
        embedPath={EMBED_COUNTIES_TABLE}
      >
        <ReactEcharts
          option={this.getChartOptions()}
          style={{ height: '260px', width: '100%', top: '-5%' }}
          className="react_for_echarts"
        />
        <table className="table">
          <tbody>{topLines}</tbody>
        </table>
      </Card>
    );
  }
}
