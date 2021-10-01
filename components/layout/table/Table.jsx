import React from 'react'
import Image from 'next/image'
import styles from './table.module.css'

export class Table extends React.PureComponent {
  state = {
    page: 0,
    limit: 10,
  }

  displayPagination(list) {
    const { limit, page } = this.state
    const shouldDisplayPagination = list.length > limit
    if (shouldDisplayPagination) {
      return (
        <div className={styles.navigation}>
          <div
            className={'button ' + (page === 0 ? 'hide' : '')}
            onClick={() => this.changePage(-1, list)}
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
              ((page + 1) * limit >= list.length ? 'hide' : '')
            }
            onClick={() => this.changePage(1, list)}
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
      )
    }
  }

  changePage(inc, list) {
    const { page, limit } = this.state

    if (inc < 0 && page !== 0) {
      this.setState({ page: page + inc })
    }

    if (inc > 0 && (page + inc) * limit <= list.length) {
      this.setState({ page: page + inc })
    }
  }

  render() {
    const { headers, data } = this.props
    const { page, limit } = this.state
    return (
      <div className={styles.table_wrapper}>
        <table
          className={`${styles.table_custom} table is-striped  is-hoverable is-fullwidth`}
        >
          <thead>
            <tr className={styles.tr}>
              {headers.map((header, index) => (
                <th className={header.className} key={index}>
                  {header.displayName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(page * limit, limit * (page + 1)).map((row, i) => (
              <tr key={i}>
                {headers.map((header, j) => (
                  <td className={header.className} key={`${i}${j}`}>
                    {row[header.name]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {this.displayPagination(data)}
      </div>
    )
  }
}
