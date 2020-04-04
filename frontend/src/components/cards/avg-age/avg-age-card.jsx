import * as React from 'react';
import { Card } from '../../layout/card/card';
import './avg-age-card.css';
import { formatDate } from '../../../utils/date';

export const EMBED_PATH_AVERAGE_AGE = 'varsta-medie';
export class AverageAgeCard extends React.PureComponent {
  render() {
    const { state, title } = this.props;
    const { isLoaded, error, lastUpdatedOnString, averageAge, stale } = state;
    return (
      <Card
        isLoaded={isLoaded}
        error={error}
        title={title}
        subtitle={`Ultima actualizare: ${formatDate(lastUpdatedOnString)}`}
        isStale={stale}
        embedPath={EMBED_PATH_AVERAGE_AGE}
      >
        <div className="circle">
          <span className="value">{averageAge}</span>
        </div>
      </Card>
    );
  }
}
