import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card } from '../../layout/card';
import { Constants, ApiURL } from '../../../config/globals';
import { withTranslation } from 'react-i18next';
import './cases-per-day-card.css';

class CasesPerDayCardClass extends React.PureComponent {

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
    }
  }

  componentDidMount() {
    fetch(ApiURL.dailyStats)
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
    const history = result.history
    const dates = history.map((entry) => { return entry.date })
    const startDate = dates[0]
    const endDate = dates[dates.length-1]
    const startDateStr = this.formattedShortDateString(this.dateFromTimestamp(startDate))
    const endDateStr = this.formattedShortDateString(this.dateFromTimestamp(endDate))

    const symptomaticCasesHistory = history.map((entry) => { return Math.max(entry.monitored, 0) })
    const confirmedCasesHistory = history.map((entry) => { return Math.max(entry.confirmed, 0) })
    const curedCasesHistory = history.map((entry) => { return Math.max(entry.cured, 0) })
    const dateStrings = history.map((entry) => {
      return this.formattedShortDateString(this.dateFromTimestamp(entry.date)) })

    this.setState({
      isLoaded: true,
      startDate: startDateStr,
      endDate: endDateStr,
      dates: dateStrings,
      symptomaticCasesHistory: symptomaticCasesHistory,
      confirmedCasesHistory: confirmedCasesHistory,
      curedCasesHistory: curedCasesHistory
    })
  }

  dateFromTimestamp(timestamp) {
    return new Date(timestamp * 1000)
  }

  formattedShortDateString(date) {
    const {t} = this.props;
    const months = t('months', { returnObjects: true });
    return date.getDate() + ' ' + months[date.getMonth()];
  }

  getChartOptions() {
    const {t} = this.props;
    const labels = [
      t('confirmed'), 
      t('cured')
    ];
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
        right: 0,
        icon: 'circle',
        top: '0%'
      },
      grid: {
        left: '1%',
        right: 0,
        bottom: 0,
        top: '20%',
        containLabel: true
      },
      series: [
        {
          data: this.state.confirmedCasesHistory,
          name: labels[0],
          stack: 'one',
          type: 'bar',
          color: Constants.confirmedColor
        },
        {
          data: this.state.curedCasesHistory,
          name: labels[1],
          stack: 'one',
          type: 'bar',
          color: Constants.curedColor
        }
      ]
    };
  }

  render() {
    const {t} = this.props;
    if (this.state.error) {
      return (
        <Card>
          <div className="is-error is-block">{t('error.default')}</div>
        </Card>
      )
    } else {
      return (
        <Card>
          <div className="title-container is-overlay">
            <h3 className="summary-title is-uppercase">{t('case_count')}</h3>
            <h4 className="summary-subtitle">{t('date_range', {'from': this.state.startDate, 'to': this.state.endDate})}</h4>
          </div>
          <ReactEcharts
            style={{
              height: '400px',
              width: '100%',
            }}
            option={this.getChartOptions()}
            theme="light"
          />
        </Card>
      );
    }
  }
}

export const CasesPerDayCard = withTranslation()(CasesPerDayCardClass);
