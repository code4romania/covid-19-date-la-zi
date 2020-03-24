import React from "react";
import ReactEcharts from "echarts-for-react";
import { Card } from "../../layout/card";
import { Constants, ApiURL } from "../../../config/globals";

const sortCategories = categories => {
  return categories.sort((a,b) => {
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
}

export class GenderAndAgeCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      totalKnown: 0
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
    const allValues = Object.entries(stats).map(k => { return k[1].men + k[1].women })
    const totalKnown = allValues.reduce((a,b) => a + b, 0)
    const categories = Object.entries(stats).map((k,v) => { return k[0] })
    const sortedCategories = sortCategories(categories);

    const data = sortedCategories.map(key => {
      const { women, men } = stats[key];
      const totalByAge = women + men;
      return {
        value: totalByAge,
        name: key,
        percentage: Math.round((100 * totalByAge) / totalKnown)
      }
    })

    this.setState({
      isLoaded: true,
      data,
      totalKnown
    })
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
        top: isMobile ? 'auto' : 60,
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
    };
  }



  render() {
    const { title } = this.props;
    const { isLoaded, error } = this.state;

    if (this.state.error) {
      return (
        <Card>
          <div className="is-error is-block">Nu am putut încărca datele</div>
        </Card>
      )
    } else {
      return (
        <Card title={`${title}: ${this.state.totalKnown} cazuri`}>
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
}
