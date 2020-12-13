import React from 'react';
import {
  Hero,
  BannerImage,
  Instruments,
  InstrumentsItem
} from '@code4ro/taskforce-fe-components';
import rovaccinareImage from '../../../images/rovaccinare.jpg';

export const InstrumentsWrapper = () => (
  <>
    <div className="border-bottom">
      <Hero title="Instrumente utile" useFallbackIcon />
    </div>

    <Instruments layout="grid">
      <section>
        <BannerImage
          link="https://vaccinare-covid.gov.ro/"
          image={{
            src: rovaccinareImage,
            alt: '#ROVACCINARE',
            title: '#ROVACCINARE'
          }}
        />
      </section>
      <section>
        <InstrumentsItem
          color="green"
          title="Ştiri oficiale și informații la zi"
          content=""
          ctaText="Cele mai noi informaţii oficiale"
          ctaLink="https://stirioficiale.ro/informatii"
        />
      </section>
      <section>
        <InstrumentsItem
          color="yellow"
          title="Află ce ai de făcut în orice situație"
          content=""
          ctaText="Ce trebuie să fac"
          ctaLink="https://cemafac.ro"
        />
      </section>
      <section>
        <InstrumentsItem
          color="red"
          title="Contribuie la lupta împotriva Covid-19"
          content=""
          ctaText="Donează prin RoHelp"
          ctaLink="https://rohelp.ro/"
        />
      </section>
      <section>
        <InstrumentsItem
          color="blue"
          title="Ești în afara țării?"
          content=""
          ctaText="Informează-te pe Diaspora Hub"
          ctaLink="https://diasporahub.ro"
        />
      </section>
      <section>
        <InstrumentsItem
          color="orange"
          title="Monitorizează-ți starea de sănătate"
          ctaLink="https://jurnalmedical.ro"
          ctaText="Fă-ți cont pe Jurnal Medical"
        />
      </section>
      <section>
        <InstrumentsItem
          color="green"
          title="Instalează-ţi extensia de Firefox"
          ctaLink="https://addons.mozilla.org/en-US/firefox/addon/covid-19-%C8%99tiri-oficiale/"
          ctaText="Instalează add-on"
        />
      </section>
      <section>
        <InstrumentsItem
          color="green"
          title="Instalează-ti extensia de Chrome"
          ctaLink={
            'https://chrome.google.com/webstore/detail/' +
          'covid-19-stiri-oficiale/pdcpkplohipjhdfdchpmgekifmcdbnha'
          }
          ctaText="Instalează add-on"
        />
      </section>
    </Instruments>
  </>
);
