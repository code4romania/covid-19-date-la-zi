import React from 'react'
import { Card } from '../../layout/card/card'
import { formatDate } from '../../../utils/date'
import { parseCitiesTable } from '../../../utils/parse'
import { Table } from '../../layout/table/Table'

export const EMBED_LARGE_CITIES_INCIDENTS_TABLE = 'large-cities-incidents-table'

export class LargeCitiesIncidentsTable extends React.PureComponent {
  render() {
    const { error, lastUpdatedOn, stale, data } = parseCitiesTable(this.props.state, 'largeCities')

    const headers = [
      { className: '', displayName: 'Județ', name: 'county' },
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
      { className: 'has-text-right', displayName: 'Cazuri', name: 'cazuri' },
      {
        className: 'has-text-right',
        displayName: 'Incidență',
        name: 'incidence',
      },
    ]
    return (
      <Card
        error={error}
        title="Lista orașelor cu incidența mai mare sau egală cu 3/1000 de locuitori"
        subtitle={`Ultima actualizare: ${formatDate(lastUpdatedOn)}`}
        embedPath={EMBED_LARGE_CITIES_INCIDENTS_TABLE}
        isStale={stale}
      >
        <Table headers={headers} data={data} sortByColumn="incidence" />
      </Card>
    )
  }
}
