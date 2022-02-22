import React from 'react'
import { Card } from '../../layout/card/card'
import { formatDate } from '../../../utils/date'
import { parseCountiesTable } from '../../../utils/parse'
import { Table } from '../../layout/table/Table'

export const EMBED_COUNTIES_TABLE = 'counties-table'

export class CountiesTable extends React.PureComponent {
  render() {
    const { error, lastUpdatedOn, stale, counties } = parseCountiesTable(
      this.props.state
    )
    const headers = [
      { className: '', displayName: 'Județ', name: 'name' },
      {
        className: 'has-text-right',
        displayName: 'Cazuri totale',
        name: 'cases',
      },
      {
        className: 'has-text-right',
        displayName: 'Incidență cumulată',
        name: 'value',
      },
    ]
    return (
      <Card
        error={error}
        title="Incidenta cumulata a cazurilor la nivel județean în ultimele 14 zile la mia de locuitori"
        subtitle={`Ultima actualizare: ${formatDate(lastUpdatedOn)}`}
        embedPath={EMBED_COUNTIES_TABLE}
        isStale={stale}
      >
        <Table headers={headers} data={counties} sortByColumn="value" />
      </Card>
    )
  }
}
