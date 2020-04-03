import React from 'react';
import ChevronImageLeft from './../../../images/chevrons-left.svg';
import ChevronImageRight from './../../../images/chevrons-right.svg';
import './counties-table.css';
import { Card } from '../../layout/card/card';

export const EMBED_COUNTIES_TABLE = 'counties-table';

export class CountiesTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      limit: 10,
      isLoaded: false,
      error: null,
      counties: []
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.props !== newProps) {
      const { state } = newProps;
      this.setState({ ...state });
    }
  }

  displayTable(counties) {
    const { page, limit } = this.state;

    return counties
      .slice(page * limit, limit * (page + 1))
      .map((row, index) => {
        return (
          <tr key={`dailyTable${index}`}>
            <td>{row.name}</td>
            <td className="has-text-right">{row.numberInfected}</td>
            <td className="has-text-right">{row.value}</td>
          </tr>
        );
      });
  }

  displayPagination() {
    if (!this.state.counties) {
      return null;
    }

    const { counties, limit, page } = this.state;
    const shouldDisplayPagination = counties.length > limit;

    if (shouldDisplayPagination) {
      return (
        <div className="navigation">
          <div
            className={'button ' + (page === 0 ? 'hide' : '')}
            onClick={e => this.changePage(-1)}
          >
            <img
              src={ChevronImageLeft}
              className="navigation-chevron"
              alt="Pagina anterioara"
            />
          </div>
          <div
            className={
              'button right ' +
              ((page + 1) * limit >= counties.length ? 'hide' : '')
            }
            onClick={e => this.changePage(1)}
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

  changePage(inc) {
    const { page, counties, limit } = this.state;

    if (inc < 0 && page !== 0) {
      this.setState({ page: page + inc });
    }

    if (inc > 0 && (page + inc) * limit <= counties.length) {
      this.setState({ page: page + inc });
    }
  }

  render() {
    const {
      isLoaded,
      error,
      lastUpdatedOnString,
      stale,
      counties
    } = this.state;
    return (
      <Card
        error={error}
        isLoaded={isLoaded}
        title="Cazuri confirmate pe judet"
        subtitle={`Ultima actualizare: ${lastUpdatedOnString}`}
        embedPath={EMBED_COUNTIES_TABLE}
        isStale={stale}
      >
        <div className="perDayTable">
          <table>
            <thead>
              <tr>
                <th>Județ</th>
                <th className="has-text-right">Cazuri per județ</th>
                <th className="has-text-right">Cazuri la mia de locuitori</th>
              </tr>
            </thead>
            <tbody>{counties && this.displayTable(counties)}</tbody>
          </table>

          {this.displayPagination()}
        </div>
      </Card>
    );
  }
}
