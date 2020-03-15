import React from 'react';
import { Link } from 'react-router-dom';
import ReactEcharts from 'echarts-for-react';
import { Card } from '../../layout/card';
import { Constants, ApiURL } from '../../../config/globals'

export class InfectionSourceCard extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      date: '',
      women: 0,
      men: 0
    }
  }

  componentDidMount() {
    fetch(ApiURL.infectionSourceStats)
      .then(res => res.json())
      .then((result) => {
        if (result.error != null) {
          this.setState({error: result.error, isLoaded: true})
          // TODO: handle error
        } else {
          this.parseAPIResponse(result)
        }
      })
  }

  parseAPIResponse(result) {
    const stats = result.stats

    this.setState({
      isLoaded: true,
      men: stats.men,
      women: stats.women,
      date: stats.dateString
    })
  }

  getChartOptions() {
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
          id: 'infection-source-chart',
          name: 'Sursa',
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
          data: [
            {value: this.state.local, name: 'transmise local'},
            {value: this.state.imported, name: 'importate'}
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
        <div className="pie-chart">
          <ReactEcharts
            id="infection-source-chart"
            option={this.getChartOptions()}
          />
        </div>
      </Card>
    );
  }
}
