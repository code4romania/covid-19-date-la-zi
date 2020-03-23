import React from 'react';
import Loader from "../loader";
import './card.css';

export class Card extends React.PureComponent {
  render() {
    const { title, children, loading, error } = this.props;

    if (error) {
      return <div className="is-error is-block">Nu am putut încărca datele</div>
    }

    return loading ? (
      <div className="card is-shadowless">
        {title &&
          <header className="card-header">
            <p className="card-header-title is-uppercase">{title}</p>
          </header>}
        <div className="card-content">
          <div className="content">{children}</div>
        </div>
      </div>
    ): <Loader />;
  }
}
