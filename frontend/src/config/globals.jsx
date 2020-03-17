export const Constants = {
  // TODO: dev vs prod
  api: 'https://code4rocoviz19api-demo.azurewebsites.net/api/v1',

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
