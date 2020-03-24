import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {CasesPerDayCard, EMBED_PATH_CASES_PER_DAY} from './components/cards/cases-per-day-card/cases-per-day-card';
import {EMBED_PATH_GENDER_AND_AGE, GenderAndAgeCard} from './components/cards/gender-and-age/gender-and-age';
import {
  EMBED_PATH_INFECTION_SOURCE,
  InfectionSourceCard
} from './components/cards/infection-source/infection-source-card';
import {EMBED_PATH_GENDER, GenderCard} from './components/cards/gender/gender-card';
import {
  PROP_SHOW_CONFIRMED_CASES,
  PROP_SHOW_CURED_CASES,
  PROP_SHOW_DEATH_CASES,
  SummaryRow
} from "./components/layout/rows/summary.row";

export function Embeddable() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={`*/${EMBED_PATH_CASES_PER_DAY}`}>
          <CasesPerDayCard />
        </Route>
        <Route path={`*/${EMBED_PATH_GENDER_AND_AGE}`}>
          <GenderAndAgeCard />
        </Route>
        <Route path={`*/${EMBED_PATH_INFECTION_SOURCE}`}>
          <InfectionSourceCard />
        </Route>
        <Route path={`*/${EMBED_PATH_GENDER}`}>
          <GenderCard title="După Gen" />
        </Route>
        <Route path={`*/${PROP_SHOW_CONFIRMED_CASES}`}>
          <SummaryRow visibleCards={[PROP_SHOW_CONFIRMED_CASES]}/>
        </Route>
        <Route path={`*/${PROP_SHOW_CURED_CASES}`}>
          <SummaryRow visibleCards={[PROP_SHOW_CURED_CASES]}/>
        </Route>
        <Route path={`*/${PROP_SHOW_DEATH_CASES}`}>
          <SummaryRow visibleCards={[PROP_SHOW_DEATH_CASES]}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
