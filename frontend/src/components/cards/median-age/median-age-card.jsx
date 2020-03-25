import * as React from 'react';
import {ApiURL} from '../../../config/globals';
import {Card} from '../../layout/card';
import './median-age-card.css';

export class MedianAgeCard extends React.PureComponent {

  state = {
    error: null,
    isLoaded: false,
    value: 0
  };

  componentDidMount() {
    fetch(ApiURL.dailyStats)
      .then(res => res.json())
      .then(result => {
        if (result.error != null) {
          this.setState({ error: result.error, isLoaded: true });
        } else {
          this.parseAPIResponse(result);
        }
      })
      .catch(error => {
        this.setState({ error: error, isLoaded: true });
      });
  }

  parseAPIResponse(result) {
    const value = result.currentDay.averageAge;
    this.setState({
      ...this.state,
      value,
      isLoaded: true
    });
  }

  getChartOptions() {

  }

  render() {
    return (
      <Card isLoaded={this.state.isLoaded} error={this.state.error} title="Vârsta medie">
        <div>
          <div className="circle">
            <span className="value">{this.state.value}</span>
          </div>
        </div>
      </Card>
    );
  }

}
