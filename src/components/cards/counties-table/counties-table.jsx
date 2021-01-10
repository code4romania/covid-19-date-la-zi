import React from 'react';
import ChevronImageLeft from './../../../images/chevrons-left.svg';
import ChevronImageRight from './../../../images/chevrons-right.svg';
import './counties-table.css';
import { Card } from '../../layout/card/card';
import { formatDate } from '../../../utils/date';

export const EMBED_COUNTIES_TABLE = 'counties-table';

export class CountiesTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      limit: 10,
      isLoaded: false,
      error: null,
      counties: [],
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
            <td className="has-text-right">{row.countyInfectionsNumbers}</td>
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
            onClick={(e) => this.changePage(-1)}
          >
            <img
              src={ChevronImageLeft}
              className="navigation-chevron"
              alt="Pagina anterioară"
              width="24"
              height="24"
            />
          </div>
          <div
            className={
              'button right ' +
              ((page + 1) * limit >= counties.length ? 'hide' : '')
            }
            onClick={(e) => this.changePage(1)}
          >
            <img
              src={ChevronImageRight}
              className="navigation-chevron"
              alt="Pagina următoare"
              width="24"
              height="24"
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
    const { isLoaded, error, lastUpdatedOn, stale, counties } = this.state;
    const cloneOfCounties = [...counties].sort(
      (a, b) => parseInt(b.value, 10) - parseInt(a.value, 10)
    );
    return (
      <Card
        error={error}
        isLoaded={isLoaded}
        title="Incidenta cumulata a cazurilor la nivel județean în ultimele 14 zile la mia de locuitori"
        subtitle={`Ultima actualizare: ${formatDate(lastUpdatedOn)}`}
        embedPath={EMBED_COUNTIES_TABLE}
        isStale={stale}
      >
        <div className="perDayTable">
          <table>
            <thead>
              <tr>
                <th>Județ</th>
                <th className="has-text-right">Cazuri totale</th>
                <th className="has-text-right">Incidență cumulată</th>
              </tr>
            </thead>
            <tbody>
              {cloneOfCounties && this.displayTable(cloneOfCounties)}
            </tbody>
          </table>

          {this.displayPagination()}
        </div>
      </Card>
    );
  }
}
