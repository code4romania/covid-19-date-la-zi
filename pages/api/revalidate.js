import {
  PROP_SHOW_CONFIRMED_CASES,
  PROP_SHOW_CURED_CASES,
  PROP_SHOW_DEATH_CASES,
  PROP_SHOW_TOTAL_VACCINE,
  PROP_SHOW_VACCINE_IMMUNIZATION,
} from '../../components/layout/rows/summary-row'
import { EMBED_PATH_GENDER } from '../../components/cards/gender/gender-card'
import { EMBED_PATH_VACCINES_PER_DAY } from '../../components/cards/vaccines-per-day-card/vaccines-per-day-card'
import { EMBED_PATH_CASES_PER_DAY } from '../../components/cards/cases-per-day-card/cases-per-day-card'
import { EMBED_PATH_AVERAGE_AGE } from '../../components/cards/avg-age/avg-age-card'
import { EMBED_PATH_AGE } from '../../components/cards/age/age'
import { EMBED_COUNTIES_MAP } from '../../components/cards/counties-map/counties-map'
import { EMBED_COUNTIES_TABLE } from '../../components/cards/counties-table/counties-table'
import { EMBED_PATH_AGE_CATEGORY } from '../../components/cards/age-category/age-category'
import { EMBED_LARGE_CITIES_INCIDENTS_TABLE } from '../../components/cards/large-cities-incidents-table/large-cities-incidents-table'
import { EMBED_SMALL_CITIES_INCIDENTS_TABLE } from '../../components/cards/small-cities-incidents-table/small-cities-incidents-table'

export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

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
    EMBED_LARGE_CITIES_INCIDENTS_TABLE,
    EMBED_SMALL_CITIES_INCIDENTS_TABLE,
  ]

  try {
    await res.unstable_revalidate('/')
    await Promise.all(
      slugList.map((slug) => res.unstable_revalidate(`/embed/${slug}`))
    )

    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}
