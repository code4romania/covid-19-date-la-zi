import * as React from 'react';
import {Card} from '../../layout/card';
import './avg-age-card.css';

export class AverageAgeCard extends React.PureComponent {

  render() {
    const { state } = this.props
    return (
      <Card isLoaded={state.isLoaded} error={state.error} title="Vârsta medie">
        <div>
          <div className="circle">
            <span className="value">{state.averageAge}</span>
          </div>
        </div>
      </Card>
    );
  }

}
