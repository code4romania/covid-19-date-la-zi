import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { formatShortDate } from '../../../utils/date';
import ChevronImageLeft from './../../../images/chevrons-left.svg';
import ChevronImageRight from './../../../images/chevrons-right.svg';
import { Card } from '../../layout/card/card';
import { Constants } from '../../../config/globals';

export const EMBED_PATH_CASES_PER_DAY = 'cazuri-pe-zi';
export class CasesPerDayCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      limit: Constants.dailyRecordsLimit,
    };
  }

  getPage(array, defaultEmptyValue) {
    const { page, limit } = this.state;
    if (array !== undefined && limit > 0) {
      const start = array.length - page * limit;
      if (start < 0) {
        let pad = new Array(0 - start).fill(defaultEmptyValue || 0);
        return pad.concat(array.slice(0, limit + start));
      } else {
        return array.slice(start, start + limit);
      }
    } else {
      return array;
    }
  }

  gotoPreviousPage() {
    let state = this.state;
    state.page += 1;
    this.setState(state);
    this.forceUpdate();
  }

  gotoNextPage() {
    let state = this.state;
    state.page -= 1;
    this.setState(state);
    this.forceUpdate();
  }

  displayPagination(records, isLoaded) {
    const { page, limit } = this.state;

    if (isLoaded) {
      return (
        <div className="navigation">
          <div
            className={
              'button ' + (records.length - page * limit < 0 ? 'hide' : '')
            }
            onClick={(e) => this.gotoPreviousPage()}
          >
            <img
              src={ChevronImageLeft}
              className="navigation-chevron"
              alt="Pagina anterioara"
            />
          </div>
          <div
            className={'button right ' + (page === 1 ? 'hide' : '')}
            onClick={(e) => this.gotoNextPage()}
          >
            <img
              src={ChevronImageRight}
              className="navigation-chevron"
              alt="Pagina urmatoare"
            />
          </div>
        </div>
      );
    }
  }

  getDateRange(records) {
    if (records.dates === undefined) {
      return {};
    }
    const dates = this.getPage(records.dates, null).filter((x) => !!x);
    return {
      from: formatShortDate(dates[0]),
      to: formatShortDate(dates[dates.length - 1]),
    };
  }

  getChartOptions(records) {
    const dates = this.getPage(records.dates, ' ');
    const listConfirmed = this.getPage(records.confirmedCasesHistory);
    const listCured = this.getPage(records.curedCasesHistory);
    const listDeaths = this.getPage(records.deathCasesHistory);

    const labels = ['Confirmați', 'Vindecați', 'Decedaţi'];
    return {
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: {
          color: 'gray',
          fontWeight: 'bold',
          rotate: 45,
          interval: 0,
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
        formatter: function (params, ticket, callback) {
          const confirmed = params[0];
          const cured = params[1];
          const deaths = params[2];

          if (confirmed.axisValue === ' ') {
            return null;
          } else {
            return (
              '<h4 style="color: white">' +
              confirmed.axisValue +
              '</h4><span>' +
              deaths.seriesName +
              ': ' +
              deaths.value +
              '<br />' +
              cured.seriesName +
              ': ' +
              cured.value +
              '<br />' +
              confirmed.seriesName +
              ': ' +
              confirmed.value +
              '</span>'
            );
          }
        },
        // formatter:
        //   '<h4 style="color: white">{b}</h4><span>{a2}: {c2}<br />{a1}: {c1}<br />{a0}: {c0}</span>'
      },
      legend: {
        data: labels,
        bottom: '0px',
        icon: 'circle',
      },
      grid: {
        left: '1%',
        right: 0,
        bottom: '20px',
        top: '20px',
        containLabel: true,
      },
      series: [
        {
          data: listConfirmed,
          name: labels[0],
          stack: 'one',
          type: 'bar',
          color: Constants.confirmedColor,
        },
        {
          data: listCured,
          name: labels[1],
          stack: 'one',
          type: 'bar',
          color: Constants.curedColor,
        },
        {
          data: listDeaths,
          name: labels[2],
          stack: 'one',
          type: 'bar',
          color: Constants.deathColor,
        },
      ],
    };
  }

  render() {
    const records = this.props.state;
    const { isLoaded, error, isStale } = records;
    const { from, to } = this.getDateRange(records);
    return (
      <Card
        isLoaded={isLoaded}
        title="Număr de cazuri pe zile"
        subtitle={`De la ${from} pana la ${to}`}
        isStale={isStale}
        error={error}
        embedPath={EMBED_PATH_CASES_PER_DAY}
      >
        <ReactEcharts
          style={{
            height: '470px',
            width: '100%',
          }}
          option={this.getChartOptions(records)}
          theme="light"
        />
        <AccessibillityCasesPerDayTable
          dates={this.getPage(records.dates, ' ')}
          listConfirmed={this.getPage(records.confirmedCasesHistory)}
          listCured={this.getPage(records.curedCasesHistory)}
          listDeaths={this.getPage(records.deathCasesHistory)}
        />
        {this.displayPagination(records.dates, isLoaded)}
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
    records.push({
      date: props.dates[i],
      confirmed: props.listConfirmed[i],
      cured: props.listCured[i],
      deaths: props.listDeaths[i],
    });
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
