import React from 'react'
import { Card } from '../../layout/card/card'
import { formatDate } from '../../../utils/date'
import { parseLargeCitiesIncidentsTable } from '../../../utils/parse'
import { Table } from '../../layout/table/Table'

export const EMBED_LARGE_CITIES_INCIDENTS_TABLE = 'large-cities-incidents-table'

export class LargeCitiesIncidentsTable extends React.PureComponent {
  render() {
    const { error, lastUpdatedOn, stale, data } =
      parseLargeCitiesIncidentsTable(this.props.state)

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
        title="Lista orașelor cu incidența mai mare sau egală cu 3/1000 de locuitori"
        subtitle={`Ultima actualizare: ${formatDate(lastUpdatedOn)}`}
        embedPath={EMBED_LARGE_CITIES_INCIDENTS_TABLE}
        isStale={stale}
      >
        <Table headers={headers} data={data} sortByColumn="incidenta" filterByKey="localitate"/>
      </Card>
    )
  }
}
