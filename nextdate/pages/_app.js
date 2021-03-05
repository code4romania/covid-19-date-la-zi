import * as echarts from "echarts/core";
import "@code4ro/taskforce-fe-components/dist/index.css";
import { LineChart, BarChart, PieChart, MapChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  DataZoomComponent,
  LegendPlainComponent,
  VisualMapComponent,
} from "echarts/components";
import { SVGRenderer } from "echarts/renderers";
import "./../styles/index.scss";
import roGeoJson from "./../config/roGeo.json";

// Register the required components
echarts.use([
  LineChart,
  BarChart,
  PieChart,
  MapChart,
  GridComponent,
  TooltipComponent,
  DataZoomComponent,
  LegendPlainComponent,
  VisualMapComponent,
  SVGRenderer,
]);
echarts.registerMap("RO", roGeoJson);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
