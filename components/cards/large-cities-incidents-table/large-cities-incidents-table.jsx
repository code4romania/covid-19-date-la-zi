import React from 'react'
import { Card } from '../../layout/card/card'
import { formatDate } from '../../../utils/date'
import { parseLargeCitiesIncidentsTable } from '../../../utils/parse'
import { Table } from '../../layout/table/Table'

export const EMBED_LARGE_CITIES_INCIDENTS_TABLE = 'large-cities-incidents-table'

export class LargeCitiesIncidentsTable extends React.PureComponent {
  render() {
    const {
      error,
      lastUpdatedOn,
      stale,
      data,
    } = parseLargeCitiesIncidentsTable(this.props.state)
    const headers = [
      { className: '', displayName: 'Cazuri', name: 'Cazuri' },
      {
        className: 'has-text-right',
        displayName: 'Incidență',
        name: 'Incidență',
      },
      { className: 'has-text-right', displayName: 'Județ', name: 'Județ' },
      {
        className: 'has-text-right',
        displayName: 'Localitate',
        name: 'Localitate',
      },
      { className: 'has-text-right', displayName: 'Nr. crt', name: 'Nr.crt.' },
      {
        className: 'has-text-right',
        displayName: 'Populație',
        name: 'Populație',
      },
    ]
    return (
      <Card
        error={error}
        title="Localitati"
        subtitle={`Ultima actualizare: ${formatDate(lastUpdatedOn)}`}
        embedPath={EMBED_LARGE_CITIES_INCIDENTS_TABLE}
        isStale={stale}
      >
        <Table headers={headers} data={data} />
      </Card>
    )
  }
}
