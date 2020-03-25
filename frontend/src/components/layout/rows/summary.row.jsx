import React from 'react';
import { SummaryCard } from '../../cards/summary/summary-card';
import { ApiURL } from '../../../config/globals';
import { round } from 'prelude-ls';

export const PROP_SHOW_CONFIRMED_CASES = 'confirmed_cases';
export const PROP_SHOW_CURED_CASES = 'cured_cases';
export const PROP_SHOW_DEATH_CASES = 'dead_cases';

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
      curedCases: 0,
      totalCasesHistory: [], // array of ints
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
    const curedCasesHistory = history.map((entry) => { return entry.cured || 0 })
    const confirmed = summary.confirmed || 0
    const cured = summary.cured || 0
    const monitored = summary.monitored || 0
    const in_quarantine = summary.in_quarantine || 0
    const deaths = summary.deaths || 0
    this.setState({
      isLoaded: true,
      totalCases: confirmed.toLocaleString(),
      totalCasesHistory: totalCasesHistory,
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
      isGood: true
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
    const { error, isLoaded } = this.state;
    const keyToCard = new Map([
      [PROP_SHOW_CONFIRMED_CASES, (
        <div className="column" key={PROP_SHOW_CONFIRMED_CASES}>
          <SummaryCard
            isLoaded={isLoaded}
            error={error}
            to="/"
            title="Cazuri confirmate"
            total={this.state.totalCases}
            special={this.specialValueForTotal()}
            data={this.state.totalCasesHistory}
            embedPath={PROP_SHOW_CONFIRMED_CASES}
          />
        </div>
      )],
      [PROP_SHOW_CURED_CASES, (
        <div className="column" key={PROP_SHOW_CURED_CASES}>
          <SummaryCard
            isLoaded={isLoaded}
            error={error}
            to="/"
            title="Vindecați"
            total={this.state.curedCases}
            special={this.specialValueForCured()}
            data={this.state.curedCasesHistory}
            embedPath={PROP_SHOW_CURED_CASES}
          />
        </div>
      )],
      [PROP_SHOW_DEATH_CASES, (
        <div className="column" key={PROP_SHOW_DEATH_CASES}>
          <SummaryCard
            isLoaded={isLoaded}
            error={error}
            to="/"
            title="Decedați"
            total={this.state.deathCases}
            special={this.specialValueForDeaths()}
            data={this.state.deathCasesHistory}
            embedPath={PROP_SHOW_DEATH_CASES}
          />
        </div>
      )]
    ]);

    const {visibleCards} = this.props;
    const cardComponents = visibleCards === undefined || visibleCards.length === 0 ?
      [...keyToCard.values()] :
      visibleCards.map(k => keyToCard.get(k));

    return (
      <div className="container cards-row">
        <div className="columns">
          {cardComponents}
        </div>
      </div>);
  }
}
