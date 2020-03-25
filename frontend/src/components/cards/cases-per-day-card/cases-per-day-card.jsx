import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card } from '../../layout/card';
import { Constants, ApiURL } from '../../../config/globals';
import './cases-per-day-card.css';

export const EMBED_PATH_CASES_PER_DAY = 'cazuri-pe-zi';
export class CasesPerDayCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      startDate: '',
      endDate: '',
      dates: [], // array of strings, formatted short dates
      symptomaticCasesHistory: [], // array of ints
      confirmedCasesHistory: [], // array of ints
      curedCasesHistory: [], // array of ints
      deathCasesHistory: [],
    }
  }

  componentDidMount() {
    fetch(ApiURL.dailyStats)
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
    let history = result.history;
    const currentDay = result.currentDay;

    const dates = history.map((entry) => { return entry.datePublished });
    const startDate = dates[0];
    const endDate = dates[dates.length-1];
    const startDateStr = this.formattedShortDateString(this.dateFromTimestamp(startDate));
    const endDateStr = this.formattedShortDateString(this.dateFromTimestamp(endDate));

    const symptomaticCasesHistory = history.map((entry) => { return Math.max(entry.monitored, 0) });
    const confirmedCasesHistory = history.map((entry) => { return Math.max(entry.infected, 0) });
    const curedCasesHistory = history.map((entry) => { return Math.max(entry.cured, 0) });
    const deathCasesHistory = history.map((entry) => {return Math.max(entry.deaths, 0)});
    const dateStrings = history.map((entry) => entry.datePublishedString);

    this.setState({
      isLoaded: true,
      startDate: startDateStr,
      endDate: endDateStr,
      dates: dateStrings,
      symptomaticCasesHistory: symptomaticCasesHistory,
      confirmedCasesHistory: confirmedCasesHistory,
      curedCasesHistory: curedCasesHistory,
      deathCasesHistory: deathCasesHistory,
    })
  }

  dateFromTimestamp(timestamp) {
    return new Date(timestamp * 1000);
  }

  formattedShortDateString(date) {
    const months = [
      'Ian',
      'Feb',
      'Mar',
      'Apr',
      'Mai',
      'Iun',
      'Iul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    return date.getDate() + ' ' + months[date.getMonth()];
  }

  getSubtitle() {
    let firstDate = this.state.startDate;
    let lastDate = this.state.endDate;
    return `de la ${firstDate} la ${lastDate}`;
  }

  getChartOptions() {
    // const labels = ['Raportați', 'Confirmați', 'Vindecați'];
    const labels = ['Raportați', 'Confirmați', 'Vindecați', 'Decedaţi'];
    return {
      xAxis: {
        type: 'category',
        data: this.state.dates,
        axisLabel: {
          color: 'gray'
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: 'gray'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          axis: 'x'
        }
      },
      legend: {
        data: labels,
        right: '30px',
        icon: 'circle',
        top: '0%'
      },
      grid: {
        left: '1%',
        right: 0,
        bottom: 0,
        top: '20%',
        containLabel: true
        // =======
        //         icon: 'circle',
        //         bottom: 0
        // >>>>>>> develop
      },
      series: [
        // {
        //   data: this.state.symptomaticCasesHistory,
        //   name: labels[0],
        //   stack: 'one',
        //   type: 'bar',
        //   color: Constants.symptomaticColor
        // },
        {
          data: this.state.confirmedCasesHistory,
          name: labels[1],
          stack: 'one',
          type: 'bar',
          color: Constants.confirmedColor
        },
        {
          data: this.state.curedCasesHistory,
          name: labels[2],
          stack: 'one',
          type: 'bar',
          color: Constants.curedColor
        },
        {
          data: this.state.deathCasesHistory,
          name: labels[3],
          stack: 'one',
          type: 'bar',
          color: Constants.deathColor
        }
      ]
    };
  }

  render() {
    const { isLoaded, error } = this.state;

    return (
      <Card isLoaded={isLoaded} error={error} embedPath={EMBED_PATH_CASES_PER_DAY}>
        <div className="title-container is-overlay">
          <h3 className="summary-title is-uppercase">Număr de cazuri</h3>
          <h4 className="summary-subtitle">
            De la {this.state.startDate} la {this.state.endDate}
          </h4>
        </div>
        <ReactEcharts
          style={{
            height: '100%',
            width: '100%'
          }}
          option={this.getChartOptions()}
          theme="light"
        />
      </Card>
    );
  }
}
