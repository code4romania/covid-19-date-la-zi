import React from 'react';
import './page-header.module.css';

export class PageHeader extends React.PureComponent {
  render() {
    const { title, subtitle } = this.props;

    return (
      <div className="page-header">
        {title && <h1 className="title">{title}</h1>}
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </div>
    );
  }
}
