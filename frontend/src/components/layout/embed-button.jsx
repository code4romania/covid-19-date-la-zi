import * as React from 'react';
import './embed-button.css';

export class EmbedButton extends React.PureComponent {

  state = {showTooltip: false};

  copyEmbedCode() {
    const {path} = this.props;
    const result = `<iframe src="http://localhost:3000/${path} />`;

    navigator.clipboard.writeText(result).then(() => {
      console.log('show');

      this.setState({
        showTooltip: true
      });
      setTimeout(() => this.setState({showTooltip: false}), 2000);
    });

  }

  render() {
    const visibilityClass = this.state.showTooltip ? 'visible' : 'invisible';
    return (
      <div className="fab-action">
        <div className="tooltip">
          <img src="/images/favicon/embed.png" alt="embed" className="fab-icon" onClick={() => this.copyEmbedCode()} />

          <div className={`tooltip-text ${visibilityClass}`}>
            <p>Textul a fost copiat în memoria clipboard.</p>
          </div>
        </div>
      </div>
    );
  }
}
