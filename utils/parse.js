import { formatDate } from './date'
import { mnemonics } from '../config/mnemonics'

export function parseAgeCategory(result) {
  const { historicalData, currentDayStats } = result
  const {
    ageHistogram: { lastUpdatedOn, stale },
  } = result.charts
  const ageCategories = {}
  const dateStrings = []

  const dataEntries = [currentDayStats, ...historicalData]
    .filter((entry) => entry.date <= lastUpdatedOn)
    .reverse()

  dataEntries.forEach((entry, index) => {
    if (index + 1 >= dataEntries.length) {
      return
    }

    const nextEntry = dataEntries[index + 1]

    dateStrings.push(formatDate(entry.date))

    Object.entries(entry.distributionByAge)
      .filter(([ageGroup]) => ageGroup !== 'processing')
      .forEach(([ageGroup, currentCases]) => {
        const cases = nextEntry.distributionByAge[ageGroup] - currentCases
        if (Array.isArray(ageCategories[ageGroup])) {
          ageCategories[ageGroup].push(cases)
        } else {
          ageCategories[ageGroup] = [cases]
        }
      })
  })

  return {
    lastUpdatedOn,
    ageCategories,
    dateStrings,
    stale,
  }
}

export function parseSmallCitiesIncidentsTable(result) {
  const {
    detailedIncidenceStats: { lastUpdatedOn, stale },
  } = result.charts

  return {
    error: null,
    data: result.currentDayStats.smallCities,
    lastUpdatedOn,
    stale,
  }
}

export function parseLargeCitiesIncidentsTable(result) {
  const {
    detailedIncidenceStats: { lastUpdatedOn, stale },
  } = result.charts

  return {
    error: null,
    data: result.currentDayStats.largeCities,
    lastUpdatedOn,
    stale,
  }
}

export function parseCountiesTable(result) {
  const { countyInfectionsNumbers, incidence } = result.currentDayStats
  const {
    incidenceStats: { lastUpdatedOn, stale },
  } = result.charts

  const counties = Object.entries(incidence)
    .map(([key, entry]) => ({
      name: mnemonics[key][0],
      value: parseFloat(entry),
      countyInfectionsNumbers: parseInt(countyInfectionsNumbers[key]),
      county: key,
    }))
    .sort((a, b) => (a.value > b.value ? -1 : 1))

  return {
    error: null,
    counties,
    lastUpdatedOn,
    stale,
  }
}

export function parseSummary(result) {
  try {
    const { infected, cured, deceased, totalDosesAdministered, vaccines } =
      result.currentDayStats
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
    } = result.charts
    const { historicalData } = result
    const totalCasesHistory = []
    const curedCasesHistory = []
    const deathCasesHistory = []
    const dosesAdministeredHistory = []
    const immunityHistory = []

    Object.entries(historicalData)
      .reverse()
      .forEach(([, entry]) => {
        totalCasesHistory.push(entry.infected || 0)
        curedCasesHistory.push(entry.cured || 0)
        deathCasesHistory.push(entry.deceased || 0)
        dosesAdministeredHistory.push(entry.totalDosesAdministered || 0)
        immunityHistory.push(
          entry.vaccines?.pfizer.immunized +
            entry.vaccines?.pfizer_pediatric.immunized +
            entry.vaccines?.moderna.immunized +
            entry.vaccines?.astra_zeneca.immunized +
            entry.vaccines?.johnson_and_johnson.immunized || 0
        )
      })

    totalCasesHistory.push(infected)
    curedCasesHistory.push(cured)
    deathCasesHistory.push(deceased)
    if (!imunizationStale) {
      dosesAdministeredHistory.push(totalDosesAdministered)
      immunityHistory.push(
        vaccines?.pfizer.immunized +
          vaccines?.pfizer_pediatric.immunized +
          vaccines?.moderna.immunized +
          vaccines?.astra_zeneca.immunized +
          vaccines?.johnson_and_johnson.immunized || 0
      )
    }

    const totalImmunity = immunityHistory.reduce((a, b) => a + b, 0)

    return {
      totalCases: infected,
      totalCasesHistory,
      curedCases: cured,
      curedCasesHistory,
      deathCases: deceased,
      deathCasesHistory,
      totalDosesAdministered,
      dosesAdministeredHistory,
      totalImmunity,
      immunityHistory,
      dailyStale,
      dailyLastUpdate,
      vaccineQuickStale,
      vaccineQuickLastUpdate,
      imunizationStale,
      imunizationLastUpdate,
    }
  } catch (error) {
    console.error(error)
    return {
      error,
    }
  }
}

