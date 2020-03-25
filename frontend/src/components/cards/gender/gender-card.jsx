import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card } from '../../layout/card';
import { Constants, ApiURL } from '../../../config/globals';
import './gender-card.css';

export const EMBED_PATH_GENDER = 'gen';
export class GenderCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      date: '',
      women: 0,
      men: 0,
      unknown: 0,
      children: 0
    }
  }

  componentDidMount() {
    fetch(ApiURL.genderStats)
      .then(res => res.json())
      .then(result => {
        if (result.error != null) {
          this.setState({ error: result.error, isLoaded: true });
        } else {
          this.parseAPIResponse(result);
        }
      })
      .catch(error => {
        this.setState({ error: error, isLoaded: true });
      });
  }

  parseAPIResponse(result) {
    const stats = result
    const total = stats.total || 0;
    const children = stats.children || 0;
    const unknown = total - stats.men - stats.women
    const knownPercentage = total > 0 ? 100-Math.round(100*unknown / total) : 100;

    this.setState({
      isLoaded: true,
      men: stats.men,
      women: stats.women,
      children,
      date: stats.dateString,
      unknown: unknown > 0 ? unknown : 0,
      knownPercentage: knownPercentage
    });
  }

  getChartOptions() {
    let data = [
      { value: this.state.women, name: Constants.womenText },
      { value: this.state.men, name: Constants.menText }
    ];

    let colors = [Constants.womenColor, Constants.menColor];

    if(this.state.children > 0){
      data.push({value: this.state.children, name: Constants.childrenText});
      colors.push(Constants.childrenColor);
    }

    if (Constants.specifyUnknownData) {
      data.push({
        value: this.state.unknown,
        name: Constants.unknownGenderText
      });
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
    const { title } = this.props;
    const { isLoaded, error } = this.state;

    let knownPercentage = '';
    if (Constants.specifyUnknownData) {
      knownPercentage =
        this.state.knownPercentage !== undefined
          ? ' (' + this.state.knownPercentage + '% cunoscuți)'
          : '';
    }

    return (
      <Card isLoaded={isLoaded} error={error} title={title + knownPercentage} embedPath={EMBED_PATH_GENDER}>
        <div className="pie-chart">
          <ReactEcharts
            id="gender-chart"
            style={{ height: '400px' }}
            option={this.getChartOptions()}
          />
        </div>
      </Card>
    );
  }
}
