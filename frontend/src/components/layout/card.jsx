import React from 'react';
import Loader from '../loader';
import './card.css';
import { EmbedButton } from './embed-button';
import { withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';

class CardWrapper extends React.PureComponent {

  state = {
    viewport: {
      width: 0,
      height: 0
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if(this.props.isLoaded !== prevProps.isLoaded) {
      this.handleLoadedEvent();
    }
  }

  handleLoadedEvent() {
    const node = ReactDOM.findDOMNode(this);

    this.setState({
      viewport: {
        width: node.clientWidth + 5, // + 5 just to make sure no scroll is displayed
        height: node.clientHeight + 5
      }
    });
  }

  render() {
    const { title, children, isLoaded, error, embedPath, match } = this.props;
    let isEmbeded = false;

    if (match && match.params) {
      isEmbeded = !!match.params.particularChart;
    }

    if (error) {
      return <div className="is-error is-block">Nu am putut încărca datele</div>
    }

    return isLoaded ? (
      <div className="card is-shadowless">
        {title &&
          <header className="card-header">
            <p className="card-header-title is-uppercase">{title}</p>
          </header>}
        <div className="card-content">
          <div className="content">{children}</div>
          {!isEmbeded && embedPath && <EmbedButton path={embedPath} viewPort={this.state.viewport} />}
        </div>
      </div>
    ): <Loader />;
  }
}

export const Card = withRouter(CardWrapper);
