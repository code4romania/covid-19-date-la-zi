import React from 'react';
import { SummaryCard } from '../../cards/summary/summary-card';
import { ApiURL } from '../../../config/globals';
import { round } from 'prelude-ls';

// This displays the top row containing the summary stats but grouped into several cards.
// Their management is the same though, using a single API call
export class SummaryRow extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      totalCases: 0,
      monitoredCases: 0,
      hospitalizedCases: 0,
      curedCases: 0,
      icuCases: 0,
      totalCasesHistory: [], // array of ints
      hospitalizedCasesHistory: [], // array of ints
      icuCasesHistory: [], // array of ints
      curedCasesHistory: [], // array of ints
    }
  }

  componentDidMount() {
    fetch(ApiURL.summary)
      .then(res => res.json())
      .then((result) => {
        if (result.error != null) {
          this.setState({error: result.error, isLoaded: true})
          // TODO: handle error
        } else {
          this.parseAPIResponse(result)
        }
      })
  }

  parseAPIResponse(result) {
    const summary = result.totals
    const history = result.history
    const totalCasesHistory = history.map((entry) => { return entry.confirmed })
    const hospitalizedCasesHistory = history.map((entry) => { return entry.hospitalized })
    const icuCasesHistory = history.map((entry) => { return entry.inIcu })
    const curedCasesHistory = history.map((entry) => { return entry.cured })
    this.setState({
      isLoaded: true,
      totalCases: summary.confirmed.toLocaleString(),
      totalCasesHistory: totalCasesHistory,
      hospitalizedCases: summary.hospitalized.toLocaleString(),
      hospitalizedCasesHistory: hospitalizedCasesHistory,
      icuCases: summary.inIcu.toLocaleString(),
      icuCasesHistory: icuCasesHistory,
      curedCases: summary.cured.toLocaleString(),
      curedCasesHistory: curedCasesHistory,
      monitoredCases: summary.monitored.toLocaleString()
    })
  }

  specialValueForTotal() {
    return {
      value: this.state.monitoredCases,
      label: 'monitorizate',
      isGood: true
    }
  };

  specialValueForHospitalized() {
    return {
      value: this.state.curedCases,
      label: 'vindecate',
      isGood: true
    }
  };

  specialValueForCured() {
    const curedPercentage = this.state.totalCases > 0 ? round(100*(this.state.curedCases / this.state.totalCases)) : 0
    return {
      value: curedPercentage + '%',
      label: 'din total',
      isGood: curedPercentage >= 50
    }
  };

  render() {
    const error = this.state.error
    if (error != null) {
      // TODO: handle this gracefully
      return <div className="container cards-row">An error occured: {error}</div>
    } else  {
      return (
        <div className="container cards-row">
          <div className="columns">
            <div className="column">
              <SummaryCard
                to="/"
                title="Cazuri confirmate"
                total={this.state.totalCases}
                special={this.specialValueForTotal()}
                data={this.state.totalCasesHistory}
              />
            </div>
            <div className="column">
              <SummaryCard
                to="/"
                title="Cazuri spitalizate"
                total={this.state.hospitalizedCases}
                special={this.specialValueForHospitalized()}
                data={this.state.hospitalizedCasesHistory}
              />
            </div>
            <div className="column">
              <SummaryCard
                to="/"
                title="Cazuri - terapie intensivă"
                total={this.state.icuCases}
                data={this.state.icuCasesHistory}
              />
            </div>
            <div className="column">
              <SummaryCard
                to="/"
                title="Vindecați"
                total={this.state.curedCases}
                special={this.specialValueForCured()}
                data={this.state.curedCasesHistory}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}
