import React from 'react'
import download from 'downloadjs'
import styles from './index.module.css'
import { Banner, SocialsShare } from '@code4ro/taskforce-fe-components'
import { ApiURL, Constants } from '../config/globals'
import { PageHeader } from '../components/layout/page-header/page-header'
import { SummaryRow } from '../components/layout/rows/summary-row'
import { GenderCard } from '../components/cards/gender/gender-card'
import { CasesPerDayCard } from '../components/cards/cases-per-day-card/cases-per-day-card'
import { AverageAgeCard } from '../components/cards/avg-age/avg-age-card'
import { AgeCard } from '../components/cards/age/age'
import { CountiesMap } from '../components/cards/counties-map/counties-map'
import { CountiesTable } from '../components/cards/counties-table/counties-table'
import { LargeCitiesIncidentsTable } from '../components/cards/large-cities-incidents-table/large-cities-incidents-table'
import { SmallCitiesIncidentsTable } from '../components/cards/small-cities-incidents-table/small-cities-incidents-table'
import { InstrumentsWrapper } from '../components/layout/instruments/instruments'
import { AgeCategory } from '../components/cards/age-category/age-category'
import { VaccinesPerDayCard } from '../components/cards/vaccines-per-day-card/vaccines-per-day-card'
import DefaultLayout from '../components/layout/default-layout'
import { formatDate } from '../utils/date'

export async function getStaticProps() {
  const res = await fetch(ApiURL.smallData)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }, // will be passed to the page component as props
  }
}

class Dashboard extends React.Component {
  handleDownloadAllData = () => {
    fetch(ApiURL.allData)
      .then((res) => res.json())
      .then((result) => {
        if (result.error != null) {
          this.setState({ error: result.error })
        } else {
          const filename = this.getNormalizedFileName(
            result.charts.dailyStats.lastUpdatedOn
          )
          download(
            JSON.stringify(result),
            `date_${filename}.json`,
            'application/json'
          )
        }
      })
      .catch((error) => {
        this.setState({ error })
      })
  }

  getNormalizedFileName(filename) {
    return filename.replace(/\s+/g, '_').toLowerCase()
  }

  render() {
    return (
      <DefaultLayout>
        <Banner
          className="container"
          title={
            'Datele oficiale despre incidenta cazurilor de COVID-19 în România sunt furnizate sumarizat cu o frecventa săptămânală.\n Buletinul informativ este disponibil pe stirioficiale.ro. Ultima actualizare a datelor: ' +
            formatDate(this.props.data.currentDayStats.parsedOnString)
          }
          link="https://stirioficiale.ro"
        />
        <div className="container">
          <section className={styles.cards_row}>
            <PageHeader title="Date Oficiale" />
            <div className="content">
              <p>
                Accesul la date din surse oficiale cu privire la evoluția
                cazurilor de COVID-19 și a programului de vaccinare în România
                este esențial în adoptarea măsurilor de sănătate publică
                împotriva pandemiei. Astfel, venim în sprijinul publicului și al
                mass-media din România prin accesibilizarea datelor punându-le
                într-o formă grafică ușor de parcurs.
              </p>
              <p>
                Infografiile se actualizează zilnic și sunt centralizate în
                graficele de mai jos.
              </p>
              <p>
                Acest proiect este realizat pro-bono de către Asociația Code for
                Romania în parteneriat cu Guvernul României prin Autoritatea
                pentru Digitalizarea României. Funcționarea acestei platforme
                depinde exclusiv de conținutul datelor și informațiilor care vor
                fi furnizate de către Guvernul României.
              </p>

              <SocialsShare currentPage={Constants.shareableLink} />
            </div>
            <div className="is-flex is-justify-content-flex-end">
              <button
                className="button is-primary is-light"
                onClick={this.handleDownloadAllData}
              >
                Descarcă datele
              </button>
            </div>
          </section>

          <SummaryRow state={this.props.data} />

          <section className={styles.cards_row}>
            <div className="columns">
              <div className="column">
                <VaccinesPerDayCard state={this.props.data} />
              </div>
            </div>
          </section>

          <section className={styles.cards_row}>
            <div className="columns">
              <div className="column is-three-quarters">
                <CasesPerDayCard state={this.props.data} />
              </div>
              <div className="column is-one-quarter">
                <GenderCard
                  to="/"
                  title="Cazuri după gen"
                  state={this.props.data}
                />
              </div>
            </div>
          </section>

          <section className={styles.cards_row}>
            <div className="columns">
              <div className="column">
                <AgeCategory
                  title="Cazuri per categorie de vârstă, în timp"
                  state={this.props.data}
                />
              </div>
            </div>
          </section>

          <section className={styles.cards_row}>
            <div className="columns">
              <div className="column is-two-quarter">
                <CountiesMap state={this.props.data} />
              </div>
              <div className="column is-two-quarter">
                <CountiesTable state={this.props.data} />
              </div>
            </div>
          </section>

          <section className={styles.cards_row}>
            <div className="columns">
              <div className="column is-two-quarter">
                <AgeCard title="Cazuri după vârstă" state={this.props.data} />
              </div>
              <div className="column is-one-quarter">
                <AverageAgeCard
                  title="Vârsta medie a cazurilor"
                  state={this.props.data}
                />
              </div>
            </div>
          </section>

          <section className={styles.cards_row}>
            <div className="columns">
              <div className="column">
                <LargeCitiesIncidentsTable
                  title="Cazuri după vârstă"
                  state={this.props.data}
                />
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <SmallCitiesIncidentsTable
                  title="Cazuri după vârstă"
                  state={this.props.data}
                />
              </div>
            </div>
          </section>

          <aside>
            <InstrumentsWrapper />
          </aside>
        </div>
      </DefaultLayout>
    )
  }
}

export default Dashboard
