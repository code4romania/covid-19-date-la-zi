// Anything that was defined in /public/env-config.js (this file is created via docker for deployment reasons so we can
// specify the API_URL, for example)
let windowEnvironment = window._env_;
if (windowEnvironment === undefined) {
  windowEnvironment = {};
}

export const Constants = {
  api:
    windowEnvironment.REACT_APP_API_URL ||
    process.env.REACT_APP_API_URL ||
    'https://code4rocoviz19api-demo.azurewebsites.net/api/v2',
  isDev:
    windowEnvironment.ENV === 'development' ||
    process.env.NODE_ENV === 'development',
  isProd:
    windowEnvironment.ENV === 'production' ||
    process.env.NODE_ENV === 'production',

  specifyUnknownData:
    (windowEnvironment.SPECIFY_UNKNOWN_DATA ||
      process.env.REACT_APP_SPECIFY_UNKNOWN_DATA ||
      'false') === 'true',

  womenColor: '#F77EB9',
  menColor: '#7EBCFF',
  childrenColor: '#bbbbbb',
  unknownColor: '#9FB3C7',

  symptomaticColor: '#F8AF69',
  confirmedColor: '#66A4FB',
  curedColor: '#65E0E0',

  countyLowestColor: '#FFFF66',
  countyHighestColor: '#DC143C',

  deathColor: 'black',

  womenText: 'Femei',
  menText: 'Bărbați',
  childrenText: 'Copii < 18 ani',
  unknownGenderText: 'Necunoscuți',

  magenta: '#F1B8FF',
  orange: '#FDC862',
  green: '#A4E064',
  grey: '#B2BECE',
  lightblue: '#A5D7FC',

  oldestColor: '#CB466E',
  processingColor: '#FFDE9F',

  dailyRecordsLimit: 14,
};

export const ApiURL = {
  allData: Constants.api + '/data',
};
