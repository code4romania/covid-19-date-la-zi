import React from 'react';
import { Link } from 'react-router-dom';
import ReactEcharts from 'echarts-for-react';
import { Card } from '../../layout/card';

// TODO: extract this into a global config
let Constants = {
  womenColor: '#F77EB9',
  menColor: '#7EBCFF',
  womenText: 'Femei',
  menText: 'Bărbați'
};

export class GenderAndAgeCard extends React.PureComponent {

  getChartOptions(data) {
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: [Constants.womenText, Constants.menText],
            bottom: 0,
            icon: 'circle'
        },
        grid: {
            left: '4%',
            right: '4%',
            bottom: '16%',
            top: '0%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'value'
            }
        ],
        yAxis: [
            {
                type: 'category',
                name: 'Vârsta',
                nameLocation: 'center',
                nameGap: 50,
                axisTick: {
                    show: false
                },
                data: ['1-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81+']
            }
        ],
        series: [
            {
                name: Constants.menText,
                type: 'bar',
                stack: 'infections',
                color: Constants.menColor,
                data: [320, 302, 341, 374, 390, 450, 420, 20, 30]
            },
            {
                name: Constants.womenText,
                type: 'bar',
                stack: 'infections',
                color: Constants.womenColor,
                data: [-120, -132, -101, -134, -190, -230, -210, -20, -30]
            }
        ]
    };
  }

  render() {
    const { title, data } = this.props;
    return (
      <Card title={title}>
        {data &&
          <div className="bar-chart">
            <ReactEcharts
              id="gender-age-chart"
              option={this.getChartOptions(data)}
            />
          </div>}
      </Card>
    );
  }
}
