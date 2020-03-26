import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card } from '../../layout/card';
import { Constants } from '../../../config/globals';

export const EMBED_PATH_AGE = 'varsta';
export class AgeCard extends React.PureComponent {

  getChartOptions = (state) => {
    // this colors will be changed in the future. Waiting feedback from Olivia.
    let colors = [
      Constants.womenColor,
      Constants.menColor,
      Constants.orange,
      Constants.magenta,
      Constants.green,
      Constants.grey,
      Constants.lightblue,
      Constants.curedColor,
      Constants.oldestColor,
      Constants.processingColor
    ]

    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const isLandscape = viewportWidth < viewportHeight;

    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        orient: isLandscape ? 'horizontal' : 'vertical',
        icon: 'circle',
        right: isLandscape ? 'auto' : 0,
        bottom: isLandscape ? 0 : 'auto',
        top: isLandscape ? 'auto' : 40,
        formatter: (name) => {
          const filterItem = state.data.filter(item => item.name === name);
          return filterItem.length === 1 ?  `${name}: ${filterItem[0].value} (${filterItem[0].percentage}%)` : '';
        },
        tooltip: {
          show: true,
          trigger: 'item'
        },
      },
      animation: true,
      series: [
        {
          id: 'age-chart-series',
          name: this.props.title,
          type: 'pie',
          radius: isLandscape ? ['30%', '45%'] : ['40%', '70%'],
          avoidLabelOverlap: false,
          right: isLandscape ? 'auto' : 40,
          top: isLandscape ? -140 : 'auto',
          label: {
            normal: {
              show: false
            },
            emphasis: { show: false }
          },
          data: state.data,
          color: colors
        }
      ]
    }
  }



  render() {
    const { title, state } = this.props;
    const { isLoaded, error } = state;

    let knownPercentage = '';
    if (Constants.specifyUnknownData) {
      knownPercentage =
        this.state.knownPercentage !== undefined
          ? ' (' + this.state.knownPercentage + '% cunoscuți)'
          : '';
    }

    return (
      <Card
        isLoaded={isLoaded} error={error}
        title={`${title}${knownPercentage}`}
        embedPath={EMBED_PATH_AGE}
      >
        <div className="pie-chart">
          <ReactEcharts
            id="age-chart"
            option={this.getChartOptions(state)}
          />
        </div>
      </Card>
    );
  }
}