export function parseDailyStats(result, options) {
  try {
    const {
      dailyStats: { lastUpdatedOn, stale },
    } = result.charts
    const { historicalData, currentDayStats } = result
    const { cumulative } = options

    const confirmedCasesHistory = []
    const curedCasesHistory = []
    const deathCasesHistory = []
    const dateStrings = []
    const dataEntries = [currentDayStats, ...historicalData].reverse()

    dataEntries.forEach((entry, index) => {
      if (index + 1 >= dataEntries.length) {
        return
      }

      const infected = entry.infected
      const nextNumberInfected = dataEntries[index + 1]?.infected
      const prevNumberInfected = dataEntries[index - 1]?.infected
      const infectedByDay = !isNaN(nextNumberInfected)
        ? nextNumberInfected - infected
        : infected - prevNumberInfected

      confirmedCasesHistory.push(cumulative ? infected : infectedByDay)

      const cured = entry.cured
      const nextNumberCured = dataEntries[index + 1]?.cured
      const prevNumberCured = dataEntries[index - 1]?.cured
      const curedByDay = !isNaN(nextNumberCured)
        ? nextNumberCured - cured
        : cured - prevNumberCured

      curedCasesHistory.push(cumulative ? cured : curedByDay)

      const deceased = entry.deceased
      const nextNumberDeceased = dataEntries[index + 1]?.deceased
      const prevNumberDeceased = dataEntries[index - 1]?.deceased
      const deceasedByDay = !isNaN(nextNumberDeceased)
        ? nextNumberDeceased - deceased
        : deceased - prevNumberDeceased

      deathCasesHistory.push(cumulative ? deceased : deceasedByDay)

      dateStrings.push(formatDate(entry.date))
    })

    if (!cumulative) {
      dateStrings.shift()
    }

    return {
      dates: dateStrings,
      confirmedCasesHistory,
      curedCasesHistory,
      deathCasesHistory,
      lastUpdatedOn,
      stale,
    }
  } catch (error) {
    console.error(error)
    return {
      error,
    }
  }
}

export function parseVaccinesHistory(result, options) {
  try {
    const { historicalData, currentDayStats } = result
    const { cumulative } = options
    const {
      vaccineDetailedStats: {
        stale: vaccineDetailedStale,
        lastUpdatedOn: vaccineDetailedLastUpdate,
      },
    } = result.charts
    const dateStrings = []
    const pfizer = []
    const pfizerPediatric = []
    const moderna = []
    const astraZeneca = []
    const johnsonAndJohnson = []

    const newData = (
      vaccineDetailedStale
        ? historicalData
        : [currentDayStats, ...historicalData]
    ).reverse()

    if (cumulative) {
      newData.forEach((entry) => {
        if (!entry.vaccines) {
          return
        }

        pfizer.push(
          (pfizer[dateStrings.length - 1] || 0) +
            entry.vaccines.pfizer.total_administered
        )
        pfizerPediatric.push(
          (pfizerPediatric[dateStrings.length - 1] || 0) +
            entry.vaccines.pfizer_pediatric.total_administered
        )
        moderna.push(
          (moderna[dateStrings.length - 1] || 0) +
            entry.vaccines.moderna.total_administered
        )
        astraZeneca.push(
          (astraZeneca[dateStrings.length - 1] || 0) +
            entry.vaccines.astra_zeneca.total_administered
        )
        johnsonAndJohnson.push(
          (johnsonAndJohnson[dateStrings.length - 1] || 0) +
            entry.vaccines.johnson_and_johnson.total_administered
        )

        dateStrings.push(formatDate(entry.date))
      })
    } else {
      newData.forEach((entry) => {
        if (!entry.vaccines) {
          return
        }

        pfizer.push(entry.vaccines.pfizer.total_administered || 0)
        pfizerPediatric.push(
          entry.vaccines.pfizer_pediatric.total_administered || 0
        )
        moderna.push(entry.vaccines.moderna.total_administered || 0)
        astraZeneca.push(entry.vaccines.astra_zeneca.total_administered || 0)
        johnsonAndJohnson.push(
          entry.vaccines.johnson_and_johnson.total_administered || 0
        )

        dateStrings.push(formatDate(entry.date))
      })
    }

    return {
      isStale: vaccineDetailedStale,
      lastUpdatedOn: vaccineDetailedLastUpdate,
      dates: dateStrings,
      pfizer,
      pfizerPediatric,
      moderna,
      astraZeneca,
      johnsonAndJohnson,
    }
  } catch (error) {
    console.error(error)
    return {
      error,
    }
  }
}

export function parseGenderStats(result) {
  try {
    const { currentDayStats } = result
    const {
      genderStats: { lastUpdatedOn, stale },
    } = result.charts
    const men = currentDayStats.percentageOfMen
    const women = currentDayStats.percentageOfWomen
    const children = currentDayStats.percentageOfChildren

    return {
      men,
      women,
      children,
      lastUpdatedOn,
      stale,
    }
  } catch (error) {
    console.error(error)
    return {
      error,
    }
  }
}

export function parseAgeStats(result) {
  try {
    const { distributionByAge } = result.currentDayStats
    const {
      ageHistogram: { lastUpdatedOn, stale },
    } = result.charts
    const distributionByAgeEntries = Object.entries(distributionByAge)
    const total = distributionByAgeEntries.reduce(
      (acc, [, entry]) => acc + entry,
      0
    )
    const data = distributionByAgeEntries.map(([key, entry]) => ({
      value: entry,
      name: key,
      percentage: Math.round((100 * entry) / total),
    }))

    return {
      data,
      lastUpdatedOn,
      stale,
    }
  } catch (error) {
    console.error(error)
    return {
      error,
    }
  }
}

export function parseAverageAge(result) {
  try {
    const { averageAge } = result.currentDayStats
    const {
      averageAge: { lastUpdatedOn, stale },
    } = result.charts
    return {
      averageAge,
      lastUpdatedOn,
      stale,
    }
  } catch (error) {
    console.error(error)
    return {
      error,
    }
  }
}
