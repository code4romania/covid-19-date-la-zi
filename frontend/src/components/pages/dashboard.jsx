import React from 'react';
import { ApiURL } from '../../config/globals';
import { PageHeader } from '../layout/page-header/page-header';
import {
  PROP_SHOW_CONFIRMED_CASES,
  PROP_SHOW_CURED_CASES,
  PROP_SHOW_DEATH_CASES,
  SummaryRow
} from '../layout/rows/summary-row';
import { EMBED_PATH_GENDER, GenderCard } from '../cards/gender/gender-card';
import {
  CasesPerDayCard,
  EMBED_PATH_CASES_PER_DAY
} from '../cards/cases-per-day-card/cases-per-day-card';
import {
  AverageAgeCard,
  EMBED_PATH_AVERAGE_AGE
} from '../cards/avg-age/avg-age-card';
import { AgeCard, EMBED_PATH_AGE } from '../cards/age/age';
import { PerDayTable } from '../cards/perday-table/perday-table';
import {
  CountiesCard,
  EMBED_COUNTIES_TABLE
} from '../cards/counties/counties-card';
import download from 'downloadjs';

import { SocialsShare } from '@code4ro/taskforce-fe-components';

import './dashboard.css';
import { withToastProvider } from '../layout/toast/withToastProvider';
import { InstrumentsWrapper } from '../layout/instruments/instruments';

