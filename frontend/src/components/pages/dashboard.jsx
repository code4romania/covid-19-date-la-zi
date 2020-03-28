import React from 'react';
import { ApiURL } from '../../config/globals';
import { PageHeader } from '../layout/page.header';
import {
  PROP_SHOW_CONFIRMED_CASES,
  PROP_SHOW_CURED_CASES,
  PROP_SHOW_DEATH_CASES,
  SummaryRow
} from '../layout/rows/summary.row';
import {EMBED_PATH_GENDER, GenderCard} from '../cards/gender/gender-card';
import {CasesPerDayCard, EMBED_PATH_CASES_PER_DAY} from '../cards/cases-per-day-card/cases-per-day-card';
import {AverageAgeCard, EMBED_PATH_AVERAGE_AGE} from '../cards/avg-age/avg-age-card';
import {AgeCard, EMBED_PATH_AGE} from '../cards/age/age';

import { Hero, Instruments, InstrumentsItem, SocialsShare } from '@code4ro/taskforce-fe-components';

import '@code4ro/taskforce-fe-components/dist/index.css';
import './dashboard.css';
import {withToastProvider} from '../layout/toast/withToastProvider';

class DashboardNoContext extends React.PureComponent {

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
      lastUpdate: defaultState, // object
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
      lastUpdate: this.parseLastUpdate(result)
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
        percentage: Math.round((100 * stats[key]) / total)
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

  render() {
    const lastUpdate = !!this.state.lastUpdate ? this.state.lastUpdate.lastUpdate : '-'
    const link = this.shareableLink()

    const keyToCard = new Map([
      [EMBED_PATH_CASES_PER_DAY, (
        <CasesPerDayCard key={EMBED_PATH_CASES_PER_DAY} state={this.state.daily} />
      )],
      [EMBED_PATH_AGE, (
        <AgeCard
          key={EMBED_PATH_AGE}
          title="După vârstă"
          state={this.state.age}
        />
      )],
      [EMBED_PATH_AVERAGE_AGE, (
        <AverageAgeCard
          key={EMBED_PATH_AVERAGE_AGE}
          state={this.state.averageAge}
        />
      )],
      [EMBED_PATH_GENDER, (
        <GenderCard key={EMBED_PATH_GENDER} to="/" title="După gen" state={this.state.gender} />
      )],
      [PROP_SHOW_CONFIRMED_CASES, (
        <SummaryRow key={PROP_SHOW_CONFIRMED_CASES} visibleCards={[PROP_SHOW_CONFIRMED_CASES]} />
      )],
      [PROP_SHOW_CURED_CASES, (
        <SummaryRow key={PROP_SHOW_CURED_CASES} visibleCards={[PROP_SHOW_CURED_CASES]} />
      )],
      [PROP_SHOW_DEATH_CASES, (
        <SummaryRow key={PROP_SHOW_DEATH_CASES} visibleCards={[PROP_SHOW_DEATH_CASES]} />
      )]
    ]);

    let particularChartComponent;
    if (this.props.match) {
      const {particularChart} = this.props.match.params;
      particularChartComponent = keyToCard.get(particularChart);
    }

    return (
      (particularChartComponent ||
        <section className="section">
          <div className="container cards-row content">
            <PageHeader
              title="Date Oficiale"
            />
            <p>
            Accesul la date din surse oficiale ce descriu evoluția cazurilor de COVID-19 în România
            este esențial în adoptarea măsurilor de sănătate publică împotriva pandemiei. Astfel,
            venim în sprijinul publicului și al mass-media din România prin accesibilizarea datelor
            punându-le într-o formă grafică ușor de parcurs, urmând modelul portalului de informare
            din <a href="https://co.vid19.sg/" target="_blank" rel="noopener noreferrer">Singapore</a>.
            </p>
            <p>
            Infografiile se actualizează periodic și sunt centralizate în graficele de mai jos.
            </p>
            <p>
            Acest proiect este realizat pro-bono în parteneriat cu Guvernul României prin Autoritatea
            pentru Digitalizarea României. Funcționarea acestei platforme depinde exclusiv de
            conținutul datelor și informațiilor care vor fi furnizate de către Guvernul României.
            </p>

            <SocialsShare currentPage={link} />

            {lastUpdate &&
              <p>Date actualizate în {lastUpdate}.</p>}

          </div>

          <SummaryRow state={this.state.summary} />

          <div className="container cards-row second-row">
            <div className="columns">
              <div className="column is-three-quarters">
                <CasesPerDayCard state={this.state.daily} />
              </div>
              <div className="column is-one-quarter">
                <GenderCard to="/" title="După gen" state={this.state.gender} />
              </div>
            </div>
          </div>

          <div className="container cards-row third-row">
            <div className="columns">
              <div className="column is-two-quarters">
                <AgeCard
                  title="După vârstă"
                  state={this.state.age}
                />
              </div>
              <div className="column is-one-quarter">
                <AverageAgeCard
                  state={this.state.averageAge}
                />
              </div>
            </div>
          </div>

          <div className="container">
            <div className="border-bottom">
              <Hero title="Instrumente utile" useFallbackIcon />
            </div>

            <Instruments layout="grid">
              <section>
                <InstrumentsItem
                  color="green"
                  title="Instalează-ţi extensia de Firefox"
                  ctaLink="https://addons.mozilla.org/en-US/firefox/addon/covid-19-%C8%99tiri-oficiale/"
                  ctaText="Instalează add-on"
                />
                <InstrumentsItem
                  color="green"
                  title="Instalează-ti extensia de Chrome"
                  ctaLink={'https://chrome.google.com/webstore/detail/' +
                  'covid-19-stiri-oficiale/pdcpkplohipjhdfdchpmgekifmcdbnha'}
                  ctaText="Instalează add-on"
                />
              </section>
              <section>
                <InstrumentsItem
                  color="green"
                  title="Ştiri oficiale și informații la zi"
                  content=""
                  ctaText="Cele mai noi informaţii oficiale"
                  ctaLink="https://stirioficiale.ro/informatii"
                />
              </section>
              <section>
                <InstrumentsItem
                  color="yellow"
                  title="Află ce ai de făcut în orice situație"
                  content=""
                  ctaText="Ce trebuie să fac"
                  ctaLink="https://cemafac.ro"
                />
              </section>
            </Instruments>
          </div>
        </section>)
    );
  }
}

export const Dashboard = withToastProvider(DashboardNoContext);
