import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../layout/page.header';

export class AboutPage extends React.PureComponent {
  render() {
    return (
      <section className="section">
        <div className="container cards-row">
          <PageHeader
            title="Despre Proiect"

          />
        </div>
        <div className="container content">
          <p>
          COVID-19, o boală cauzată de o nouă tulpină de coronavirus identificată pentru prima dată în
          decembrie 2019 in Wuhan, China, este una dintre cele mai grave crize de sănătate publică din
          ultimele decenii. Dată fiind creșterea rapidă a cazurilor raportate în afara Chinei și a triplării
          numărului de țări afectate, Organizația Mondială a Sănătății (OMS) a caracterizat COVID-19 ca o pandemie.
          Potrivit OMS, dacă țările detectează, testează, tratează, izolează, urmăresc și își mobilizează
          oamenii ca răspuns, pot dezvolta strategii de răspuns eficiente împotriva COVID-19.
          </p>
          <p>
          Credem că este important ca publicul larg să aibă access la un instrument ușor de utilizat pentru
          a urmări dimensiunea focarului pentru a vizualiza date corecte din surse
          sigure. <Link to="/">Datelazi.ro</Link> prezintă infografii actualizeate periodic cu date anonimizate
          colectate de Ministerul Sănătății și le transformă în informație grafică, ușor de înțeles pentru publicul
          larg.
          </p>
          <p>
            <Link to="/">Datelazi.ro</Link> este un  proiect realizat pro-bono de
          voluntarii <a href="https://code4.ro">Code for Romania</a>, organizație
          neguvernamentală independentă, neafiliată politic și apolitică, în cadrul Code for Romania Task Force
          și în parteneriat cu Guvernul României prin Autoritatea pentru Digitalizarea României pe baza datelor
          furnizate de Ministerul Sănătății.
          </p>
        </div>
      </section>
    );
  }
}
