import React from 'react';
import { Link } from 'react-router-dom';
import ReactEcharts from 'echarts-for-react';
import { Card } from '../../layout/card';
import { Constants} from '../../../config/globals'
import './gender-card.css'

export class GenderCard extends React.PureComponent {

  getChartOptions(data) {
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'horizontal',
        icon: 'circle',
        bottom: 0,
        tooltip: {
          show: false,
          trigger: 'item'
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
          // selectedMode: false,
          bottom: 40,
          label: {
            normal: {
              show: true,
              formatter: '{b} \n ({c})'
            },
            emphasis: { show: false }
          },
          data: [
            {value: 335, name: Constants.womenText},
            {value: 1548, name: Constants.menText}
          ],
          color: [Constants.womenColor, Constants.menColor]
        }
      ]
    };
  }

  render() {
    const { title, data } = this.props;
    return (
      <Card title={title}>
        {data &&
          <div className="pie-chart">
            <ReactEcharts
              id="gender-chart"
              option={this.getChartOptions(data)}
            />
          </div>}
      </Card>
    );
  }
}