class DashboardNoContext extends React.PureComponent {
  constructor(props) {
    super(props);

    const defaultState = {
      isLoaded: false,
      error: null
    };

    this.state = {
      error: defaultState.error,
      isLoaded: defaultState.isLoaded,
      summary: defaultState,
      daily: defaultState, // object
      gender: defaultState, // object
      age: defaultState, // object
      averageAge: defaultState, // object
      lastUpdate: defaultState, // object
      dailyTable: defaultState, // object
      countiesTable: defaultState
    };
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
      countiesTable: defaultState
    });
  }

  componentDidMount() {
    this.resetState({
      isLoaded: false,
      error: null
    });

    fetch(ApiURL.all)
      .then(res => res.json())
      .then(result => {
        if (result.error != null) {
          this.setState({ error: result.error, isLoaded: true });
        } else {
          this.parseAPIResponse(result);
        }
      })
      .catch(error => {
        this.resetState({ error: error, isLoaded: true });
      });
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
      dailyTable: this.parseDailyTable(result),
      countiesTable: this.parseCountiesTable(result)
    });
  }

  parseCountiesTable(result) {
    const counties = result.counties.data;
    const countiesList = Object.entries(counties)
      .map(([key, value]) => ({
        name: key,
        value: value
      }))
      .sort((a, b) =>
        // reversed by count
        a.value > b.value ? -1 : 1
      );

    const max = countiesList[0].value;
    const topCounties = countiesList.slice(0, 5);
    return {
      error: null,
      isLoaded: true,
      counties: countiesList,
      max,
      topCounties
    };
  }

  parseSummary(result) {
    const group = result.quickStats;
    const summary = group.totals;
    const history = group.history;
    const deathCasesHistory = history.map(entry => {
      return entry.deaths || 0;
    });
    const totalCasesHistory = history.map(entry => {
      return entry.confirmed || 0;
    });
    const curedCasesHistory = history.map(entry => {
      return entry.cured || 0;
    });
    const confirmed = summary.confirmed || 0;
    const cured = summary.cured || 0;
    const deaths = summary.deaths || 0;
    return {
      error: null,
      isLoaded: true,
      totalCases: confirmed,
      totalCasesHistory: totalCasesHistory,
      curedCases: cured,
      curedCasesHistory: curedCasesHistory,
      deathCases: deaths,
      deathCasesHistory: deathCasesHistory
    };
  }

  parseDailyStats(result) {
    const group = result.dailyStats;
    let history = group.history;

    const dates = history.map(entry => {
      return entry.datePublished;
    });
    const startDate = dates[0];
    const endDate = dates[dates.length - 1];
    const startDateStr = this.formattedShortDateString(
      this.dateFromTimestamp(startDate)
    );
    const endDateStr = this.formattedShortDateString(
      this.dateFromTimestamp(endDate)
    );

    const confirmedCasesHistory = history.flatMap(entry => {
      return entry.complete === false ? [] : Math.max(entry.infected, 0);
    });
    const curedCasesHistory = history.flatMap(entry => {
      return entry.complete === false ? [] : Math.max(entry.cured, 0);
    });
    const deathCasesHistory = history.flatMap(entry => {
      return entry.complete === false ? [] : Math.max(entry.deaths, 0);
    });
    const dateStrings = history.flatMap(entry => {
      return entry.complete === false
        ? []
        : this.formattedShortDateString(
          this.dateFromTimestamp(entry.datePublished)
        );
    });

    return {
      isLoaded: true,
      startDate: startDateStr,
      endDate: endDateStr,
      dates: dateStrings,
      confirmedCasesHistory: confirmedCasesHistory,
      curedCasesHistory: curedCasesHistory,
      deathCasesHistory: deathCasesHistory
    };
  }

  parseDailyTable(result) {
    if (!result['dailyStats']) {
      return {
        isLoaded: true,
        error: 'Nu am putut prelua datele'
      };
    }

    const dailyStats = result.dailyStats;
    const lastUpdatedOnString = dailyStats.last_updated_on_string;
    let dailyTable = [];

    if (dailyStats['history']) {
      dailyTable.push(...dailyStats['history']);
    }

    const filterIncompleteRows = row =>
      row.hasOwnProperty('complete') && row.complete === false ? false : true;

    dailyTable = dailyTable
      .filter(filterIncompleteRows)
      .sort((a, b) => b.datePublished - a.datePublished);

    return {
      isLoaded: true,
      error: null,
      data: dailyTable,
      lastUpdatedOnString
    };
  }

  parseGenderStats(result) {
    const stats = result.genderStats;
    const total = stats.totalPercentage || 0;
    const men = stats.percentageOfMen || 0;
    const women = stats.percentageOfWomen || 0;
    const children = stats.percentageOfChildren || 0;
    const lastUpdatedOnString = stats.last_updated_on_string;
    const unknown = total - stats.men - stats.women;
    const knownPercentage =
      total > 0 ? 100 - Math.round((100 * unknown) / total) : 100;

    return {
      isLoaded: true,
      men,
      women,
      children,
      date: stats.dateString,
      unknown: unknown > 0 ? unknown : 0,
      knownPercentage,
      lastUpdatedOnString
    };
  }

  parseAgeStats(result) {
    const group = result.ageHistogram;
    const stats = group.histogram;
    const total = group.total || 0;
    const lastUpdatedOnString = group.last_updated_on_string;
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
      knownPercentage,
      lastUpdatedOnString
    };
  }

  parseAverageAge(result) {
    const stats = result.dailyStats;
    const lastUpdatedOnString = stats.last_updated_on_string;
    const averageAge = stats.currentDay.averageAge;
    return {
      isLoaded: true,
      averageAge,
      lastUpdatedOnString
    };
  }

  parseLastUpdate(result) {
    const stats = result.quickStats;
    const lastUpdateOnString = stats.last_updated_on_string;
    return {
      isLoaded: true,
      lastUpdateOnString
    };
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
    return !!window.location.host
      ? window.location.protocol + '//' + window.location.host
      : 'https://datelazi.ro';
  }

  handleDownloadAllData = () => {
    fetch(ApiURL.allData)
      .then(res => res.json())
      .then(result => {
        if (result.error != null) {
          this.setState({ error: result.error, isLoaded: true });
        } else {
          const filename = this.getNormalizedFileName(
            result.lasUpdatedOnString
          );
          download(
            JSON.stringify(result),
            `date_${filename}.json`,
            'application/json'
          );
        }
      })
      .catch(error => {
        this.resetState({ error: error, isLoaded: true });
      });
  };

  getNormalizedFileName(filename) {
    return filename.replace(/\s+/g, '_').toLowerCase();
  }

  render() {
    const lastUpdate = !!this.state.lastUpdate
      ? this.state.lastUpdate.lastUpdateOnString
      : '-';
    const link = this.shareableLink();

    const keyToCard = new Map([
      [
        EMBED_PATH_CASES_PER_DAY,
        <CasesPerDayCard
          key={EMBED_PATH_CASES_PER_DAY}
          state={this.state.daily}
        />
      ],
      [
        EMBED_PATH_AGE,
        <AgeCard
          key={EMBED_PATH_AGE}
          title="După vârstă"
          state={this.state.age}
        />
      ],
      [
        EMBED_PATH_AVERAGE_AGE,
        <AverageAgeCard
          key={EMBED_PATH_AVERAGE_AGE}
          state={this.state.averageAge}
        />
      ],
      [
        EMBED_PATH_GENDER,
        <GenderCard
          key={EMBED_PATH_GENDER}
          to="/"
          title="După gen"
          state={this.state.gender}
        />
      ],
      [
        PROP_SHOW_CONFIRMED_CASES,
        <SummaryRow
          key={PROP_SHOW_CONFIRMED_CASES}
          visibleCards={[PROP_SHOW_CONFIRMED_CASES]}
          state={this.state.summary}
        />
      ],
      [
        PROP_SHOW_CURED_CASES,
        <SummaryRow
          key={PROP_SHOW_CURED_CASES}
          visibleCards={[PROP_SHOW_CURED_CASES]}
          state={this.state.summary}
        />
      ],
      [
        PROP_SHOW_DEATH_CASES,
        <SummaryRow
          key={PROP_SHOW_DEATH_CASES}
          visibleCards={[PROP_SHOW_DEATH_CASES]}
          state={this.state.summary}
        />
      ],
      [
        EMBED_COUNTIES_TABLE,
        <CountiesCard
          key={EMBED_COUNTIES_TABLE}
          state={this.state.countiesTable}
        />
      ]
    ]);

    let particularChartComponent;
    if (this.props.match) {
      const { particularChart } = this.props.match.params;
      particularChartComponent = keyToCard.get(particularChart);
    }

    return (
      particularChartComponent || (
        <div className="container">
          <section className="cards-row">
            <PageHeader title="Date Oficiale" />
            <div className="content">
              <p>
                Accesul la date din surse oficiale ce descriu evoluția cazurilor
                de COVID-19 în România este esențial în adoptarea măsurilor de
                sănătate publică împotriva pandemiei. Astfel, venim în sprijinul
                publicului și al mass-media din România prin accesibilizarea
                datelor punându-le într-o formă grafică ușor de parcurs, urmând
                modelul portalului de informare din{' '}
                <a
                  href="https://co.vid19.sg/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Singapore
                </a>
                .
              </p>
              <p>
                Infografiile se actualizează periodic și sunt centralizate în
                graficele de mai jos.
              </p>
              <p>
                Acest proiect este realizat pro-bono în parteneriat cu Guvernul
                României prin Autoritatea pentru Digitalizarea României.
                Funcționarea acestei platforme depinde exclusiv de conținutul
                datelor și informațiilor care vor fi furnizate de către Guvernul
                României.
              </p>

              <SocialsShare currentPage={link} />
            </div>
            <div className="level">
              {lastUpdate && (
                <p className="level-left">Date actualizate în {lastUpdate}.</p>
              )}
              <button
                className="button is-primary is-light levelRight"
                onClick={this.handleDownloadAllData}
              >
                Descarcă datele
              </button>
            </div>
          </section>

          <SummaryRow state={this.state.summary} />

          <section className="cards-row second-row">
            <div className="columns">
              <div className="column is-three-quarters">
                <CasesPerDayCard state={this.state.daily} />
              </div>
              <div className="column is-one-quarter">
                <GenderCard to="/" title="După gen" state={this.state.gender} />
              </div>
            </div>
          </section>

          <section className="cards-row third-row">
            <div className="columns">
              <div className="column is-two-quarters">
                <CountiesCard state={this.state.countiesTable} />
              </div>
              <div className="column is-one-quarter">
                <AverageAgeCard state={this.state.averageAge} />
              </div>
            </div>
          </section>

          <section className="cards-row">
            <div className="columns">
              <div className="column">
                <PerDayTable state={this.state.dailyTable} />
              </div>
            </div>
          </section>

          <section className="cards-row">
            <div className="columns">
              <div className="column">
                <AgeCard title="După vârstă" state={this.state.age} />
              </div>
            </div>
          </section>

          <aside>
            <InstrumentsWrapper />
          </aside>
        </div>
      )
    );
  }
}

export const Dashboard = withToastProvider(DashboardNoContext);
