import React from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { Card } from '../../layout/card/card';
import { Constants } from '../../../config/globals';
import { Tabs } from '../../layout/tabs/tabs';
import { formatDate } from '../../../utils/date';

const VIEW_TABS = [
  {
    label: 'Creștere zilnică',
    value: 'daily',
  },
  { label: 'Creștere cumulativă', value: 'cumulative' },
];
export const EMBED_PATH_VACCINES_PER_DAY = 'doze-pe-zi';
export class VaccinesPerDayCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: VIEW_TABS[0].value,
    };
  }

  getDateRange(records) {
    if (records.dates === undefined) {
      return {};
    }
    const dates = records.dates.filter((x) => !!x);
    return {
      from: dates[0],
      to: dates[dates.length - 1],
    };
  }

  getZoomStartPercentage = (dates) => {
    const datesCount = dates?.length;
    const daysToShow = 14;
    return datesCount ? ((datesCount - daysToShow) * 100) / datesCount : 0;
  };

  getChartOptions(records) {
    const { activeTab } = this.state;
    const {
      dates,
      pfizer,
      moderna,
      astraZeneca
    } = records;
    const labels = ['Pfizer BioNTech', 'Moderna', 'AstraZeneca'];
    const chartType =
      this.state.activeTab === VIEW_TABS[0].value ? 'bar' : 'line';
    const chartStack = chartType === 'bar' ? 'one' : false;
    const zoomStart = this.getZoomStartPercentage(dates);
    const listPfizer = pfizer;
    const listModerna = moderna;
    const listAstraZeneca = astraZeneca;
    const series = [
      listPfizer?.length && {
        data: listPfizer,
        name: labels[0],
        stack: chartStack,
        type: chartType,
        color: Constants.pfizerColor,
      },
      listModerna?.length && {
        data: listModerna,
        name: labels[1],
        stack: chartStack,
        type: chartType,
        color: Constants.modernaColor,
      },
      listAstraZeneca?.length && {
        data: listAstraZeneca,
        name: labels[2],
        stack: chartStack,
        type: chartType,
        color: Constants.astraZenecaColor,
      },
    ];

    return {
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: {
          color: 'gray',
          fontWeight: 'bold',
          rotate: 45,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: 'gray',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          axis: 'x',
        },
      },
      legend: {
        data: labels,
        bottom: 0,
        icon: 'circle',
      },
      grid: {
        left: '1%',
        right: '1%',
        bottom: 80,
        top: 20,
        containLabel: true,
      },
      dataZoom: [
        {
          type: 'slider',
          start: zoomStart,
          end: 100,
          bottom: 50,
        },
      ],
      series: series,
    };
  }

  handleClickTab = (tab) => {
    this.setState({ activeTab: tab.value });
  };

  render() {
    const { activeTab } = this.state;
    const { daily, cumulative } = this.props;
    const records = activeTab === VIEW_TABS[0].value ? daily : cumulative
    const {
      isLoaded,
      isStale,
      error,
      dates,
      lastUpdatedOn,
    } = records;

    return (
      <Card
        isLoaded={isLoaded}
        title="Doze de vaccin administrate pe zile"
        subtitle={`Ultima actualizare: ${formatDate(lastUpdatedOn)}`}
        isStale={isStale}
        error={error}
        embedPath={EMBED_PATH_VACCINES_PER_DAY}
      >
        <ReactEChartsCore
          echarts={echarts}
          lazyUpdate
          style={{
            height: '470px',
            marginBottom: '1rem',
          }}
          option={this.getChartOptions(records)}
          theme="light"
        />
        <Tabs
          tabList={VIEW_TABS}
          activeTab={activeTab}
          onSelect={this.handleClickTab}
        />
        <AccessibillityCasesPerDayTable
          dates={dates}
          listPfizer={records.pfizer}
          listModerna={records.moderna}
          listAstraZeneca={records.astraZeneca}
        />
        <p>
          În cazul vaccinelor Pfizer BioNTech, Moderna și AstraZeneca sunt necesare două doze pentru
          imunizare.
        </p>
      </Card>
    );
  }
}

/*
A table containg the data from cases-per-day-card that is hidden and can be only
accessed by screen readers
*/
const AccessibillityCasesPerDayTable = (props) => {
  /*Putting the data from props inside one single array to use map inside the return function*/
  const records = [];
  for (let i = props.dates.length - 1; i >= 0; i--) {
    if (props.dates[i] === ' ') {
      break;
    }
    // records.push({
    //   date: props.dates[i],
    //   confirmed: props.listConfirmed[i],
    //   cured: props.listCured[i],
    //   deaths: props.listDeaths[i],
    // });
  }
  return (
    <table role="table" style={{ position: 'absolute', left: -99999 }}>
      <tbody>
        <tr role="row">
          <th role="columnheader">Dată</th>
          <th role="columnheader">Confirmaţi</th>
          <th role="columnheader">Vindecaţi</th>
          <th role="columnheader">Decedaţi</th>
        </tr>
        {records.map((record, index) => (
          <tr role="row" key={index}>
            <td role="cell">{record.date}</td>
            <td role="cell">{record.confirmed}</td>
            <td role="cell">{record.cured}</td>
            <td role="cell">{record.deaths}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
