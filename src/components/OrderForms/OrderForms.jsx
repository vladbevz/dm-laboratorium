import React from 'react';
import { Download } from 'lucide-react';
import styles from './OrderForms.module.css';
import previewPraceStale from '../../assets/images/dm-lab-zlecenie-prace-stale.webp';
import previewProtezy from '../../assets/images/dm-lab-zlecenie-protezy.webp';
import previewOrtodoncja from '../../assets/images/dm-lab-karta-ortodontyczna.webp';

const CONTENT = {
  pl: {
    eyebrow: 'Zanim wyślesz pracę',
    title: <>Formularze <em>zleceń</em></>,
    description: 'Aby usprawnić współpracę, przygotowaliśmy karty zleceń do pobrania. Formularz można wydrukować lub wypełnić bezpośrednio na komputerze — prosimy dołączyć go do każdej przesyłanej pracy. W razie pytań chętnie pomożemy telefonicznie lub mailowo.',
    downloadLabel: 'Pobierz PDF',
    forms: [
      {
        file: 'dm-lab-zlecenie-prace-stale.pdf',
        preview: previewPraceStale,
        title: 'Zlecenie — prace stałe',
        desc: 'Korony, mosty, licówki, CAD/CAM, prace na implantach',
      },
      {
        file: 'dm-lab-zlecenie-protezy.pdf',
        preview: previewProtezy,
        title: 'Zlecenie — protezy ruchome',
        desc: 'Protezy akrylowe, szkieletowe, elastyczne, naprawy',
      },
      {
        file: 'dm-lab-karta-ortodontyczna.pdf',
        preview: previewOrtodoncja,
        title: 'Karta ortodontyczna',
        desc: 'Aparaty zdejmowane, szyny, retainery',
      },
    ],
  },
  de: {
    eyebrow: 'Bevor Sie uns eine Arbeit senden',
    title: <>Auftrags<em>formulare</em></>,
    description: 'Um die Zusammenarbeit zu erleichtern, haben wir Auftragsformulare zum Download vorbereitet. Sie können ausgedruckt oder direkt am Computer ausgefüllt werden — bitte legen Sie das Formular jeder Arbeit bei. Bei Fragen helfen wir gerne telefonisch oder per E-Mail.',
    downloadLabel: 'PDF herunterladen',
    note: 'Formulare in polnischer Sprache.',
    forms: [
      {
        file: 'dm-lab-zlecenie-prace-stale.pdf',
        preview: previewPraceStale,
        title: 'Auftrag — festsitzender Zahnersatz',
        desc: 'Kronen, Brücken, Veneers, CAD/CAM, Implantatarbeiten',
      },
      {
        file: 'dm-lab-zlecenie-protezy.pdf',
        preview: previewProtezy,
        title: 'Auftrag — herausnehmbarer Zahnersatz',
        desc: 'Acryl- und Modellgussprothesen, flexible Prothesen, Reparaturen',
      },
      {
        file: 'dm-lab-karta-ortodontyczna.pdf',
        preview: previewOrtodoncja,
        title: 'Kieferorthopädische Karte',
        desc: 'Herausnehmbare Apparaturen, Schienen, Retainer',
      },
    ],
  },
};

export default function OrderForms({ lang = 'pl' }) {
  const c = CONTENT[lang] ?? CONTENT.pl;

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>{c.eyebrow}</div>
          <h2 className={styles.sectionTitle}>{c.title}</h2>
          <div className={styles.sectionDivider} />
          <p className={styles.sectionDescription}>{c.description}</p>
          {c.note && <p className={styles.note}>{c.note}</p>}
        </div>

        <div className={styles.grid}>
          {c.forms.map((form) => (
            <a
              key={form.file}
              href={`/${form.file}`}
              download
              className={styles.card}
            >
              <div className={styles.previewFrame}>
                <img src={form.preview} alt={form.title} className={styles.previewImg} loading="lazy" />
                <div className={styles.previewOverlay}>
                  <span className={styles.previewOverlayBtn}>
                    <Download size={14} />
                    {c.downloadLabel}
                  </span>
                </div>
              </div>
              <h3 className={styles.cardTitle}>{form.title}</h3>
              <p className={styles.cardDesc}>{form.desc}</p>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
