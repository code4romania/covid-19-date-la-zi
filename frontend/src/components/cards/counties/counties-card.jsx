import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card } from '../../layout/card';
import { Constants, ApiURL } from '../../../config/globals';
import './counties-card.css';

export class CountiesCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      date: '',
      total: 0,
      counties: [], // array of maps {name, value}
      max: 0,
      topCounties: []
    };
  }

  componentDidMount() {
    fetch(ApiURL.countyStats)
      .then(res => res.json())
      .then(result => {
        if (result.error != null) {
          this.setState({ error: result.error, isLoaded: true });
          // TODO: handle error
        } else {
          this.parseAPIResponse(result);
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: error, isLoaded: true });
      });
  }

  parseAPIResponse(result) {
    const counties = result.counties.sort((a, b) => {
      // reversed by count
      if (a.count > b.count) {
        return -1;
      } else if (a.count < b.count) {
        return 1;
      } else {
        return 0;
      }
    });
    const date = result.dateString;

    const sorted = counties.map(entry => {
      return { name: entry.name, value: entry.count };
    });
    const max = sorted[0].value;
    const topCounties = sorted.slice(0, 5);

    this.setState({
      isLoaded: true,
      date: date,
      counties: sorted,
      max: max,
      topCounties: topCounties
    });
  }

  getChartOptions() {
    return {
      tooltip: {
        trigger: 'item'
      },
      visualMap: {
        show: false,
        min: 0,
        max: this.state.max,
        left: 'left',
        top: 'bottom',
        text: ['Ridicat', 'Scazut'],
        calculable: true,
        inRange: {
          color: [Constants.countyLowestColor, Constants.countyHighestColor]
        }
      },
      series: [
        {
          name: 'Cazuri',
          type: 'map',
          mapType: 'RO',
          itemStyle: {
            areaColor: Constants.curedColor
          },
          label: {
            normal: {
              show: false
            }
          },
          data: this.state.counties
        }
      ]
    };
  }
  render() {
    const { isLoaded, error } = this.state;

    const topLines = this.state.topCounties.map(county => {
      return (
        <tr key={county.name}>
          <td>{county.name}</td>
          <td className="has-text-right">{county.value}</td>
        </tr>
      );
    });

    return (
      <Card
        error={error}
        isLoaded={isLoaded}
        title="Cazuri confirmate pe judete"
      >
        <ReactEcharts
          option={this.getChartOptions()}
          style={{ height: '160px', width: '100%', top: '-5%' }}
          className="react_for_echarts"
        />
        <table className="county-list">{topLines}</table>
      </Card>
    );
  }
}
