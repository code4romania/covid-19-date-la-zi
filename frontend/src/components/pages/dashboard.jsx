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
    });
  }

  parseCountiesTable(result) {
    const { countyInfectionsNumbers } = result.currentDayStats;
    const counties = Object.keys(countyInfectionsNumbers)
      .map((key) => ({
        name: mnemonics[key][0],
        value: (
          (1000 * countyInfectionsNumbers[key]) /
          mnemonics[key][1]
        ).toFixed(2),
        totalPopulation: mnemonics[key][1],
        numberInfected: countyInfectionsNumbers[key],
        county: key,
      }))
      .sort((a, b) =>
        // reversed by count
        a.value > b.value ? -1 : 1
      );
    const max = counties[0].value;
    return {
      error: null,
      isLoaded: true,
      counties: counties,
      max,
    };
  }

  parseSummary(result) {
    const {
      numberInfected,
      numberCured,
      numberDeceased,
    } = result.currentDayStats;
    const { historicalData } = result;
    const totalCasesHistory = Object.entries(historicalData).map(
      (entry) => entry[1].numberInfected || 0
    );
    const curedCasesHistory = Object.entries(historicalData).map(
      (entry) => entry[1].numberCured || 0
    );
    const deathCasesHistory = Object.entries(historicalData).map(
      (entry) => entry[1].numberDeceased || 0
    );
    return {
      isLoaded: true,
      totalCases: numberInfected,
      totalCasesHistory: totalCasesHistory,
      curedCases: numberCured,
      curedCasesHistory: curedCasesHistory,
      deathCases: numberDeceased,
      deathCasesHistory: deathCasesHistory,
    };
  }

  parseDailyStats(result) {
    const { historicalData } = result;

    const dates = Object.keys(historicalData);
    const startDate = dates[0];
    const endDate = dates[dates.length - 1];
    const startDateStr = formatShortDate(startDate);
    const endDateStr = formatShortDate(endDate);
    const confirmedCasesHistory = [];
    const curedCasesHistory = [];
    const deathCasesHistory = [];
    const dateStrings = [];
    const dataEntries = Object.entries(historicalData);
    for (let i = dataEntries.length - 1; i > 0; i--) {
      const numberInfected = dataEntries[i][1].numberInfected;
      const prevNumberInfected = dataEntries[i - 1][1].numberInfected;
      confirmedCasesHistory.push(prevNumberInfected - numberInfected);

      const numberCured = dataEntries[i][1].numberCured;
      const prevNumberCured = dataEntries[i - 1][1].numberCured;
      curedCasesHistory.push(prevNumberCured - numberCured);

      const numberDeceased = dataEntries[i][1].numberDeceased;
      const prevNmberDeceased = dataEntries[i - 1][1].numberDeceased;
      deathCasesHistory.push(prevNmberDeceased - numberDeceased);

      dateStrings.push(dataEntries[i][0]);
    }
    dateStrings.push(dataEntries[0][0]);
    return {
      isLoaded: true,
      startDate: startDateStr,
      endDate: endDateStr,
      dates: dateStrings,
      confirmedCasesHistory,
      curedCasesHistory,
      deathCasesHistory,
    };
  }

  parseGenderStats(result) {
    const { currentDayStats } = result;
    const men = currentDayStats.percentageOfMen;
    const women = currentDayStats.percentageOfWomen;
    const children = currentDayStats.percentageOfChildren;

    return {
      isLoaded: true,
      men,
      women,
      children,
    };
  }

  parseAgeStats(result) {
    const { distributionByAge } = result.currentDayStats;
    let total = 0;
    Object.entries(distributionByAge).forEach((entry) => (total += entry[1]));
    const data = Object.keys(distributionByAge).map((key) => ({
      value: distributionByAge[key],
      name: key,
      percentage: Math.round((100 * distributionByAge[key]) / total),
    }));

    return {
      isLoaded: true,
      data,
    };
  }

  parseAverageAge(result) {
    const { averageAge } = result.currentDayStats;
    return {
      isLoaded: true,
      averageAge,
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
