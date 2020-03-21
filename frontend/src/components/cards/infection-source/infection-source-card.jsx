import React from 'react';
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
    const total = stats.total || 0;
    const unknown = total - stats.extern - stats.intern
    const knownPercentage = total > 0 ? 100-Math.round(100*unknown / total) : 100;

    this.setState({
      isLoaded: true,
      date: stats.dateString,
      external: stats.extern,
      internal: stats.intern,
      unknown: unknown,
      knownPercentage: knownPercentage
    })
  }

  getChartOptions() {
    let data = [
      {value: this.state.internal, name: 'Transmise local'},
      {value: this.state.external, name: 'Importate'}
    ];

    let colors = [Constants.womenColor, Constants.menColor];

    if (Constants.specifyUnknownData) {
      data.push({value: this.state.unknown, name: 'Necunoscute'});
      colors.push(Constants.unknownColor);
    }

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
          data: data,
          color: colors
        }
      ]
    };
  }

  render() {
    const { title } = this.props;

    let knownPercentage = ''
    if (Constants.specifyUnknownData) {
      knownPercentage = this.state.knownPercentage !== undefined
        ? ' (' + this.state.knownPercentage + '% cunoscuți)' : '';
    }

    if (this.state.error) {
      // TODO: move this into a component
      return (
        <Card>
          <div className="is-error is-block">Nu am putut încărca datele</div>
        </Card>
      )
    } else {
      return (
        <Card title={title + knownPercentage}>
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
