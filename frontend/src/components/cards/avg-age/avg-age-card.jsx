import * as React from 'react';
import {Card} from '../../layout/card';
import './avg-age-card.css';

export const EMBED_PATH_AVERAGE_AGE = 'varsta-medie';
export class AverageAgeCard extends React.PureComponent {

  render() {
    const { state } = this.props
    return (
      <Card isLoaded={state.isLoaded} error={state.error} title="Vârsta medie" embedPath={EMBED_PATH_AVERAGE_AGE}>
        <div>
          <div className="circle">
            <span className="value">{state.averageAge}</span>
          </div>
        </div>
      </Card>
    );
  }

}
