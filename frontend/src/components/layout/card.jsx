import React from 'react';
import './card.css';

export class Card extends React.PureComponent {
  render() {
    const { title, children } = this.props;

    return (
      <div className="card is-shadowless">
        {title &&
          <header className="card-header">
            <p className="card-header-title is-uppercase">{title}</p>
          </header>}
        <div className="card-content">
          <div className="content">{children}</div>
        </div>
      </div>
    );
  }
}
