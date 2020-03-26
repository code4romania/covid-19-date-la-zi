import React from 'react';
import { SummaryCard } from '../../cards/summary/summary-card';
import { round } from 'prelude-ls';

export const PROP_SHOW_CONFIRMED_CASES = 'confirmed_cases';
export const PROP_SHOW_CURED_CASES = 'cured_cases';
export const PROP_SHOW_DEATH_CASES = 'dead_cases';

// This displays the top row containing the summary stats but grouped into several cards.
// Their management is the same though, using a single API call
export class SummaryRow extends React.PureComponent {

  specialValueForCured(state) {
    const curedPercentage = state.totalCases > 0 ? round(100*(state.curedCases / state.totalCases)) : 0
    return {
      value: curedPercentage + '%',
      label: 'din total',
      isGood: true
    }
  };

  specialValueForDeaths(state) {
    const deathPercentage = state.totalCases > 0 ? round(100*(state.deathCases / state.totalCases)) : 0
    return {
      value: deathPercentage + '%',
      label: 'din total',
      isGood: false
    }
  };

  formattedString(number) {
    if (!!number) {
      return number.toLocaleString()
    } else {
      return ''
    }
  }

  render() {
    const state = this.props.state
    const { error, isLoaded } = state;

    const totalCases = this.formattedString(state.totalCases)
    const cured = this.formattedString(state.curedCases)
    const deaths = this.formattedString(state.deathCases)

    const keyToCard = new Map([
      [PROP_SHOW_CONFIRMED_CASES, (
        <div className="column" key={PROP_SHOW_CONFIRMED_CASES}>
          <SummaryCard
            isLoaded={isLoaded}
            error={error}
            to="/"
            title="Cazuri confirmate"
            total={totalCases}
            data={state.totalCasesHistory}
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
            total={cured}
            special={this.specialValueForCured(state)}
            data={state.curedCasesHistory}
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
            total={deaths}
            special={this.specialValueForDeaths(state)}
            data={state.deathCasesHistory}
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
