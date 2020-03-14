import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card } from '../layout/card';

const months = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Noi', 'Dec'];

export class CasesPerDayCard extends React.PureComponent {

  formatDateShort(date){
    const day = date.getDate();
    const month = months[date.getMonth()]
    return `${day} ${month}`;
  }

  formatDateLong(date){
    const year = date.getFullYear();
    return `${this.formatDateShort(date)} ${year}`;
  }

  getSubtitle(data){
    var firstDate = data[0].date;
    var lastDate = data[data.length - 1].date;
    return `de la ${this.formatDateLong(firstDate)} la ${this.formatDateLong(lastDate)}`
  }

  getChartOptions(data) {
    return {
      xAxis: {
        type: 'category',
        data: data.map(d => this.formatDateShort(d.date))
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
      title: {
          left: 0,
          text: 'Numar de cazuri',
          subtext: this.getSubtitle(data),
      },
      legend: {
        data: ['Raportati', 'Confirmati', 'Vindecati'],
        right: 0
      }, 
      grid: {
        left: 0,
        right: 0,
      },
      series: [{
        data: data.map(d => d.symptomatic),
        name: 'Raportati',
        stack: 'one',
        type: 'bar',
        barMaxWidth: '10px'
      }, {
        data: data.map(d => d.confirmed),
        name: 'Confirmati',
        stack: 'one',
        type: 'bar'
      }, {
        data: data.map(d => d.cured),
        name: 'Vindecati',
        stack: 'one',
        type: 'bar'
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
