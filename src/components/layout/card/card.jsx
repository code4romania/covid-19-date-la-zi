import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Loader from '../../loader';
import { EmbedButton } from '../embed-button/embed-button';
import './card.css';

export class Card extends React.PureComponent {
  state = {
    viewport: {
      width: 0,
      height: 0,
    },
  };

  componentDidUpdate(prevProps) {
    if (this.props.isLoaded !== prevProps.isLoaded) {
      this.handleLoadedEvent();
    }
  }

  handleLoadedEvent() {
    const node = ReactDOM.findDOMNode(this);

    this.setState({
      viewport: {
        width: node.clientWidth + 5, // + 5 just to make sure no scroll is displayed
        height: node.clientHeight + 5,
      },
    });
  }

  render() {
    const {
      title,
      subtitle,
      children,
      isLoaded,
      error,
      embedPath,
      isStale,
    } = this.props;

    if (error) {
      return (
        <div className="is-error is-block">Nu am putut încărca datele</div>
      );
    }
    return isLoaded ? (
      <div className={`card ${isStale ? 'card--warning' : ''}`}>
        {title && (
          <header className="card-header">
            <div className="card-header-title has-text-weight-normal">
              <h3 className="card-title has-text-weight-bold">{title}</h3>
              {subtitle && <small>{subtitle}</small>}
            </div>
          </header>
        )}
        <div className="card-content">
          <div className="content">{children}</div>
          {embedPath && (
            <EmbedButton path={embedPath} viewPort={this.state.viewport} />
          )}
        </div>
      </div>
    ) : (
      <Loader />
    );
  }
}

Card.propType = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  isLoaded: PropTypes.bool,
  error: PropTypes.string,
  embedPath: PropTypes.string,
  isStale: PropTypes.bool,
};

Card.defaultProps = {
  isStale: false,
};
