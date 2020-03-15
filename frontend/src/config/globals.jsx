export const Constants = {
  // TODO: dev vs prod
  api: 'https://code4rocoviz19api-demo.azurewebsites.net/api/v1',

  womenColor: '#F77EB9',
  menColor: '#7EBCFF',

  symptomaticColor: '#F8AF69',
  confirmedColor: '#69B2F8',
  curedColor: '#65E0E0',

  womenText: 'Femei',
  menText: 'Bărbați'
};

export const ApiURL = {
  summary: Constants.api + '/data/quickstats',
  dailyStats: Constants.api + '/data/dailystats',
  genderStats: Constants.api + '/data/genderstats',
  infectionSourceStats: Constants.api + '/data/infectionSourceStats'
}
