import React from 'react'
import { withRouter } from 'next/router'
import { ApiURL } from '../../config/globals'
import {
  PROP_SHOW_CONFIRMED_CASES,
  PROP_SHOW_CURED_CASES,
  PROP_SHOW_DEATH_CASES,
  PROP_SHOW_TOTAL_VACCINE,
  PROP_SHOW_VACCINE_IMMUNIZATION,
  SummaryRow,
} from '../../components/layout/rows/summary-row'
import {
  EMBED_PATH_GENDER,
  GenderCard,
} from '../../components/cards/gender/gender-card'
import {
  EMBED_PATH_VACCINES_PER_DAY,
  VaccinesPerDayCard,
} from '../../components/cards/vaccines-per-day-card/vaccines-per-day-card'
import {
  CasesPerDayCard,
  EMBED_PATH_CASES_PER_DAY,
} from '../../components/cards/cases-per-day-card/cases-per-day-card'
import {
  AverageAgeCard,
  EMBED_PATH_AVERAGE_AGE,
} from '../../components/cards/avg-age/avg-age-card'
import { AgeCard, EMBED_PATH_AGE } from '../../components/cards/age/age'
import {
  CountiesMap,
  EMBED_COUNTIES_MAP,
} from '../../components/cards/counties-map/counties-map'
import {
  CountiesTable,
  EMBED_COUNTIES_TABLE,
} from '../../components/cards/counties-table/counties-table'
import {
  AgeCategory,
  EMBED_PATH_AGE_CATEGORY,
} from '../../components/cards/age-category/age-category'
import { DevelopedBy } from '@code4ro/taskforce-fe-components'
import Image from 'next/image'

export async function getStaticPaths() {
  const slugList = [
    PROP_SHOW_CONFIRMED_CASES,
    PROP_SHOW_CURED_CASES,
    PROP_SHOW_DEATH_CASES,
    PROP_SHOW_TOTAL_VACCINE,
    PROP_SHOW_VACCINE_IMMUNIZATION,
    EMBED_PATH_VACCINES_PER_DAY,
    EMBED_PATH_GENDER,
    EMBED_PATH_CASES_PER_DAY,
    EMBED_PATH_AVERAGE_AGE,
    EMBED_COUNTIES_MAP,
    EMBED_COUNTIES_TABLE,
    EMBED_PATH_AGE_CATEGORY,
    EMBED_PATH_AGE,
  ]
  const paths = slugList.map((slug) => ({
    params: {
      slug,
    },
  }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps() {
  const res = await fetch(ApiURL.allData)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }, // will be passed to the page component as props
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 300, // In seconds (5min)
  }
}

class EmbedPage extends React.Component {
  render() {
    const { slug } = this.props.router.query
    const keyToCard = new Map([
      [
        EMBED_PATH_CASES_PER_DAY,
        <CasesPerDayCard
          key={EMBED_PATH_CASES_PER_DAY}
          state={this.props.data}
        />,
      ],
      [
        EMBED_PATH_AGE_CATEGORY,
        <AgeCategory
          key={EMBED_PATH_AGE_CATEGORY}
          title="Cazuri per categorie de vârstă, în timp"
          state={this.props.data}
        />,
      ],
      [
        EMBED_PATH_AGE,
        <AgeCard
          key={EMBED_PATH_AGE}
          title="Cazuri după vârstă"
          state={this.props.data}
        />,
      ],
      [
        EMBED_PATH_AVERAGE_AGE,
        <AverageAgeCard
          key={EMBED_PATH_AVERAGE_AGE}
          title="Vârsta medie a cazurilor"
          state={this.props.data}
        />,
      ],
      [
        EMBED_PATH_GENDER,
        <GenderCard
          key={EMBED_PATH_GENDER}
          title="Cazuri după gen"
          state={this.props.data}
        />,
      ],
      [
        PROP_SHOW_CONFIRMED_CASES,
        <SummaryRow
          key={PROP_SHOW_CONFIRMED_CASES}
          visibleCards={[PROP_SHOW_CONFIRMED_CASES]}
          state={this.props.data}
        />,
      ],
      [
        PROP_SHOW_CURED_CASES,
        <SummaryRow
          key={PROP_SHOW_CURED_CASES}
          visibleCards={[PROP_SHOW_CURED_CASES]}
          state={this.props.data}
        />,
      ],
      [
        PROP_SHOW_DEATH_CASES,
        <SummaryRow
          key={PROP_SHOW_DEATH_CASES}
          visibleCards={[PROP_SHOW_DEATH_CASES]}
          state={this.props.data}
        />,
      ],
      [
        PROP_SHOW_TOTAL_VACCINE,
        <SummaryRow
          key={PROP_SHOW_TOTAL_VACCINE}
          visibleCards={[PROP_SHOW_TOTAL_VACCINE]}
          state={this.props.data}
        />,
      ],
      [
        EMBED_PATH_VACCINES_PER_DAY,
        <VaccinesPerDayCard
          key={EMBED_PATH_VACCINES_PER_DAY}
          state={this.props.data}
        />,
      ],
      [
        PROP_SHOW_VACCINE_IMMUNIZATION,
        <SummaryRow
          key={PROP_SHOW_VACCINE_IMMUNIZATION}
          visibleCards={[PROP_SHOW_VACCINE_IMMUNIZATION]}
          state={this.props.data}
        />,
      ],
      [
        EMBED_COUNTIES_MAP,
        <CountiesMap key={EMBED_COUNTIES_MAP} state={this.props.data} />,
      ],
      [
        EMBED_COUNTIES_TABLE,
        <CountiesTable key={EMBED_COUNTIES_TABLE} state={this.props.data} />,
      ],
    ])

    return (
      <div className="embed_container">
        {keyToCard.get(slug)}
        <div className="embed_footer">
          <a
            href="https://datelazi.ro"
            className="embed_footer__logo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/logo-coviz.svg"
              width="120"
              height="37"
              alt="Date La Zi Logo"
            />
          </a>
          <div>
            <DevelopedBy />
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(EmbedPage)
