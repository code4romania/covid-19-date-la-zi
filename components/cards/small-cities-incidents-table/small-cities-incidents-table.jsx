import React from 'react'
import { Card } from '../../layout/card/card'
import { Table } from '../../layout/table/Table'
import { formatDate } from '../../../utils/date'
import { parseCitiesTable } from '../../../utils/parse'

export const EMBED_SMALL_CITIES_INCIDENTS_TABLE = 'small-cities-incidents-table'

export class SmallCitiesIncidentsTable extends React.PureComponent {
  render() {
    const { error, lastUpdatedOn, stale, data } = parseCitiesTable(this.props.state, 'smallCities')

    const headers = [
      {
        className: '',
        displayName: 'Județ',
        name: 'county',
      },
      {
        className: '',
        displayName: 'Localitate',
        name: 'city',
      },
      {
        className: 'has-text-right',
        displayName: 'Populație',
        name: 'population',
      },
      {
        className: 'has-text-right',
        displayName: 'Cazuri',
        name: 'cases',
      },
      {
        className: 'has-text-right',
        displayName: 'Incidență',
        name: 'incidence',
      },
    ]

    return (
      <Card
        error={error}
        title="Lista comunelor cu incidența mai mare sau egală cu 3/1000 de locuitori"
        subtitle={`Ultima actualizare: ${formatDate(lastUpdatedOn)}`}
        embedPath={EMBED_SMALL_CITIES_INCIDENTS_TABLE}
        isStale={stale}
      >
        <Table headers={headers} data={data} sortByColumn="incidence" />
      </Card>
    )
  }
}
