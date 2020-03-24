// Anything that was defined in /public/env-config.js (this file is created via docker for deployment reasons so we can
// specify the API_URL, for example)
let windowEnvironment = window._env_
if (windowEnvironment === undefined) {
  windowEnvironment = {}
}

export const Constants = {
  api: windowEnvironment.REACT_APP_API_URL ||
    (process.env.REACT_APP_API_URL || 'https://staging-api.datelazi.ro/api/v1'),
  isDev: windowEnvironment.ENV === 'development' || process.env.NODE_ENV === 'development',
  isProd: windowEnvironment.ENV === 'production' || process.env.NODE_ENV === 'production',

  specifyUnknownData: (windowEnvironment.SPECIFY_UNKNOWN_DATA ||
    (process.env.REACT_APP_SPECIFY_UNKNOWN_DATA || 'false')) === 'true',

  womenColor: '#F77EB9',
  menColor: '#7EBCFF',
  unknownColor: '#9FB3C7',

  symptomaticColor: '#F8AF69',
  confirmedColor: '#69B2F8',
  curedColor: '#65E0E0',

  countyLowestColor: '#7EBCFF',
  countyHighestColor: 'red',

  womenText: 'Femei',
  menText: 'Bărbați',
  unknownGenderText: 'Necunoscuți',

  magenta: "#F1B8FF",
  orange: "#FDC862",
  green: "#A4E064",
  grey: "#B2BECE",
  lightblue: "#A5D7FC"
};

export const ApiURL = {
  summary: Constants.api + '/data/quickstats',
  dailyStats: Constants.api + '/data/dailystats',
  infectionSourceStats: Constants.api + '/data/infections-source',
  genderAgeStats: Constants.api + '/data/age-histogram',
  genderStats: Constants.api + '/data/genderstats',
  countyStats: Constants.api + '/data/county-infections'
}
