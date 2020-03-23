import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {CasesPerDayCard, EMBED_PATH_CASES_PER_DAY} from './components/cards/cases-per-day-card/cases-per-day-card';
import {EMBED_PATH_GENDER_AND_AGE, GenderAndAgeCard} from './components/cards/gender-and-age/gender-and-age';
import {
  EMBED_PATH_INFECTION_SOURCE,
  InfectionSourceCard
} from './components/cards/infection-source/infection-source-card';
import {EMBED_PATH_GENDER, GenderCard} from './components/cards/gender/gender-card';

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
      </Switch>
    </BrowserRouter>
  );
}
