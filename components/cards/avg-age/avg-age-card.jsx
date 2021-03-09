import React from 'react';
import { Card } from '../../layout/card/card';
import styles from './avg-age-card.module.css';
import { formatDate } from '../../../utils/date';
import { parseAverageAge } from '../../../utils/parse';

export const EMBED_PATH_AVERAGE_AGE = 'varsta-medie';
export class AverageAgeCard extends React.PureComponent {
  render() {
    const { state, title } = this.props;
    const { error, lastUpdatedOn, averageAge, stale } = parseAverageAge(state);
    return (
      <Card
        error={error}
        title={title}
        subtitle={`Ultima actualizare: ${formatDate(lastUpdatedOn)}`}
        isStale={stale}
        embedPath={EMBED_PATH_AVERAGE_AGE}
      >
        <div className={styles.circle}>
          <span className={styles.value}>{averageAge}</span>
        </div>
      </Card>
    );
  }
}
