import React from 'react';
import { motion } from 'framer-motion';
import styles from './HowItWorks.module.css';

const CONTENT = {
  pl: {
    eyebrow: 'Proces współpracy',
    title: <>Jak <em>pracujemy</em>?</>,
    description: 'Od zgłoszenia do dostawy gotowej pracy — sześć prostych kroków.',
    steps: [
      {
        title: 'Zgłoszenie i konsultacja',
        desc: 'Kontaktują się Państwo z nami telefonicznie, mailowo lub przez formularz. Omawiamy zakres współpracy, przesyłamy cennik oraz karty zleceń, odpowiadamy na pytania i — w razie potrzeby — przygotowujemy wstępną wycenę pracy.',
      },
      {
        title: 'Przekazanie materiałów',
        desc: 'Przekazują Państwo wyciski, modele lub skany wewnątrzustne (STL) wraz z wypełnioną kartą zlecenia. Doprecyzowujemy szczegóły pracy: kolor, materiał, oczekiwania pacjenta oraz termin.',
      },
      {
        title: 'Analiza i planowanie',
        desc: 'Analizujemy otrzymane materiały i proponujemy optymalne rozwiązanie. Potwierdzamy termin realizacji i koszt, a przy pracach estetycznych możemy przygotować projekt cyfrowy lub wax-up do akceptacji.',
      },
      {
        title: 'Wykonanie pracy',
        desc: 'Realizujemy zlecenie w technologii CAD/CAM lub metodą tradycyjną, zgodnie ze standardami technologicznymi. Przy protezach ruchomych prowadzimy kolejne etapy: łyżka indywidualna, wzornik zwarciowy, przymiarka na wosku.',
      },
      {
        title: 'Kontrola jakości',
        desc: 'Przed wydaniem każda praca przechodzi końcową kontrolę: dopasowanie, szczelność brzeżna, punkty styczne, zwarcie, kolor i zgodność ze zleceniem.',
      },
      {
        title: 'Dostawa i wsparcie',
        desc: 'Gotową pracę przekazujemy w uzgodniony sposób i w ustalonym terminie. Po oddaniu pozostajemy do Państwa dyspozycji — ewentualne korekty omawiamy i realizujemy bez zbędnej zwłoki.',
      },
    ],
  },
  de: {
    eyebrow: 'Ablauf der Zusammenarbeit',
    title: <>So <em>arbeiten</em> wir</>,
    description: 'Vom Auftrag bis zur Lieferung — sechs einfache Schritte.',
    steps: [
      {
        title: 'Anfrage und Beratung',
        desc: 'Sie kontaktieren uns telefonisch, per E-Mail oder über das Kontaktformular. Wir besprechen den Umfang der Zusammenarbeit, senden Ihnen unsere Preisliste und Auftragsformulare, beantworten Ihre Fragen und erstellen bei Bedarf einen Kostenvoranschlag.',
      },
      {
        title: 'Übermittlung der Unterlagen',
        desc: 'Sie senden uns Abformungen, Modelle oder Intraoralscans (STL) zusammen mit dem ausgefüllten Auftragsformular. Wir klären alle Details: Farbe, Material, Wünsche des Patienten und Termin.',
      },
      {
        title: 'Analyse und Planung',
        desc: 'Wir analysieren die Unterlagen und schlagen die optimale Lösung vor. Termin und Kosten werden bestätigt; bei ästhetischen Arbeiten erstellen wir auf Wunsch ein digitales Design oder Wax-up zur Freigabe.',
      },
      {
        title: 'Herstellung',
        desc: 'Die Arbeit wird in CAD/CAM-Technologie oder konventionell gefertigt — nach aktuellen technischen Standards. Bei herausnehmbarem Zahnersatz folgen die Etappen: individueller Löffel, Bissschablone, Wachsanprobe.',
      },
      {
        title: 'Qualitätskontrolle',
        desc: 'Vor der Auslieferung prüfen wir jede Arbeit: Passung, Randschluss, Kontaktpunkte, Okklusion, Farbe und Übereinstimmung mit dem Auftrag.',
      },
      {
        title: 'Lieferung und Betreuung',
        desc: 'Die fertige Arbeit liefern wir auf dem vereinbarten Weg und zum vereinbarten Termin. Auch danach sind wir für Sie da — eventuelle Korrekturen besprechen und erledigen wir zeitnah.',
      },
    ],
  },
};

export default function HowItWorks({ lang = 'pl' }) {
  const c = CONTENT[lang] ?? CONTENT.pl;

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>{c.eyebrow}</div>
          <h2 className={styles.sectionTitle}>{c.title}</h2>
          <div className={styles.sectionDivider} />
          <p className={styles.sectionDescription}>{c.description}</p>
        </div>

        <motion.div
          className={styles.stepsGrid}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
        >
          {c.steps.map((step, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.stepAccent} />
              <div className={styles.stepTop}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <span className={styles.stepHint} aria-hidden="true">+</span>
              </div>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
