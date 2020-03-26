import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card } from '../../layout/card';
import { Constants } from '../../../config/globals';
import './gender-card.css';

export const EMBED_PATH_GENDER = 'gen';
export class GenderCard extends React.PureComponent {
  
  getChartOptions(state) {
    let data = [
      { value: state.women, name: Constants.womenText },
      { value: state.men, name: Constants.menText }
    ];

    let colors = [Constants.womenColor, Constants.menColor];

    if(state.children > 0){
      data.push({value: state.children, name: Constants.childrenText});
      colors.push(Constants.childrenColor);
    }

    if (Constants.specifyUnknownData) {
      data.push({
        value: state.unknown,
        name: Constants.unknownGenderText
      });
      colors.push(Constants.unknownColor);
    }

    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}%'
      },
      legend: {
        orient: 'horizontal',
        icon: 'circle',
        bottom: 0,
        tooltip: {
          show: false,
          trigger: 'item'
        }
      },
      animation: false,
      series: [
        {
          id: 'gender-chart',
          name: 'Bolnavi',
          type: 'pie',
          radius: ['55%', '90%'],
          avoidLabelOverlap: false,
          bottom: 40,
          label: {
            normal: {
              show: false
            },
            emphasis: { show: false }
          },
          data: data,
          color: colors
        }
      ]
    };
  }

  render() {
    const { title, state } = this.props;
    const { isLoaded, error } = state;

    let knownPercentage = '';
    if (Constants.specifyUnknownData) {
      knownPercentage =
        state.knownPercentage !== undefined
          ? ' (' + state.knownPercentage + '% cunoscuți)'
          : '';
    }

    return (
      <Card isLoaded={isLoaded} error={error} title={title + knownPercentage} embedPath={EMBED_PATH_GENDER}>
        <div className="pie-chart">
          <ReactEcharts
            id="gender-chart"
            style={{ height: '400px' }}
            option={this.getChartOptions(state)}
          />
        </div>
      </Card>
    );
  }
}
