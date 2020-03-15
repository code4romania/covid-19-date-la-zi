import React from 'react';
import { PageHeader } from '../layout/page.header';

export class AboutPage extends React.PureComponent {
  render() {
    return (
      <section className="section">
        <div className="container cards-row">
          <PageHeader
            title="Despre Proiect"
            subtitle="Some Lorem ipsum about Date La Zi dolor sit amet, consectetur adipiscing elit. Elit,
            duis pretium. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit, duis pretium.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit, duis pretium."
          />
        </div>
        <div className="container">
          <p>
                Some More Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit, duis pretium.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Elit, duis pretium.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit, duis pretium.
                Some More Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Elit, duis pretium. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Elit, duis pretium.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Elit, duis pretium.
          </p>
          <p>
                Some More Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit, duis pretium.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit, duis pretium.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit, duis pretium.
          </p>
        </div>
      </section>
    );
  }
}
