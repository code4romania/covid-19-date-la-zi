export const Constants = {
  api: process.env.REACT_APP_API_URL || 'https://d35p9e4fm9h3wo.cloudfront.net',

  womenColor: '#F77EB9',
  menColor: '#7EBCFF',
  childrenColor: '#bbbbbb',
  unknownColor: '#9FB3C7',

  confirmedColor: '#66A4FB',
  curedColor: '#65E0E0',

  deathColor: 'black',

  womenText: 'Femei',
  menText: 'Bărbați',
  childrenText: 'Copii < 18 ani',
  unknownGenderText: 'Necunoscuți',

  magenta: '#F1B8FF',
  red: '#b71c1c',
  orange: '#f57c00',
  yellow: '#fdd835',
  green: '#A4E064',

  dailyRecordsLimit: 14,

  pfizerColor: '#00AFF0',
  modernaColor: '#e31936'
};

export const ApiURL = {
  allData: Constants.api + '/latestData.json',
};
