import React from 'react';
import { ApiURL } from '../../config/globals';
import { SummaryCard } from '../cards/summary/summary-card';
import { CasesPerDayCard } from '../cards/cases-per-day-card/cases-per-day-card';
import { round } from 'prelude-ls';

import { DevelopedBy } from '@code4ro/taskforce-fe-components';

import '@code4ro/taskforce-fe-components/dist/index.css';
import './billboard.css';
import {withToastProvider} from '../layout/toast/withToastProvider';

export class BillboardNoContext extends React.PureComponent {

  constructor(props) {
    super(props);

    const defaultState = {
      isLoaded: false,
      error: null
    }

    this.state = {
      error: defaultState.error || null,
      isLoaded: defaultState.isLoaded || false,
      summary: defaultState,
      daily: defaultState, // object
      gender: defaultState, // object
      age: defaultState, // object
      averageAge: defaultState, // object
      lastUpdate: defaultState, // object
      dailyTable: defaultState, // object
    }
  }

  // resets all object states with this object
  resetState(defaultState) {
    this.setState({
      error: defaultState.error || null,
      isLoaded: defaultState.isLoaded || false,
      summary: defaultState,
      daily: defaultState, // object
      gender: defaultState, // object
      age: defaultState, // object
      averageAge: defaultState, // object
      lastUpdate: defaultState, // object,
      dailyTable: defaultState, // object
    })
  }

  componentDidMount() {
    this.resetState({
      isLoaded: false,
      error: null
    })

    fetch(ApiURL.all)
      .then(res => res.json())
      .then((result) => {
        if (result.error != null) {
          this.setState({error: result.error, isLoaded: true})
        } else {
          this.parseAPIResponse(result)
        }
      })
      .catch((error) => {
        this.resetState({error: error, isLoaded: true})
      })
  }

  parseAPIResponse(result) {
    this.setState({
      isLoaded: true,
      summary: this.parseSummary(result),
      daily: this.parseDailyStats(result),
      gender: this.parseGenderStats(result),
      age: this.parseAgeStats(result),
      averageAge: this.parseAverageAge(result),
      lastUpdate: this.parseLastUpdate(result),
      dailyTable: this.parseDailyTable(result)
    })
  }

  parseSummary(result) {
    const group = result.quickStats
    const summary = group.totals
    const history = group.history
    const deathCasesHistory = history.map((entry) => { return entry.deaths || 0 })
    const totalCasesHistory = history.map((entry) => { return entry.confirmed || 0 })
    const curedCasesHistory = history.map((entry) => { return entry.cured || 0 })
    const confirmed = summary.confirmed || 0
    const cured = summary.cured || 0
    const deaths = summary.deaths || 0
    return {
      error: null,
      isLoaded: true,
      totalCases: confirmed,
      totalCasesHistory: totalCasesHistory,
      curedCases: cured,
      curedCasesHistory: curedCasesHistory,
      deathCases: deaths,
      deathCasesHistory: deathCasesHistory,
    }
  }

  parseDailyStats(result) {
    const group = result.dailyStats
    let history = group.history;

    const dates = history.map((entry) => { return entry.datePublished });
    const startDate = dates[0];
    const endDate = dates[dates.length-1];
    const startDateStr = this.formattedShortDateString(this.dateFromTimestamp(startDate));
    const endDateStr = this.formattedShortDateString(this.dateFromTimestamp(endDate));

    const confirmedCasesHistory = history.flatMap((entry) => {
      return entry.complete === false ? [] : Math.max(entry.infected, 0)
    });
    const curedCasesHistory = history.flatMap((entry) => {
      return entry.complete === false ? [] : Math.max(entry.cured, 0)
    });
    const deathCasesHistory = history.flatMap((entry) => {
      return entry.complete === false ? [] : Math.max(entry.deaths, 0)
    });
    const dateStrings = history.flatMap((entry) => {
      return entry.complete === false ? [] : this.formattedShortDateString(this.dateFromTimestamp(entry.datePublished))
    });

    return {
      isLoaded: true,
      startDate: startDateStr,
      endDate: endDateStr,
      dates: dateStrings,
      confirmedCasesHistory: confirmedCasesHistory,
      curedCasesHistory: curedCasesHistory,
      deathCasesHistory: deathCasesHistory,
    }
  }

