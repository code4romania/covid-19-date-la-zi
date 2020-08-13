import React from 'react';
import { ApiURL } from '../../config/globals';
import { PageHeader } from '../layout/page-header/page-header';
import { mnemonics } from '../../config/mnemonics';
import {
  PROP_SHOW_CONFIRMED_CASES,
  PROP_SHOW_CURED_CASES,
  PROP_SHOW_DEATH_CASES,
  SummaryRow,
} from '../layout/rows/summary-row';
import { EMBED_PATH_GENDER, GenderCard } from '../cards/gender/gender-card';
import {
  CasesPerDayCard,
  EMBED_PATH_CASES_PER_DAY,
} from '../cards/cases-per-day-card/cases-per-day-card';
import {
  AverageAgeCard,
  EMBED_PATH_AVERAGE_AGE,
} from '../cards/avg-age/avg-age-card';
import { AgeCard, EMBED_PATH_AGE } from '../cards/age/age';
import {
  CountiesMap,
  EMBED_COUNTIES_MAP,
} from '../cards/counties-map/counties-map';
import {
  CountiesTable,
  EMBED_COUNTIES_TABLE,
} from '../cards/counties-table/counties-table';
import { formatDate, formatShortDate } from '../../utils/date';
import download from 'downloadjs';

import { SocialsShare } from '@code4ro/taskforce-fe-components';

import './dashboard.css';
import { withToastProvider } from '../layout/toast/withToastProvider';
import { InstrumentsWrapper } from '../layout/instruments/instruments';
import {
  AgeCategory,
  EMBED_PATH_AGE_CATEGORY,
} from '../cards/age-category/age-category';

