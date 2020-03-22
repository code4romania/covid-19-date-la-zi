import React from 'react';
import { SummaryCard } from '../../cards/summary/summary-card';
import { Card } from '../../layout/card';
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
      .catch((error) => {
        this.setState({error: error, isLoaded: true})
      })
  }

  parseAPIResponse(result) {
    const summary = result.totals
    const history = result.history
    const deathCasesHistory = history.map((entry) => { return entry.deaths || 0 })
    const totalCasesHistory = history.map((entry) => { return entry.confirmed || 0 })
    const hospitalizedCasesHistory = history.map((entry) => { return entry.hospitalized || 0 })
    const icuCasesHistory = history.map((entry) => { return entry.in_icu || 0 })
    const curedCasesHistory = history.map((entry) => { return entry.cured || 0 })
    const confirmed = summary.confirmed || 0
    const hospitalized = summary.hospitalized || 0
    const in_icu = summary.in_icu || 0
    const cured = summary.cured || 0
    const monitored = summary.monitored || 0
    const in_quarantine = summary.in_quarantine || 0
    const deaths = summary.deaths || 0
    this.setState({
      isLoaded: true,
      totalCases: confirmed.toLocaleString(),
      totalCasesHistory: totalCasesHistory,
      hospitalizedCases: hospitalized.toLocaleString(),
      hospitalizedCasesHistory: hospitalizedCasesHistory,
      icuCases: in_icu.toLocaleString(),
      icuCasesHistory: icuCasesHistory,
      curedCases: cured.toLocaleString(),
      curedCasesHistory: curedCasesHistory,
      monitoredCases: monitored.toLocaleString(),
      quarantinedCases: in_quarantine.toLocaleString(),
      deathCases: deaths.toLocaleString(),
      deathCasesHistory: deathCasesHistory,
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
      value: this.state.quarantinedCases,
      label: 'în carantină',
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

  specialValueForDeaths() {
    const deathPercentage = this.state.totalCases > 0 ? round(100*(this.state.deathCases / this.state.totalCases)) : 0
    return {
      value: deathPercentage + '%',
      label: 'din total',
      isGood: false
    }
  };

  render() {
    const error = this.state.error
    if (error != null) {
      // TODO: handle this gracefully
      return (
        <div className="container cards-row">
          <div className="columns">
            <div className="column">
              <Card>
                <div className="is-error is-block">Nu am putut încărca datele</div>
              </Card>
            </div>
          </div>
        </div>
      )
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
          </div>
          <div className="columns">
            <div className="column">
              <SummaryCard
                to="/"
                title="Vindecați"
                total={this.state.curedCases}
                special={this.specialValueForCured()}
                data={this.state.curedCasesHistory}
              />
            </div>
            <div className="column">
              <SummaryCard
                to="/"
                title="Decedați"
                total={this.state.deathCases}
                special={this.specialValueForDeaths()}
                data={this.state.deathCasesHistory}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}
