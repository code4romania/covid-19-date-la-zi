import roGeoJson from "./roGeo";

export const casesByCounty = roGeoJson.features.map(f => ({
  name: f.properties.name,
  value: Math.round(Math.random() * 1000)
}));
