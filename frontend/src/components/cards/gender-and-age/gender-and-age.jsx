import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card } from '../../layout/card';
import { Constants, ApiURL } from '../../../config/globals'

export class GenderAndAgeCard extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      categories: [], // array of strings, eg. '11-20', '21-30'
      womenEntries: [], // map of [String: Int] (key is category above)
      menEntries: [], // map of [String: Int] (key is category above)
    }
  }

  componentDidMount() {
    fetch(ApiURL.genderAgeStats)
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
    const stats = result.histogram;
    const total = result.total || 0;
    const allValues = Object.entries(stats).map((k,index) => { return k[1].men + k[1].women })
    const totalKnown = allValues.reduce((a,b) => a + b, 0)
    const knownPercentage = total > 0 ? 100-Math.round((totalKnown/total)*100) : 100;
    const categories = Object.entries(stats).map((k,v) => { return k[0] })
    const sortedCategories = categories.sort((a,b) => {
      const firstStartAge = a.split('-',1)[0]
      const secondStartAge = b.split('-',1)[0]
      if (firstStartAge !== undefined
        && secondStartAge !== undefined) {
        const n1 = parseInt(firstStartAge)
        const n2 = parseInt(secondStartAge)
        if (n1 < n2) { return -1 }
        else if (n1 > n2) { return 1 }
        else return 0
      }
      return false
    })
    let menEntries = sortedCategories.map((k) => { return stats[k].men })
    let womenEntries = sortedCategories.map((k) => { return -1 * stats[k].women })

    this.setState({
      isLoaded: true,
      total: total,
      knownPercentage: knownPercentage,
      categories: sortedCategories,
      menEntries: menEntries,
      womenEntries: womenEntries
    })
  }


  getChartOptions() {
    return {
      tooltip: {
        trigger: 'axis',
        formatter: function(entries) {
          let lines = entries.map((entry) => entry.seriesName + ': ' + Math.abs(entry.value));
          return lines.join('<br/>')
        }
      },
      legend: {
        data: [Constants.womenText, Constants.menText],
        bottom: 0,
        icon: 'circle'
      },
      grid: {
        left: '30px',
        right: '4%',
        bottom: '16%',
        top: '0%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'value',
          axisLabel: {
            formatter: function (value,index) {
              return ''+Math.abs(value)
            }
          }
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
          data: this.state.categories
        }
      ],
      series: [
        {
          name: Constants.menText,
          type: 'bar',
          stack: 'infections',
          color: Constants.menColor,
          data: this.state.menEntries
        },
        {
          name: Constants.womenText,
          type: 'bar',
          stack: 'infections',
          color: Constants.womenColor,
          data: this.state.womenEntries
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
      return (
        <Card>
          <div className="is-error is-block">Nu am putut încărca datele</div>
        </Card>
      )
    } else {
      return (
        <Card title={title + knownPercentage}>
          <div className="bar-chart">
            <ReactEcharts
              id="gender-age-chart"
              option={this.getChartOptions()}
            />
          </div>
        </Card>
      );
    }
  }
}
