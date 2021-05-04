export const Constants = {
  api: process.env.NEXT_PUBLIC_API_URL,
  shareableLink: 'https://datelazi.ro',
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

  pfizerColor: '#0C7BDC',
  modernaColor: '#FEC20B',
  astraZenecaColor: '#e66100',
  johnsonAndJohnsonColor: '#40B0A6',
}

export const ApiURL = {
  allData: Constants.api + '/latestData.json',
  smallData: Constants.api + '/smallData.json',
}
