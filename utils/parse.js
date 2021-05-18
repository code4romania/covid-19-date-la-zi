import { formatDate } from './date'
import { mnemonics } from '../config/mnemonics'

export function parseAgeCategory(result) {
  const { historicalData, currentDayStats } = result
  const {
    ageHistogram: { lastUpdatedOn, stale },
  } = result.charts
  const ageCategories = {}
  const dateStrings = []
  const newData = {
    [currentDayStats.parsedOnString]: currentDayStats,
    ...historicalData,
  }

  const dataEntries = Object.entries(newData)
    .filter(([key]) => key <= lastUpdatedOn)
    .reverse()

  for (let i = 0; i < dataEntries.length - 1; i++) {
    const key = dataEntries[i + 1][0]
    const currentValue = dataEntries[i][1]
    const nextValue = dataEntries[i + 1][1]
    dateStrings.push(formatDate(key))

    Object.entries(currentValue.distributionByAge)
      .filter(([ageGroup]) => ageGroup !== 'în procesare')
      .forEach(([ageGroup, currentCases]) => {
        const cases = nextValue.distributionByAge[ageGroup] - currentCases
        if (Array.isArray(ageCategories[ageGroup])) {
          ageCategories[ageGroup].push(cases)
        } else {
          ageCategories[ageGroup] = [cases]
        }
      })
  }

  return {
    lastUpdatedOn,
    ageCategories,
    dateStrings,
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
      value: entry,
      countyInfectionsNumbers: countyInfectionsNumbers[key],
      county: key,
    }))
    .sort((a, b) =>
      // reversed by count
      a.value > b.value ? -1 : 1
    )

  return {
    error: null,
    counties,
    lastUpdatedOn,
    stale,
  }
}

export function parseSummary(result) {
  try {
    const {
      numberInfected,
      numberCured,
      numberDeceased,
      numberTotalDosesAdministered,
      vaccines,
    } = result.currentDayStats
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
        totalCasesHistory.push(entry.numberInfected || 0)
        curedCasesHistory.push(entry.numberCured || 0)
        deathCasesHistory.push(entry.numberDeceased || 0)
        dosesAdministeredHistory.push(entry.numberTotalDosesAdministered || 0)
        immunityHistory.push(
          entry.vaccines?.pfizer.immunized +
            entry.vaccines?.moderna.immunized +
            entry.vaccines?.astra_zeneca.immunized +
            entry.vaccines?.johnson_and_johnson.immunized || 0
        )
      })

    totalCasesHistory.push(numberInfected)
    curedCasesHistory.push(numberCured)
    deathCasesHistory.push(numberDeceased)
    if (!imunizationStale) {
      dosesAdministeredHistory.push(numberTotalDosesAdministered)
      immunityHistory.push(
        vaccines?.pfizer.immunized +
          vaccines?.moderna.immunized +
          vaccines?.astra_zeneca.immunized +
          vaccines?.johnson_and_johnson.immunized || 0
      )
    }

    const totalImmunity = immunityHistory.reduce((a, b) => a + b, 0)

    return {
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
    const newData = {
      [currentDayStats.parsedOnString]: currentDayStats,
      ...historicalData,
    }
    const dataEntries = Object.entries(newData)
      .filter(([, value]) => value.complete)
      .reverse()

    for (let i = 0; i <= dataEntries.length - 1; i++) {
      const numberInfected = dataEntries[i][1].numberInfected
      const nextNumberInfected = dataEntries[i + 1]?.[1].numberInfected
      const prevNumberInfected = dataEntries[i - 1]?.[1].numberInfected
      const numberInfectedByDay = !isNaN(nextNumberInfected)
        ? nextNumberInfected - numberInfected
        : numberInfected - prevNumberInfected

      confirmedCasesHistory.push(
        cumulative ? numberInfected : numberInfectedByDay
      )

      const numberCured = dataEntries[i][1].numberCured
      const nextNumberCured = dataEntries[i + 1]?.[1]?.numberCured
      const prevNumberCured = dataEntries[i - 1]?.[1]?.numberCured
      const numberCuredByDay = !isNaN(nextNumberCured)
        ? nextNumberCured - numberCured
        : numberCured - prevNumberCured

      curedCasesHistory.push(cumulative ? numberCured : numberCuredByDay)

      const numberDeceased = dataEntries[i][1].numberDeceased
      const nextNumberDeceased = dataEntries[i + 1]?.[1]?.numberDeceased
      const prevNumberDeceased = dataEntries[i - 1]?.[1]?.numberDeceased
      const numberDeceasedByDay = !isNaN(nextNumberDeceased)
        ? nextNumberDeceased - numberDeceased
        : numberDeceased - prevNumberDeceased

      deathCasesHistory.push(cumulative ? numberDeceased : numberDeceasedByDay)

      dateStrings.push(formatDate(dataEntries[i][0]))
    }

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
    const pfizerRecords = []
    const modernaRecords = []
    const astraZenecaRecords = []
    const johnsonAndJohnsonRecords = []

    const newData = vaccineDetailedStale
      ? historicalData
      : {
          [currentDayStats.parsedOnString]: currentDayStats,
          ...historicalData,
        }

    Object.entries(newData)
      .reverse()
      .forEach(([date, entry]) => {
        if (entry.vaccines) {
          const {
            pfizer,
            moderna,
            astra_zeneca,
            johnson_and_johnson,
          } = entry.vaccines
          pfizerRecords.push(
            cumulative
              ? (pfizerRecords[dateStrings.length - 1] || 0) +
                  pfizer.total_administered
              : pfizer.total_administered || 0
          )
          modernaRecords.push(
            cumulative
              ? (modernaRecords[dateStrings.length - 1] || 0) +
                  moderna.total_administered
              : moderna.total_administered || 0
          )
          astraZenecaRecords.push(
            cumulative
              ? (astraZenecaRecords[dateStrings.length - 1] || 0) +
                  astra_zeneca.total_administered
              : astra_zeneca.total_administered || 0
          )
          johnsonAndJohnsonRecords.push(
            cumulative
              ? (johnsonAndJohnsonRecords[dateStrings.length - 1] || 0) +
                  johnson_and_johnson.total_administered
              : johnson_and_johnson.total_administered || 0
          )
          dateStrings.push(formatDate(date))
        }
      })

    return {
      isStale: vaccineDetailedStale,
      lastUpdatedOn: vaccineDetailedLastUpdate,
      dates: dateStrings,
      pfizer: pfizerRecords,
      moderna: modernaRecords,
      astraZeneca: astraZenecaRecords,
      johnsonAndJohnson: johnsonAndJohnsonRecords,
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