  parseDailyTable(result) {
    if (!result['dailyStats']) {
      return {
        isLoaded: true,
        error: 'Nu am putut prelua datele'
      };
    }

    let dailyStats = result.dailyStats;
    let dailyTable = [];

    if (dailyStats['currentDay']) {
      dailyTable.push(dailyStats['currentDay']);
    }

    if (dailyStats['history']) {
      dailyTable.push(...dailyStats['history']);
    }

    const filterIncompleteRows = (row) => row.hasOwnProperty('complete') && row.complete === false ? false : true;

    dailyTable = dailyTable.filter(filterIncompleteRows)
      .sort((a,b) => b.datePublished - a.datePublished);

    return {
      isLoaded: true,
      error: null,
      data: dailyTable
    }
  }

  parseGenderStats(result) {
    const stats = result.genderStats
    const total = stats.totalPercentage || 0;
    const men = stats.percentageOfMen || 0;
    const women = stats.percentageOfWomen || 0;
    const children = stats.percentageOfChildren || 0;
    const unknown = total - stats.men - stats.women
    const knownPercentage = total > 0 ? 100-Math.round(100*unknown / total) : 100;

    return {
      isLoaded: true,
      men,
      women,
      children,
      date: stats.dateString,
      unknown: unknown > 0 ? unknown : 0,
      knownPercentage: knownPercentage
    }
  }

  parseAgeStats(result) {
    const group = result.ageHistogram
    const stats = group.histogram;
    const total = group.total || 0;
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
        percentage: ((100 * stats[key]) / total).toFixed(2)
      };
    });

    return {
      isLoaded: true,
      data,
      total,
      knownPercentage
    }
  }

  parseAverageAge(result) {
    const stats = result.dailyStats
    const averageAge = stats.currentDay.averageAge;
    return {
      isLoaded: true,
      averageAge
    }
  }

  parseLastUpdate(result) {
    const stats = result.quickStats
    const lastUpdate = stats.last_updated_on_string
    return {
      isLoaded: true,
      lastUpdate
    }
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

  shareableLink() {
    return !!window.location.host ? window.location.protocol + '//' + window.location.host : 'https://datelazi.ro'
  }

  specialValueForCured(state) {
    const curedPercentage = state.totalCases > 0 ? round(100*(state.curedCases / state.totalCases)) : 0
    return {
      value: curedPercentage + '%',
      label: 'din total',
      isGood: true
    }
  };

  render() {
    const lastUpdate = !!this.state.lastUpdate ? this.state.lastUpdate.lastUpdate : '-'

    return (
      <section className="section">

        <div className="container cards-row content">
            <div className="columns">
                <div className="column">
                <h1>COVID-19</h1>

                {lastUpdate &&
                    <p>Situația în România în {lastUpdate}.</p>}
                    
                </div>
                <div className="column">
                    <DevelopedBy />

                </div>
            </div>

        </div>

        <div className="container cards-row big-screen">
          <div className="columns">
            <div className="column">
              <SummaryCard
                isLoaded={this.state.isLoaded}
                error={this.state.error}
                to="/"
                title="Cazuri confirmate"
                total={this.state.summary.totalCases}
                data={this.state.summary.totalCasesHistory}
              />
            </div>
            <div className="column">
              <SummaryCard
                isLoaded={this.state.isLoaded}
                error={this.state.error}
                to="/"
                title="Vindecați"
                total={this.state.summary.curedCases}
                special={this.specialValueForCured(this.state.summary)}
                data={this.state.summary.curedCasesHistory}
              />
            </div>
          </div>
        </div>


        <div className="container cards-row big-screen daily-chart">
          <div className="columns">
            <div className="column is-four-quarters">
              <CasesPerDayCard state={this.state.daily} title="Evoluția pe zile" />
            </div>
          </div>
        </div>

      </section>
    );
  }
}

export const Billboard = withToastProvider(BillboardNoContext);