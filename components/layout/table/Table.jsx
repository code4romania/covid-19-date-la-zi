import React from 'react'
import Image from 'next/image'
import styles from './table.module.css'

export const Table = (props) => {
  const { headers, data, sortByColumn, filterByKey } = props
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

  const [filterString, setFilterString] = React.useState('')
  React.useEffect(() => {
    setPage(0)
  }, [filterString])

  //filter sortedData
  if (filterByKey && filterString) {
    //replace diacritics with regular chars
    const normFilter = filterString
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
    sortedData = sortedData.filter((row) => {
      if (row[filterByKey]) {
        //replace diacritics with regular chars
        const normKey = row[filterByKey]
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
        //tests if selected filter includes the search string, case insensitive
        return new RegExp(normFilter, 'i').test(normKey)
      }
    })
  }

  const displayFilterInput = () => {
    if (filterByKey) {
      return (
        <div className={`controll ${styles.filter}`}>
          <button
            className={
              `button ${styles.cancelButton} ` + (filterString ? '' : 'hide')
            }
            title="Anuleaza filtrarea"
            onClick={() => setFilterString('')}
          >
            &#10006;
          </button>
          <input
            className={`input  ${styles.input}`}
            type="text"
            value={filterString}
            placeholder={`Filtrează după ${filterByKey}`}
            title={`Filtrează după ${filterByKey}`}
            onChange={(e) => setFilterString(e.target.value)}
            onKeyUp={(e) => e.code === 'Escape' && setFilterString('')}
          />
        </div>
      )
    }
  }

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
      {displayFilterInput()}
    </div>
  )
}
