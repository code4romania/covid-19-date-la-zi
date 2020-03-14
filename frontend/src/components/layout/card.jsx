import React from 'react';

export class Card extends React.PureComponent {
  render() {
    const { title, children } = this.props;

    return (
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">{title}</p>
        </header>
        <div className="card-content">
          <div className="content">{children}</div>
        </div>
      </div>
    );
  }
}
