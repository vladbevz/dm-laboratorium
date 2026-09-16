import React from 'react';
import { motion } from 'framer-motion';
import styles from './HowItWorks.module.css';

const CONTENT = {
  pl: {
    eyebrow: 'Proces współpracy',
    title: <>Jak rozpocząć <em>współpracę</em></>,
    description: 'Od zgłoszenia przypadku do gotowej pracy w gabinecie',
    steps: [
      { title: 'Wyślij skan lub wycisk', desc: 'Prześlij cyfrowy skan (STL) lub tradycyjny wycisk wraz z opisem przypadku przez formularz lub email.' },
      { title: 'Przygotowujemy projekt', desc: 'Analizujemy przypadek i przygotowujemy plan pracy w technologii CAD/CAM.' },
      { title: 'Akceptacja projektu', desc: 'Konsultujemy szczegóły i uzyskujemy Twoją akceptację przed rozpoczęciem produkcji.' },
      { title: 'Realizacja i dostawa', desc: 'Wykonujemy pracę z najwyższą precyzją i dostarczamy ją bezpośrednio do gabinetu.' },
    ],
  },
  de: {
    eyebrow: 'Ablauf der Zusammenarbeit',
    title: <>So starten wir die <em>Zusammenarbeit</em></>,
    description: 'Vom eingesendeten Fall bis zur fertigen Arbeit in Ihrer Praxis',
    steps: [
      { title: 'Scan oder Abdruck senden', desc: 'Senden Sie uns einen digitalen Scan (STL) oder einen klassischen Abdruck mit Fallbeschreibung — per Formular oder E-Mail.' },
      { title: 'Wir erstellen den Plan', desc: 'Wir analysieren den Fall und erstellen einen Arbeitsplan in CAD/CAM-Technologie.' },
      { title: 'Freigabe des Projekts', desc: 'Wir besprechen die Details und holen Ihre Freigabe ein, bevor die Fertigung beginnt.' },
      { title: 'Fertigung und Lieferung', desc: 'Wir fertigen die Arbeit mit höchster Präzision und liefern sie direkt an Ihre Praxis.' },
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
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
