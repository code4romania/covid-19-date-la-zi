import React from 'react';
import { Card } from '../../layout/card/card';
import ChevronImageLeft from './../../../images/chevrons-left.svg';
import ChevronImageRight from './../../../images/chevrons-right.svg';
import './perday-table.css';

export class PerDayTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      limit: 10,
      isLoaded: false,
      error: null,
      data: []
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.props !== newProps) {
      const { state } = newProps;
      this.setState({ ...state });
    }
  }

  displayTable(data) {
    const { page, limit } = this.state;

    return data.slice(page * limit, limit * (page + 1)).map((row, index) => {
      const publishedDate = new Date(row['datePublishedString']);

      return (
        <tr key={`dailyTable${index}`}>
          <td>{`${publishedDate.getDate()}/${publishedDate.getMonth() +
            1}`}
          </td>
          <td>{row['infected']}</td>
          <td>{row['cured']}</td>
          <td>{row['deaths']}</td>
        </tr>
      );
    });
  }

  displayPagination() {
    if (!this.state.data) {
      return null;
    }

    const { data, limit, page } = this.state;
    const shouldDisplayPagination = data.length > limit;

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
              ((page + 1) * limit >= data.length ? 'hide' : '')
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
    const { page, data, limit } = this.state;

    if (inc < 0 && page !== 0) {
      this.setState({ page: page + inc });
    }

    if (inc > 0 && (page + inc) * limit <= data.length) {
      this.setState({ page: this.state.page + inc });
    }
  }

  render() {
    const { isLoaded, error, lastUpdatedOnString, isStale } = this.state;
    return (
      <Card
        error={error}
        isLoaded={isLoaded}
        title="Date zilnice"
        subtitle={`Ultima actualizare: ${lastUpdatedOnString}`}
        isStale={isStale}
      >
        <div className="perDayTable">
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Infectati</th>
                <th>Vindecati</th>
                <th>Decedati</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data && this.displayTable(this.state.data)}
            </tbody>
          </table>

          {this.displayPagination()}
        </div>
      </Card>
    );
  }
}
