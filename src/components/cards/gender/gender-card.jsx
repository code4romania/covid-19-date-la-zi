import React from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { Card } from '../../layout/card/card';
import { Constants } from '../../../config/globals';
import { formatDate } from '../../../utils/date';
import './gender-card.css';


export const EMBED_PATH_GENDER = 'gen';
export class GenderCard extends React.PureComponent {
  getChartOptions(state) {
    let data = [
      { value: state.women, name: Constants.womenText },
      { value: state.men, name: Constants.menText },
    ];

    let colors = [Constants.womenColor, Constants.menColor];

    if (state.children > 0) {
      data.push({ value: state.children, name: Constants.childrenText });
      colors.push(Constants.childrenColor);
    }

    if (Constants.specifyUnknownData) {
      data.push({
        value: state.unknown,
        name: Constants.unknownGenderText,
      });
      colors.push(Constants.unknownColor);
    }

    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}%',
      },
      legend: {
        orient: 'horizontal',
        icon: 'circle',
        bottom: 0,
        tooltip: {
          show: false,
          trigger: 'item',
        },
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
              show: false,
            },
            emphasis: { show: false },
          },
          data: data,
          color: colors,
        },
      ],
    };
  }

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
        embedPath={EMBED_PATH_GENDER}
      >
        <div className="pie-chart">
          <ReactEChartsCore
            echarts={echarts}
            lazyUpdate
            id="gender-chart"
            style={{ height: '400px' }}
            option={this.getChartOptions(state)}
          />
        </div>
      </Card>
    );
  }
}
