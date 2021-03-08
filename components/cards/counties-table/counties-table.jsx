import React from 'react';
import Image from 'next/image'
import styles from './counties-table.module.css';
import { Card } from '../../layout/card/card';
import { formatDate } from '../../../utils/date';
import { parseCountiesTable } from '../../../utils/parse';

export const EMBED_COUNTIES_TABLE = 'counties-table';

export class CountiesTable extends React.PureComponent {
  state = {
    page: 0,
    limit: 10,
  };

  displayTable(counties) {
    const { page, limit } = this.state;

    return counties
      .slice(page * limit, limit * (page + 1))
      .map((row, index) => (
          <tr key={`dailyTable${index}`}>
            <td className={styles.td}>{row.name}</td>
            <td className="has-text-right">{row.countyInfectionsNumbers}</td>
            <td className="has-text-right">{row.value}</td>
          </tr>
        )
      );
  }

  displayPagination(counties) {
    const { limit, page } = this.state;
    const shouldDisplayPagination = counties.length > limit;
    if (shouldDisplayPagination) {
      return (
        <div className={styles.navigation}>
          <div
            className={'button ' + (page === 0 ? 'hide' : '')}
            onClick={(e) => this.changePage(-1, counties)}
          >
            <Image
              src="/images/chevrons-left.svg"
              className={styles.navigation_chevron}
              alt="Pagina anterioară"
              width={24}
              height={24}
            />
          </div>
          <div
            className={
              'button right ' +
              ((page + 1) * limit >= counties.length ? 'hide' : '')
            }
            onClick={(e) => this.changePage(1, counties)}
          >
            <Image
              src="/images/chevrons-right.svg"
              className={styles.navigation_chevron}
              alt="Pagina următoare"
              width={24}
              height={24}
            />
          </div>
        </div>
      );
    }
  }

  changePage(inc, counties) {
    const { page, limit } = this.state;

    if (inc < 0 && page !== 0) {
      this.setState({ page: page + inc });
    }

    if (inc > 0 && (page + inc) * limit <= counties.length) {
      this.setState({ page: page + inc });
    }
  }

  render() {
    const { error, lastUpdatedOn, stale, counties} = parseCountiesTable(this.props.state);
    const sortedCounties = counties.sort(
      (a, b) => parseInt(b.value, 10) - parseInt(a.value, 10)
    );
    
    return (
      <Card
        error={error}
        title="Incidenta cumulata a cazurilor la nivel județean în ultimele 14 zile la mia de locuitori"
        subtitle={`Ultima actualizare: ${formatDate(lastUpdatedOn)}`}
        embedPath={EMBED_COUNTIES_TABLE}
        isStale={stale}
      >
        <div className={styles.per_day_table}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tr}>
                <th>Județ</th>
                <th className="has-text-right">Cazuri totale</th>
                <th className="has-text-right">Incidență cumulată</th>
              </tr>
            </thead>
            <tbody>
              {sortedCounties && this.displayTable(sortedCounties)}
            </tbody>
          </table>

          {this.displayPagination(sortedCounties)}
        </div>
      </Card>
    );
  }
}
