import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card } from '../layout/card';

const months = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Noi', 'Dec'];

export class CasesPerDayCard extends React.PureComponent {

  formatDate(date){
    const day = date.getDate();
    const month = months[date.getMonth()]
    return `${day} ${month}`;
  }

  getChartOptions(data) {
    return {
      xAxis: {
        type: 'category',
        data: data.map(d => this.formatDate(d.date))
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              axis: 'x'
          }
      },
      legend: {
        data: ['Raportati', 'Confirmati', 'Vindecati']
      },
      series: [{
        data: data.map(d => d.symptomatic),
        name: 'Raportati',
        stack: 'one',
        type: 'bar',
      }, {
        data: data.map(d => d.confirmed),
        name: 'Confirmati',
        stack: 'one',
        type: 'bar',
      }, {
        data: data.map(d => d.cured),
        name: 'Vindecati',
        stack: 'one',
        type: 'bar',
      },]
    };
  }

  render() {
    const { data } = this.props;
    return (
      <Card>
        {data &&
          <ReactEcharts
            style={{
              height: '400px',
              width: '100%',
            }}
            option={this.getChartOptions(data)}
            theme='light'
          />}
      </Card>
    );
  }
}
