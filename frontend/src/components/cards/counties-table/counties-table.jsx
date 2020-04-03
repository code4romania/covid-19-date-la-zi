import React from 'react';
import { mnemonics } from '../../../config/mnemonics';
import { Card } from '../../layout/card/card';

export const EMBED_COUNTIES_TABLE = 'counties-table';

export class CountiesTable extends React.PureComponent {
  render() {
    const state = this.props.state;
    const { isLoaded, error, topCounties, stale } = state;
    return (
      <Card
        error={error}
        isLoaded={isLoaded}
        title="Cazuri confirmate pe judete"
        isStale={stale}
        embedPath={EMBED_COUNTIES_TABLE}
      >
        <table className="table">
          <tbody>
            {topCounties &&
              topCounties.map(county => (
                <tr key={county.name}>
                  <td>{mnemonics[county.name]}</td>
                  <td className="has-text-right">{county.value}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Card>
    );
  }
}
