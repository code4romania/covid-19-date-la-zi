import React from 'react';
import PropTypes from 'prop-types';
import { EmbedButton } from '../embed-button/embed-button';
import styles from './card.module.css';

export class Card extends React.PureComponent {
  render() {
    const {
      title,
      subtitle,
      children,
      error,
      embedPath,
      isStale,
    } = this.props;

    if (error) {
      return (
        <div className={`${styles.is_error} is-block`}>Nu am putut încărca datele</div>
      );
    }
    return (
      <div className={`${styles.card} ${isStale ? styles.card__warning : ''}`}>
        {title && (
          <header className={styles.card_header}>
            <div className={`${styles.card_header_title} card-header-title has-text-weight-normal`}>
              <h2 className="has-text-weight-bold">{title}</h2>
              {subtitle && <small>{subtitle}</small>}
            </div>
          </header>
        )}
        <div className={`card-content ${isStale ? styles.card__warning_content : ''}`}>
          <div className="content">{children}</div>
          {embedPath && (
            <EmbedButton path={embedPath}/>
          )}
        </div>
      </div>
    )
  }
}

Card.propType = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  embedPath: PropTypes.string,
  isStale: PropTypes.bool,
};

Card.defaultProps = {
  isStale: false,
};
