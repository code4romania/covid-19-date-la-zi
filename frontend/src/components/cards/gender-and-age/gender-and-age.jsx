import React from 'react';
import { Link } from 'react-router-dom';
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
  }

  parseAPIResponse(result) {
    const stats = result.histogram
    const categories = Object.entries(stats).map((k,v) => { return k[0] })
    const sortedCategories = categories.sort((a,b) => { 
      const firstStartAge = a.split("-",1)[0]
      const secondStartAge = b.split("-",1)[0]
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
    var menEntries = sortedCategories.map((k) => { return stats[k].men })
    var womenEntries = sortedCategories.map((k) => { return -1 * stats[k].women })

    this.setState({
      isLoaded: true,
      categories: sortedCategories,
      menEntries: menEntries,
      womenEntries: womenEntries
    })
    console.log(this.state);
  }


  getChartOptions() {
    return {
      tooltip: {
        trigger: 'axis'
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
    const { title, data } = this.props;
    return (
      <Card title={title}>
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
