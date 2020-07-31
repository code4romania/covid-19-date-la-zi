export const Constants = {
  api: process.env.REACT_APP_API_URL || "https://datelazi.ro",

  womenColor: "#F77EB9",
  menColor: "#7EBCFF",
  childrenColor: "#bbbbbb",
  unknownColor: "#9FB3C7",

  symptomaticColor: "#F8AF69",
  confirmedColor: "#66A4FB",
  curedColor: "#65E0E0",

  countyLowestColor: "#FFFF66",
  countyHighestColor: "#DC143C",

  deathColor: "black",

  womenText: "Femei",
  menText: "Bărbați",
  childrenText: "Copii < 18 ani",
  unknownGenderText: "Necunoscuți",

  magenta: "#F1B8FF",
  orange: "#FDC862",
  green: "#A4E064",
  grey: "#B2BECE",
  lightblue: "#A5D7FC",

  oldestColor: "#CB466E",
  processingColor: "#FFDE9F",

  dailyRecordsLimit: 14,
};
export const ApiURL = {
  allData: Constants.api + "/latestData.json",
};
