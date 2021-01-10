import { registerTheme } from 'echarts';

export const SUMMARY_CHART_THEME = 'summary chart';

function axisCommon() {
  return {
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    splitArea: {
      show: false,
    },
  };
}

let summaryChartTheme = {
  timeAxis: axisCommon(),
  logAxis: axisCommon(),
  valueAxis: axisCommon(),
  categoryAxis: axisCommon(),
  line: {
    symbol: 'none',
    lineStyle: {
      color: '#9FB3C7',
      width: '2',
      type: 'solid',
    },
    areaStyle: {},
  },
  color: {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 0.8,
    colorStops: [
      {
        offset: 0,
        color: '#9FB3C7',
      },
      {
        offset: 1,
        color: 'rgba(128, 128, 128, 0)',
      },
    ],
    global: false,
  },
  grid: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
};

registerTheme(SUMMARY_CHART_THEME, summaryChartTheme);
