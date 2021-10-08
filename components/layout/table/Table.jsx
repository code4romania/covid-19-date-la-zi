import React from 'react'
import Image from 'next/image'
import styles from './table.module.css'

export const Table = (props) => {
  const { headers, data, sortByColumn } = props
  const limit = 10
  const [page, setPage] = React.useState(0)
  const [sortConfig, setSortConfig] = React.useState({
    key: sortByColumn,
    direction: 'descending',
  })

  let sortedData = [...data]
  sortedData.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1
    }
    return 0
  })

  const requestSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const displayPagination = (list) => {
    const shouldDisplayPagination = list.length > limit
    if (shouldDisplayPagination) {
      return (
        <div className={styles.navigation}>
          <div
            className={'button ' + (page === 0 ? 'hide' : '')}
            onClick={() => changePage(-1, list)}
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
            onClick={() => changePage(1, list)}
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

  const changePage = (inc, list) => {
    if (inc < 0 && page !== 0) {
      setPage(page + inc)
    }

    if (inc > 0 && (page + inc) * limit <= list.length) {
      setPage(page + inc)
    }
  }

  return (
    <div className={styles.table_wrapper}>
      <table
        className={`${styles.table_custom} table is-striped  is-hoverable is-fullwidth`}
      >
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                className={`${header.className} ${styles.tr}`}
                key={index}
                onClick={() => requestSort(header.name)}
                aria-sort={
                  sortConfig.key === header.name ? sortConfig.direction : 'none'
                }
              >
                {header.displayName}
                {sortConfig.key === header.name &&
                  sortConfig.direction === 'ascending' && <span>&#8595;</span>}
                {sortConfig.key === header.name &&
                  sortConfig.direction === 'descending' && <span>&#8593;</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.slice(page * limit, limit * (page + 1)).map((row, i) => (
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

      {displayPagination(data)}
    </div>
  )
}
