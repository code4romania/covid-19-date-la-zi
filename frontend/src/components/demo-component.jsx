import React from 'react'

export class DemoComponent extends React.PureComponent {
  render() {
    const {title, subtitle} = this.props;

    return (
      <section className="section">
        <div className="container">
          <h1 className="title">{title}</h1>
          <p className="subtitle">{subtitle}</p>
        </div>
      </section>
    )
  }
}
