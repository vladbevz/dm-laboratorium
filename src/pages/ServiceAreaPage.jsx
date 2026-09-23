import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/Layout/PageLayout.jsx';
import PageHero from '../components/PageHero/PageHero.jsx';
import Seo from '../components/Seo/Seo.jsx';
import heroPhoto from '../assets/images/uslugi-hero.webp';
import styles from './LandingPage.module.css';

const areas = [
  {
    city: 'Kostrzyn nad Odrą',
    distance: '33 km · ok. 30 min',
    desc: 'Najbliższa lokalizacja od naszej pracowni — sprawny odbiór i dostawa prac dla tamtejszych gabinetów.',
  },
  {
    city: 'Sulęcin',
    distance: '47 km · ok. 45 min',
    desc: 'Regularna współpraca z gabinetami stomatologicznymi w Sulęcinie i okolicznych miejscowościach.',
  },
  {
    city: 'Dębno',
    distance: '55 km · ok. 50 min',
    desc: 'Sprawna organizacja odbioru i dostawy prac protetycznych dla gabinetów w Dębnie.',
  },
  {
    city: 'Gorzów Wielkopolski',
    distance: '74 km · ok. 1 godz.',
    desc: 'Drugie co do wielkości miasto województwa lubuskiego — pełna oferta laboratorium dla tamtejszych gabinetów.',
    link: '/gorzow-wielkopolski',
  },
  {
    city: 'Świebodzin',
    distance: '80 km · ok. 1 godz. 5 min',
    desc: 'Miasto przy trasie A2 — dogodny dojazd i regularna dostawa gotowych prac.',
  },
  {
    city: 'Zielona Góra',
    distance: '90 km · ok. 1 godz. 25 min',
    desc: 'Stolica województwa lubuskiego — szybka i sprawna dostawa prac protetycznych CAD/CAM.',
    link: '/zielona-gora',
  },
  {
    city: 'Poznań',
    distance: '178 km · ok. 2 godz.',
    desc: 'Największe miasto w naszym obszarze działania — współpraca kurierska z gabinetami z Poznania i Wielkopolski.',
  },
];

export default function ServiceAreaPage() {
  return (
    <PageLayout>
      <Seo
        title="Obszar Działania — Laboratorium Protetyczne dla Regionu | D&M Laboratorium"
        description="D&M Laboratorium ze Słubic współpracuje z gabinetami stomatologicznymi w całym regionie: Kostrzyn nad Odrą, Sulęcin, Dębno, Gorzów Wielkopolski, Świebodzin, Zielona Góra i Poznań."
        path="/obszar-dzialania"
      />
      <PageHero
        eyebrow="Zasięg współpracy"
        title="Obszar Działania"
        subtitle="Szybka i sprawna dostawa prac protetycznych dla gabinetów stomatologicznych w całym regionie — od Słubic po Poznań."
        photo={heroPhoto}
        photoPosition="center 20%"
        breadcrumb="Obszar działania"
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.contentWrap}>
            <div className={styles.sectionEyebrow}>Gdzie pracujemy</div>
            <h2 className={styles.sectionTitle}>Współpracujemy <em>z całym regionem</em></h2>
            <div className={styles.sectionDivider} />
            <p className={styles.intro}>
              Nasza pracownia mieści się w Słubicach, ale dzięki sprawnej organizacji odbioru
              i dostawy współpracujemy z gabinetami stomatologicznymi w całym województwie
              lubuskim i poza nim. Poniżej lista głównych kierunków — z orientacyjną odległością
              i czasem dojazdu od naszej siedziby.
            </p>
          </div>

          <div className={`${styles.hairlineGrid} ${styles.areaGrid}`}>
            {areas.map((area) => (
              <div key={area.city} className={styles.hairlineCard}>
                <div className={styles.hairlineAccent} />
                <h3 className={styles.hairlineTitle}>{area.city}</h3>
                <span className={styles.hairlineMeta}>{area.distance}</span>
                <p className={styles.hairlineDesc}>{area.desc}</p>
                {area.link && (
                  <Link to={area.link} className={styles.hairlineLink}>
                    Zobacz więcej →
                  </Link>
                )}
              </div>
            ))}
          </div>

          <p className={styles.localNote}>
            Nie widzisz swojej miejscowości? Napisz do nas — najprawdopodobniej też ją obsługujemy.
          </p>

          <div className={styles.ctaWrap}>
            <Link to="/kontakt" className={styles.ctaBtn}>
              Wyślij przypadek do konsultacji →
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
