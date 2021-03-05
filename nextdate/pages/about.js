import React from "react";
import { Link } from "react-router-dom";
import BandaImage from "../../images/banda.png";
import SupportersImages from "../../images/supporters.png";
import { PageHeader } from "../layout/page-header/page-header";
import { InstrumentsWrapper } from "../layout/instruments/instruments";
import "./about.css";

export default function AboutPage() {
  return (
    <div className="container">
      <PageHeader title="Despre Proiect" />
      <div className="content">
        <p>
          COVID-19, o boală cauzată de o nouă tulpină de coronavirus
          identificată pentru prima dată în decembrie 2019 in Wuhan, China, este
          una dintre cele mai grave crize de sănătate publică din ultimele
          decenii. Dată fiind creșterea rapidă a cazurilor raportate în afara
          Chinei și a triplării numărului de țări afectate, Organizația Mondială
          a Sănătății (OMS) a caracterizat COVID-19 ca o pandemie. Potrivit OMS,
          dacă țările detectează, testează, tratează, izolează, urmăresc și își
          mobilizează oamenii ca răspuns, pot dezvolta strategii de răspuns
          eficiente împotriva COVID-19.
        </p>
        <p>
          Credem că este important ca publicul larg să aibă acces la un
          instrument ușor de utilizat pentru a urmări dimensiunea focarului,
          pentru a vizualiza date corecte din surse sigure.{" "}
          <Link to="/">Datelazi.ro</Link> prezintă infografii actualizate
          periodic cu datele furnizate de autoritățile competente.
        </p>
        <p>
          Acest proiect este realizat pro-bono de Code for Romania în
          parteneriat cu Guvernul României prin Autoritatea pentru Digitalizarea
          României. Funcționarea acestei platforme depinde exclusiv de
          conținutul datelor și informațiilor care vor fi furnizate de către
          Guvernul României.
        </p>
        <div>
          <img
            src={BandaImage}
            alt="Code for Romania, ADR, MS"
            className="logo-partnership"
          />
        </div>
        <div className="has-text-centered">
          <hr />
          <p>
            <b>Programul Code for Romania Task Force este susținut de:</b>
          </p>
          <div>
            <img
              src={SupportersImages}
              alt="ING Romanian American Foundation Fundația Vodafone România"
              className="logo-partnership"
            />
          </div>
        </div>
      </div>
      <aside>
        <InstrumentsWrapper />
      </aside>
    </div>
  );
}
