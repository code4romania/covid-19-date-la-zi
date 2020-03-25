import React from 'react';
import Loader from '../loader';
import './card.css';
import {EmbedButton} from './embed-button';
import ReactDOM from 'react-dom';

export class Card extends React.PureComponent {

  state = {
    viewport: {
      width: 0,
      height: 0
    }
  };

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);

    this.setState({
      viewport: {
        width: node.clientWidth,
        height: node.clientHeight
      }
    });
  }

  render() {
    const { title, children, isLoaded, error, embedPath } = this.props;

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
          {embedPath && <EmbedButton path={embedPath} viewPort={this.state.viewport} />}
        </div>
      </div>
    ): <Loader />;
  }
}