class DashboardNoContext extends React.PureComponent {
  constructor(props) {
    super(props);

    const defaultState = {
      isLoaded: false,
      error: null,
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
      countiesTable: defaultState,
      ageCategory: defaultState,
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
      countiesTable: defaultState,
      ageCategory: defaultState,
    });
  }

  componentDidMount() {
    this.resetState({
      isLoaded: false,
      error: null,
    });

    fetch(ApiURL.allData)
      .then((res) => res.json())
      .then((result) => {
        if (result.error != null) {
          this.setState({ error: result.error, isLoaded: true });
        } else {
          this.parseAPIResponse(result);
        }
      })
      .catch((error) => {
        this.resetState({ error, isLoaded: true });
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
      countiesTable: this.parseCountiesTable(result),
      ageCategory: this.parseAgeCategory(result),
    });
  }

  parseAgeCategory(result) {
    const { historicalData, currentDayStats } = result;
    const {
      ageHistogram: { lastUpdatedOn, stale },
    } = result.charts;
    const ageCategories = {};
    const dateStrings = [];
    const newData = {
      [currentDayStats.parsedOnString]: currentDayStats,
      ...historicalData,
    };

    const dataEntries = Object.entries(newData)
      .filter(([key, value]) => stale && key <= lastUpdatedOn)
      .reverse();

    for (let i = 0; i < dataEntries.length - 1; i++) {
      const key = dataEntries[i + 1][0];
      const currentValue = dataEntries[i][1];
      const nextValue = dataEntries[i + 1][1];
      dateStrings.push(formatShortDate(key));

      Object.entries(currentValue.distributionByAge).forEach(
        ([ageGroup, currentCases]) => {
          const cases = nextValue.distributionByAge[ageGroup] - currentCases;
          if (Array.isArray(ageCategories[ageGroup])) {
            ageCategories[ageGroup].push(cases);
          } else {
            ageCategories[ageGroup] = [cases];
          }
        }
      );
    }

    return {
      isLoaded: true,
      lastUpdatedOn,
      ageCategories,
      dateStrings,
      stale,
    };
  }

  parseCountiesTable(result) {
    const { countyInfectionsNumbers } = result.currentDayStats;
    const {
      counties: { lastUpdatedOn, stale },
    } = result.charts;

    const counties = Object.entries(countyInfectionsNumbers)
      .filter(([key]) => key !== '-')
      .map(([key, entry]) => ({
        name: mnemonics[key][0],
        value: ((1000 * entry) / mnemonics[key][1]).toFixed(2),
        totalPopulation: mnemonics[key][1],
        numberInfected: entry,
        county: key,
      }))
      .sort((a, b) =>
        // reversed by count
        a.value > b.value ? -1 : 1
      );
    const isInProcess = countyInfectionsNumbers['-'];
    return {
      error: null,
      isLoaded: true,
      counties,
      isInProcess,
      lastUpdatedOn,
      stale,
    };
  }

  parseSummary(result) {
    const {
      numberInfected,
      numberCured,
      numberDeceased,
    } = result.currentDayStats;
    const {
      dailyStats: { lastUpdatedOn, stale },
    } = result.charts;
    const { historicalData } = result;
    const totalCasesHistory = [];
    const curedCasesHistory = [];
    const deathCasesHistory = [];

    Object.entries(historicalData)
      .reverse()
      .forEach(([, entry]) => {
        totalCasesHistory.push(entry.numberInfected || 0);
        curedCasesHistory.push(entry.numberCured || 0);
        deathCasesHistory.push(entry.numberDeceased || 0);
      });

    return {
      isLoaded: true,
      totalCases: numberInfected,
      totalCasesHistory,
      curedCases: numberCured,
      curedCasesHistory,
      deathCases: numberDeceased,
      deathCasesHistory,
      lastUpdatedOn,
      stale,
    };
  }

  parseDailyStats(result) {
    const {
      dailyStats: { lastUpdatedOn, stale },
    } = result.charts;
    const { historicalData, currentDayStats } = result;

    const confirmedCasesHistory = [];
    const curedCasesHistory = [];
    const deathCasesHistory = [];
    const dateStrings = [];
    const newData = {
      [currentDayStats.parsedOnString]: currentDayStats,
      ...historicalData,
    };
    const dataEntries = Object.entries(newData)
      .filter(([, value]) => value.complete)
      .reverse();

    for (let i = 0; i < dataEntries.length - 1; i++) {
      const numberInfected = dataEntries[i][1].numberInfected;
      const nextNumberInfected = dataEntries[i + 1][1].numberInfected;
      confirmedCasesHistory.push(nextNumberInfected - numberInfected);

      const numberCured = dataEntries[i][1].numberCured;
      const nextNumberCured = dataEntries[i + 1][1].numberCured;
      curedCasesHistory.push(nextNumberCured - numberCured);

      const numberDeceased = dataEntries[i][1].numberDeceased;
      const nextNumberDeceased = dataEntries[i + 1][1].numberDeceased;
      deathCasesHistory.push(nextNumberDeceased - numberDeceased);

      dateStrings.push(formatShortDate(dataEntries[i][0]));
    }
    dateStrings.push(formatShortDate(dataEntries[dataEntries.length - 1][0]));

    return {
      isLoaded: true,
      dates: dateStrings,
      confirmedCasesHistory,
      curedCasesHistory,
      deathCasesHistory,
      lastUpdatedOn,
      stale,
    };
  }

  parseGenderStats(result) {
    const { currentDayStats } = result;
    const {
      genderStats: { lastUpdatedOn, stale },
    } = result.charts;
    const men = currentDayStats.percentageOfMen;
    const women = currentDayStats.percentageOfWomen;
    const children = currentDayStats.percentageOfChildren;

    return {
      isLoaded: true,
      men,
      women,
      children,
      lastUpdatedOn,
      stale,
    };
  }

  parseAgeStats(result) {
    const { distributionByAge } = result.currentDayStats;
    const {
      ageHistogram: { lastUpdatedOn, stale },
    } = result.charts;
    const distributionByAgeEntries = Object.entries(distributionByAge);
    const total = distributionByAgeEntries.reduce(
      (acc, [, entry]) => acc + entry,
      0
    );
    const data = distributionByAgeEntries.map(([key, entry]) => ({
      value: entry,
      name: key,
      percentage: Math.round((100 * entry) / total),
    }));

    return {
      isLoaded: true,
      data,
      lastUpdatedOn,
      stale,
    };
  }

  parseAverageAge(result) {
    const { averageAge } = result.currentDayStats;
    const {
      averageAge: { lastUpdatedOn, stale },
    } = result.charts;
    return {
      isLoaded: true,
      averageAge,
      lastUpdatedOn,
      stale,
    };
  }

  parseLastUpdate(result) {
    const { parsedOnString } = result.currentDayStats;
    return {
      isLoaded: true,
      lastUpdateOnString: parsedOnString,
    };
  }

  shareableLink() {
    return !!window.location.host
      ? window.location.protocol + '//' + window.location.host
      : 'https://datelazi.ro';
  }

  handleDownloadAllData = () => {
    fetch(ApiURL.allData)
      .then((res) => res.json())
      .then((result) => {
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
      .catch((error) => {
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
        />,
      ],
      [
        EMBED_PATH_AGE_CATEGORY,
        <AgeCategory
          key={EMBED_PATH_AGE_CATEGORY}
          title="Cazuri per categorie de vârstă, în timp"
          state={this.state.ageCategory}
        />,
      ],
      [
        EMBED_PATH_AGE,
        <AgeCard
          key={EMBED_PATH_AGE}
          title="Cazuri după vârstă"
          state={this.state.age}
        />,
      ],
      [
        EMBED_PATH_AVERAGE_AGE,
        <AverageAgeCard
          key={EMBED_PATH_AVERAGE_AGE}
          title="Vârsta medie a cazurilor"
          state={this.state.averageAge}
        />,
      ],
      [
        EMBED_PATH_GENDER,
        <GenderCard
          key={EMBED_PATH_GENDER}
          title="Cazuri după gen"
          state={this.state.gender}
        />,
      ],
      [
        PROP_SHOW_CONFIRMED_CASES,
        <SummaryRow
          key={PROP_SHOW_CONFIRMED_CASES}
          visibleCards={[PROP_SHOW_CONFIRMED_CASES]}
          state={this.state.summary}
        />,
      ],
      [
        PROP_SHOW_CURED_CASES,
        <SummaryRow
          key={PROP_SHOW_CURED_CASES}
          visibleCards={[PROP_SHOW_CURED_CASES]}
          state={this.state.summary}
        />,
      ],
      [
        PROP_SHOW_DEATH_CASES,
        <SummaryRow
          key={PROP_SHOW_DEATH_CASES}
          visibleCards={[PROP_SHOW_DEATH_CASES]}
          state={this.state.summary}
        />,
      ],
      [
        EMBED_COUNTIES_MAP,
        <CountiesMap
          key={EMBED_COUNTIES_MAP}
          state={this.state.countiesTable}
        />,
      ],
      [
        EMBED_COUNTIES_TABLE,
        <CountiesTable
          key={EMBED_COUNTIES_TABLE}
          state={this.state.countiesTable}
        />,
      ],
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
                <p className="level-left">
                  Date actualizate {formatDate(lastUpdate)}.
                </p>
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

          <section className="cards-row">
            <div className="columns">
              <div className="column is-three-quarters">
                <CasesPerDayCard state={this.state.daily} />
              </div>
              <div className="column is-one-quarter">
                <GenderCard
                  to="/"
                  title="Cazuri după gen"
                  state={this.state.gender}
                />
              </div>
            </div>
          </section>

          <section className="cards-row">
            <div className="columns">
              <div className="column">
                <AgeCategory
                  title="Cazuri per categorie de vârstă, în timp"
                  state={this.state.ageCategory}
                />
              </div>
            </div>
          </section>

          <section className="cards-row">
            <div className="columns">
              <div className="column is-two-quarter">
                <CountiesMap state={this.state.countiesTable} />
              </div>
              <div className="column is-two-quarter">
                <CountiesTable state={this.state.countiesTable} />
              </div>
            </div>
          </section>

          <section className="cards-row">
            <div className="columns">
              <div className="column is-two-quarter">
                <AgeCard title="Cazuri după vârstă" state={this.state.age} />
              </div>
              <div className="column is-one-quarter">
                <AverageAgeCard
                  title="Vârsta medie a cazurilor"
                  state={this.state.averageAge}
                />
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
