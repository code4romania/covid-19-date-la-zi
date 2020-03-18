export const Constants = {
  api: process.env.REACT_APP_API_URL || 'https://code4rocoviz19api-demo.azurewebsites.net/api/v1',
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',

  womenColor: '#F77EB9',
  menColor: '#7EBCFF',

  symptomaticColor: '#F8AF69',
  confirmedColor: '#69B2F8',
  curedColor: '#65E0E0',

  countyLowestColor: '#7EBCFF',
  countyHighestColor: 'red',

  womenText: 'Femei',
  menText: 'Bărbați'
};

export const ApiURL = {
  summary: Constants.api + '/data/quickstats',
  dailyStats: Constants.api + '/data/dailystats',
  infectionSourceStats: Constants.api + '/data/infections-source',
  genderAgeStats: Constants.api + '/data/gender-age-histogram',
  genderStats: Constants.api + '/data/genderstats',
  countyStats: Constants.api + '/data/county-infections'
}
