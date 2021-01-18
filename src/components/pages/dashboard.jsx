import React from 'react';
import { ApiURL } from '../../config/globals';
import { PageHeader } from '../layout/page-header/page-header';
import { mnemonics } from '../../config/mnemonics';
import {
  PROP_SHOW_CONFIRMED_CASES,
  PROP_SHOW_CURED_CASES,
  PROP_SHOW_DEATH_CASES,
  PROP_SHOW_TOTAL_VACCINE,
  PROP_SHOW_VACCINE_IMMUNIZATION,
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
import { formatShortDate } from '../../utils/date';
import download from 'downloadjs';

import { SocialsShare } from '@code4ro/taskforce-fe-components';

import './dashboard.css';
import { withToastProvider } from '../layout/toast/withToastProvider';
import { InstrumentsWrapper } from '../layout/instruments/instruments';
import {
  AgeCategory,
  EMBED_PATH_AGE_CATEGORY,
} from '../cards/age-category/age-category';
import { VaccinesPerDayCard } from '../cards/vaccines-per-day-card/vaccines-per-day-card';

class DashboardNoContext extends React.PureComponent {
  constructor(props) {
    super(props);

    const defaultState = {
      isLoaded: false,
      error: null,
    };

    this.state = {
      error: defaultState.error,
      summary: defaultState,
      daily: defaultState, // object
      cumulative: defaultState, // object
      gender: defaultState, // object
      age: defaultState, // object
      averageAge: defaultState, // object
      dailyTable: defaultState, // object
      countiesTable: defaultState,
      ageCategory: defaultState,
      vaccinesDaily: defaultState,
      vaccinesCumulative: defaultState,
    };
  }

  componentDidMount() {
    fetch(ApiURL.allData)
      .then((res) => res.json())
      .then((result) => {
        if (result.error != null) {
          this.setState({ error: result.error, isLoaded: true });
        } else {
          this.setState({
            summary: this.parseSummary(result),
            daily: this.parseDailyStats(result, { cumulative: false }),
            cumulative: this.parseDailyStats(result, { cumulative: true }),
            gender: this.parseGenderStats(result),
            age: this.parseAgeStats(result),
            averageAge: this.parseAverageAge(result),
            countiesTable: this.parseCountiesTable(result),
            ageCategory: this.parseAgeCategory(result),
            vaccinesDaily: this.parseVaccinesHistory(result, {
              cumulative: false,
            }),
            vaccinesCumulative: this.parseVaccinesHistory(result, {
              cumulative: true,
            }),
          });
        }
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
      .filter(([key, value]) => key <= lastUpdatedOn)
      .reverse();

    for (let i = 0; i < dataEntries.length - 1; i++) {
      const key = dataEntries[i + 1][0];
      const currentValue = dataEntries[i][1];
      const nextValue = dataEntries[i + 1][1];
      dateStrings.push(formatShortDate(key));

      Object.entries(currentValue.distributionByAge)
        .filter(([ageGroup]) => ageGroup !== 'în procesare')
        .forEach(([ageGroup, currentCases]) => {
          const cases = nextValue.distributionByAge[ageGroup] - currentCases;
          if (Array.isArray(ageCategories[ageGroup])) {
            ageCategories[ageGroup].push(cases);
          } else {
            ageCategories[ageGroup] = [cases];
          }
        });
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
    const { countyInfectionsNumbers, incidence } = result.currentDayStats;
    const {
      incidenceStats: { lastUpdatedOn, stale },
    } = result.charts;

    const counties = Object.entries(incidence)
      .map(([key, entry]) => ({
        name: mnemonics[key][0],
        value: entry,
        countyInfectionsNumbers: countyInfectionsNumbers[key],
        county: key,
      }))
      .sort((a, b) =>
        // reversed by count
        a.value > b.value ? -1 : 1
      );
    return {
      error: null,
      isLoaded: true,
      counties,
      lastUpdatedOn,
      stale,
    };
  }

  parseSummary(result) {
    try {
      const {
        numberInfected,
        numberCured,
        numberDeceased,
        numberTotalDosesAdministered,
        vaccines,
      } = result.currentDayStats;
      const {
        dailyStats: { stale: dailyStale, lastUpdatedOn: dailyLastUpdate },
        vaccineQuickStats: {
          stale: vaccineQuickStale,
          lastUpdatedOn: vaccineQuickLastUpdate,
        },
        immunizationStats: {
          stale: imunizationStale,
          lastUpdatedOn: imunizationLastUpdate,
        },
      } = result.charts;
      const { historicalData } = result;
      const totalCasesHistory = [];
      const curedCasesHistory = [];
      const deathCasesHistory = [];
      const dosesAdministeredHistory = [];
      const immunityHistory = [];

      Object.entries(historicalData)
        .reverse()
        .forEach(([, entry]) => {
          totalCasesHistory.push(entry.numberInfected || 0);
          curedCasesHistory.push(entry.numberCured || 0);
          deathCasesHistory.push(entry.numberDeceased || 0);
          dosesAdministeredHistory.push(
            entry.numberTotalDosesAdministered || 0
          );
          immunityHistory.push(
            entry.vaccines?.pfizer.immunized + entry.vaccines?.moderna.immunized || 0
          );
        });

      totalCasesHistory.push(numberInfected);
      curedCasesHistory.push(numberCured);
      deathCasesHistory.push(numberDeceased);
      if(!imunizationStale){
        dosesAdministeredHistory.push(numberTotalDosesAdministered);
        immunityHistory.push(vaccines?.pfizer.immunized + vaccines?.moderna.immunized);
      }

      const totalImmunity = immunityHistory.reduce((a, b) => a + b, 0);

      return {
        isLoaded: true,
        totalCases: numberInfected,
        totalCasesHistory,
        curedCases: numberCured,
        curedCasesHistory,
        deathCases: numberDeceased,
        deathCasesHistory,
        totalDosesAdministered: numberTotalDosesAdministered,
        dosesAdministeredHistory,
        totalImmunity,
        immunityHistory,
        dailyStale,
        dailyLastUpdate,
        vaccineQuickStale,
        vaccineQuickLastUpdate,
        imunizationStale,
        imunizationLastUpdate,
      };
    } catch (error) {
      console.error(error);
      return {
        error,
        isLoaded: false,
      };
    }
  }

  parseDailyStats(result, options) {
    try {
      const {
        dailyStats: { lastUpdatedOn, stale },
      } = result.charts;
      const { historicalData, currentDayStats } = result;
      const { cumulative } = options;

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

      for (let i = 0; i <= dataEntries.length - 1; i++) {
        const numberInfected = dataEntries[i][1].numberInfected;
        const nextNumberInfected = dataEntries[i + 1]?.[1].numberInfected;
        const prevNumberInfected = dataEntries[i - 1]?.[1].numberInfected;
        const numberInfectedByDay = !isNaN(nextNumberInfected)
          ? nextNumberInfected - numberInfected
          : numberInfected - prevNumberInfected;

        confirmedCasesHistory.push(
          cumulative ? numberInfected : numberInfectedByDay
        );

        const numberCured = dataEntries[i][1].numberCured;
        const nextNumberCured = dataEntries[i + 1]?.[1]?.numberCured;
        const prevNumberCured = dataEntries[i - 1]?.[1]?.numberCured;
        const numberCuredByDay = !isNaN(nextNumberCured)
          ? nextNumberCured - numberCured
          : numberCured - prevNumberCured;

        curedCasesHistory.push(cumulative ? numberCured : numberCuredByDay);

        const numberDeceased = dataEntries[i][1].numberDeceased;
        const nextNumberDeceased = dataEntries[i + 1]?.[1]?.numberDeceased;
        const prevNumberDeceased = dataEntries[i - 1]?.[1]?.numberDeceased;
        const numberDeceasedByDay = !isNaN(nextNumberDeceased)
          ? nextNumberDeceased - numberDeceased
          : numberDeceased - prevNumberDeceased;

        deathCasesHistory.push(
          cumulative ? numberDeceased : numberDeceasedByDay
        );

        dateStrings.push(formatShortDate(dataEntries[i][0]));
      }

      if (!cumulative) {
        dateStrings.shift();
      }

      return {
        isLoaded: true,
        dates: dateStrings,
        confirmedCasesHistory,
        curedCasesHistory,
        deathCasesHistory,
        lastUpdatedOn,
        stale,
      };
    } catch (error) {
      console.error(error);
      return {
        error,
        isLoaded: false,
      };
    }
  }

  parseVaccinesHistory(result, options) {
    try {
      const { historicalData, currentDayStats } = result;
      const { cumulative } = options;
      const {
        vaccineDetailedStats: {
          stale: vaccineDetailedStale,
          lastUpdatedOn: vaccineDetailedLastUpdate,
        },
      } = result.charts;
      const dateStrings = [];
      const pfizerRecords = [];
      const modernaRecords = [];

      const newData = vaccineDetailedStale
        ? historicalData
        : {
          [currentDayStats.parsedOnString]: currentDayStats,
          ...historicalData,
        };

      Object.entries(newData)
        .reverse()
        .forEach(([date, entry]) => {
          if (entry.vaccines) {
            const { pfizer, moderna } = entry.vaccines;
            if (pfizer.total_administered) {
              pfizerRecords.push(
                cumulative
                  ? (pfizerRecords[dateStrings.length - 1] || 0) +
                      pfizer.total_administered : pfizer.total_administered  || 0
              );
            }
            if (moderna.total_administered) {
              modernaRecords.push(
                cumulative
                  ? (modernaRecords[dateStrings.length - 1] || 0) +
                      moderna.total_administered : moderna.total_administered || 0
              );
            }
            dateStrings.push(formatShortDate(date));
          }
        });

      return {
        isLoaded: true,
        isStale: vaccineDetailedStale,
        lastUpdatedOn: vaccineDetailedLastUpdate,
        dates: dateStrings,
        pfizer: pfizerRecords,
        moderna: modernaRecords,
      };
    } catch (error) {
      console.error(error);
      return {
        error,
        isLoaded: false,
      };
    }
  }

  parseGenderStats(result) {
    try {
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
    } catch (error) {
      console.error(error);
      return {
        error,
        isLoaded: false,
      };
    }
  }

  parseAgeStats(result) {
    try {
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
    } catch (error) {
      console.error(error);
      return {
        error,
        isLoaded: false,
      };
    }
  }

  parseAverageAge(result) {
    try {
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
    } catch (error) {
      console.error(error);
      return {
        error,
        isLoaded: false,
      };
    }
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
        this.setState({ error: result.error, isLoaded: true });
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
          daily={this.state.daily}
          cumulative={this.state.cumulative}
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
        PROP_SHOW_TOTAL_VACCINE,
        <SummaryRow
          key={PROP_SHOW_TOTAL_VACCINE}
          visibleCards={[PROP_SHOW_TOTAL_VACCINE]}
          state={this.state.summary}
        />,
      ],
      [
        PROP_SHOW_VACCINE_IMMUNIZATION,
        <SummaryRow
          key={PROP_SHOW_VACCINE_IMMUNIZATION}
          visibleCards={[PROP_SHOW_VACCINE_IMMUNIZATION]}
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
                Accesul la date din surse oficiale cu privire la evoluția
                cazurilor de COVID-19 și a programului de vaccinare în România
                este esențial în adoptarea măsurilor de sănătate publică
                împotriva pandemiei. Astfel, venim în sprijinul publicului și al
                mass-media din România prin accesibilizarea datelor punându-le
                într-o formă grafică ușor de parcurs.
              </p>
              <p>
                Infografiile se actualizează zilnic și sunt centralizate în
                graficele de mai jos.
              </p>
              <p>
                Acest proiect este realizat pro-bono de către Asociația Code for
                Romania în parteneriat cu Guvernul României prin Autoritatea
                pentru Digitalizarea României. Funcționarea acestei platforme
                depinde exclusiv de conținutul datelor și informațiilor care vor
                fi furnizate de către Guvernul României.
              </p>

              <SocialsShare currentPage={link} />
            </div>
            <div className="is-flex is-justify-content-flex-end">
              <button
                className="button is-primary is-light"
                onClick={this.handleDownloadAllData}
              >
                Descarcă datele
              </button>
            </div>
          </section>

          <SummaryRow state={this.state.summary} />

          <section className="cards-row">
            <div className="columns">
              <div className="column">
                <VaccinesPerDayCard
                  daily={this.state.vaccinesDaily}
                  cumulative={this.state.vaccinesCumulative}
                />
              </div>
            </div>
          </section>

          <section className="cards-row">
            <div className="columns">
              <div className="column is-three-quarters">
                <CasesPerDayCard
                  daily={this.state.daily}
                  cumulative={this.state.cumulative}
                />
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
