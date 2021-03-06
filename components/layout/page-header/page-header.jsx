import React from 'react';
import styles from './page-header.module.css';

export class PageHeader extends React.PureComponent {
  render() {
    const { title, subtitle } = this.props;

    return (
      <div className={styles.page_header}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    );
  }
}
