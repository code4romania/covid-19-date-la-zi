import React from 'react'
import { Card } from '../../layout/card/card'
import { Table } from '../../layout/table/Table'
import { formatDate } from '../../../utils/date'
import { parseSmallCitiesIncidentsTable } from '../../../utils/parse'

export const EMBED_SMALL_CITIES_INCIDENTS_TABLE = 'small-cities-incidents-table'

export class SmallCitiesIncidentsTable extends React.PureComponent {
  render() {
    const { error, lastUpdatedOn, stale, data } =
      parseSmallCitiesIncidentsTable(this.props.state)

    const headers = [
      { className: '', displayName: 'Județ', name: 'judet' },
      {
        className: '',
        displayName: 'Localitate',
        name: 'localitate',
      },
      {
        className: 'has-text-right',
        displayName: 'Populație',
        name: 'populatie',
      },
      { className: 'has-text-right', displayName: 'Cazuri', name: 'cazuri' },
      {
        className: 'has-text-right',
        displayName: 'Incidență',
        name: 'incidenta',
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
        <Table headers={headers} data={data} sortByColumn="incidenta" />
      </Card>
    )
  }
}
