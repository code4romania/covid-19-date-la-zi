import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card } from '../../layout/card';
import { Constants, ApiURL } from '../../../config/globals';

export const EMBED_PATH_GENDER_AND_AGE = 'gen-si-varsta';
export class GenderAndAgeCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      total: 0
    }
  }

  componentDidMount() {
    fetch(ApiURL.genderAgeStats)
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
        this.setState({ error: error, isLoaded: true });
      });
  }

  parseAPIResponse(result) {
    const stats = result.histogram;
    const total = result.total || 0;
    const allValues = Object.entries(stats).map((k, index) => {
      return k[1].men + k[1].women;
    });
    const totalKnown = allValues.reduce((a, b) => a + b, 0);
    const knownPercentage =
      total > 0 ? 100 - Math.round((totalKnown / total) * 100) : 100;

    const data = Object.keys(stats).map(key => {
      return {
        value: stats[key],
        name: key,
        percentage: Math.round((100 * stats[key]) / total)
      };
    });

    this.setState({
      isLoaded: true,
      data,
      total,
      knownPercentage
    });
  }

  getChartOptions = () => {
    // this colors will be changed in the future. Waiting feedback from Olivia.
    let colors = [
      Constants.womenColor,
      Constants.menColor,
      Constants.orange,
      Constants.magenta,
      Constants.green,
      Constants.grey,
      Constants.lightblue,
      Constants.curedColor
    ]

    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const isMobile = viewportWidth < 560;

    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        orient: isMobile ? 'horizontal' : 'vertical',
        icon: 'circle',
        right: isMobile ? 'auto' : 0,
        bottom: isMobile ? 0 : 'auto',
        top: isMobile ? 'auto' : 40,
        formatter: (name) => {
          const filterItem = this.state.data.filter(item => item.name === name);
          return filterItem.length === 1 ?  `${name} ani: ${filterItem[0].value} (${filterItem[0].percentage}%)` : '';
        },
        tooltip: {
          show: true,
          trigger: 'item'
        },
      },
      animation: true,
      series: [
        {
          id: 'gender-age-chart-series',
          name: this.props.title,
          type: 'pie',
          radius: isMobile ? ['30%', '55%'] : ['40%', '70%'],
          avoidLabelOverlap: false,
          right: isMobile ? 'auto' : 40,
          top: isMobile ? -140 : 'auto',
          label: {
            normal: {
              show: false
            },
            emphasis: { show: false }
          },
          data: this.state.data,
          color: colors
        }
      ]
    }
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
      <Card
        isLoaded={isLoaded} error={error}
        title={`${title}${knownPercentage}`}
        embedPath={EMBED_PATH_GENDER_AND_AGE}
      >
        <div className="pie-chart">
          <ReactEcharts
            id="gender-age-chart"
            option={this.getChartOptions()}
          />
        </div>
      </Card>
    );
  }
}
