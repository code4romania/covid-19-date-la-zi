import React from 'react';
import { round } from 'prelude-ls';
import { SummaryCard } from '../../cards/summary/summary-card';
import { formatDate } from '../../../utils/date';

export const PROP_SHOW_CONFIRMED_CASES = 'confirmed_cases';
export const PROP_SHOW_CURED_CASES = 'cured_cases';
export const PROP_SHOW_DEATH_CASES = 'dead_cases';
export const PROP_SHOW_TOTAL_VACCINE = 'total_vaccine';
export const PROP_SHOW_VACCINE_IMMUNIZATION = 'vaccine_immunization';

// This displays the top row containing the summary stats but grouped into several cards.
// Their management is the same though, using a single API call
export class SummaryRow extends React.PureComponent {
  specialValueForCured(state) {
    const curedPercentage = round(100 * (state.curedCases / state.totalCases));
    return {
      value: curedPercentage + '%',
      label: 'din total',
      isGood: true,
    };
  }

  specialValueForDeaths(state) {
    const deathPercentage = round(100 * (state.deathCases / state.totalCases));
    return {
      value: deathPercentage + '%',
      label: 'din total',
      isGood: false,
    };
  }

  specialValueForImmunization(state) {
    const immunizationPercentage = round(
      100 * (state.totalImmunity / 19414458)
    );
    return {
      value: immunizationPercentage + '%',
      label: 'din total',
      isGood: false,
    };
  }

  formattedString(number) {
    return !!number ? number.toLocaleString() : 0;
  }

  render() {
    const state = this.props.state;
    const {
      error,
      isLoaded,
      dailyStale,
      dailyLastUpdate,
      vaccineQuickStale,
      vaccineQuickLastUpdate,
      vaccineDetaileStale,
      vaccineDetaileLastUpdate,
    } = state;
    const totalCases = this.formattedString(state.totalCases);
    const cured = this.formattedString(state.curedCases);
    const deaths = this.formattedString(state.deathCases);
    const dosesAdministered = this.formattedString(
      state.totalDosesAdministered
    );
    const totalImmunity = this.formattedString(state.totalImmunity);

    const keyToCard = new Map([
      [
        PROP_SHOW_CONFIRMED_CASES,
        <SummaryCard
          key={PROP_SHOW_CONFIRMED_CASES}
          isLoaded={isLoaded}
          error={error}
          to="/"
          title="Cazuri confirmate"
          subTitle={`Ultima actualizare ${formatDate(dailyLastUpdate)}`}
          total={totalCases}
          data={state.totalCasesHistory}
          embedPath={PROP_SHOW_CONFIRMED_CASES}
          stale={dailyStale}
        />,
      ],
      [
        PROP_SHOW_CURED_CASES,
        <SummaryCard
          key={PROP_SHOW_CURED_CASES}
          isLoaded={isLoaded}
          error={error}
          to="/"
          title="Vindecați"
          subTitle={`Ultima actualizare ${formatDate(dailyLastUpdate)}`}
          total={cured}
          special={this.specialValueForCured(state)}
          data={state.curedCasesHistory}
          embedPath={PROP_SHOW_CURED_CASES}
          stale={dailyStale}
        />,
      ],
      [
        PROP_SHOW_DEATH_CASES,
        <SummaryCard
          key={PROP_SHOW_DEATH_CASES}
          isLoaded={isLoaded}
          error={error}
          to="/"
          title="Decedați"
          subTitle={`Ultima actualizare ${formatDate(dailyLastUpdate)}`}
          total={deaths}
          special={this.specialValueForDeaths(state)}
          data={state.deathCasesHistory}
          embedPath={PROP_SHOW_DEATH_CASES}
          stale={dailyStale}
        />,
      ],
      [
        PROP_SHOW_TOTAL_VACCINE,
        <SummaryCard
          key={PROP_SHOW_TOTAL_VACCINE}
          isLoaded={isLoaded}
          error={error}
          to="/"
          title="Doze de vaccin administrate"
          subTitle={`Ultima actualizare ${formatDate(vaccineQuickLastUpdate)}`}
          total={dosesAdministered}
          data={state.dosesAdministeredHistory}
          embedPath={PROP_SHOW_TOTAL_VACCINE}
          stale={vaccineQuickStale}
        />,
      ],
      [
        PROP_SHOW_VACCINE_IMMUNIZATION,
        <SummaryCard
          key={PROP_SHOW_VACCINE_IMMUNIZATION}
          isLoaded={isLoaded}
          error={error}
          to="/"
          title="Imunizați"
          subTitle={`Ultima actualizare ${formatDate(
            vaccineDetaileLastUpdate
          )}`}
          total={totalImmunity}
          special={this.specialValueForImmunization(state)}
          data={state.immunityHistory}
          embedPath={PROP_SHOW_VACCINE_IMMUNIZATION}
          stale={vaccineDetaileStale}
        />,
      ],
    ]);

    const { visibleCards } = this.props;

    const cardKeyIndex = 0;
    const cardValueIndex = 1;
    const cardKeyComponents =
      visibleCards === undefined || visibleCards.length === 0
        ? [...keyToCard.entries()]
        : visibleCards.map((k) => [k, keyToCard.get(k)]);

    const cardComponents = cardKeyComponents.map((e) => (
      <div className="column is-one-third" key={e[cardKeyIndex]}>
        {e[cardValueIndex]}
      </div>
    ));

    const justOneCardComponent =
      cardKeyComponents.length === 1
        ? cardKeyComponents[0][cardValueIndex]
        : undefined;

    return (
      justOneCardComponent || (
        <div className="cards-row">
          <div className="columns is-multiline">{cardComponents}</div>
        </div>
      )
    );
  }
}
