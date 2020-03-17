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
      external: 0,
      internal: 0
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
      .catch((error) => {
        this.setState({error: error, isLoaded: true})
      })
  }

  parseAPIResponse(result) {
    const stats = result.totals

    this.setState({
      isLoaded: true,
      date: stats.dateString,
      external: stats.extern,
      internal: stats.intern
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
            {value: this.state.internal, name: 'Transmise local'},
            {value: this.state.external, name: 'Importate'}
          ],
          color: [Constants.womenColor, Constants.menColor]
        }
      ]
    };
  }

  render() {
    const { title } = this.props;
    if (this.state.error) {
      // TODO: move this into a component
      return <Card>
          <div className="is-error is-block">Nu am putut încărca datele</div>
        </Card>
    } else {
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
}
