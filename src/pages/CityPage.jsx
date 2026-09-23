import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/Layout/PageLayout.jsx';
import PageHero from '../components/PageHero/PageHero.jsx';
import Seo from '../components/Seo/Seo.jsx';
import heroPhoto from '../assets/images/uslugi-hero.webp';
import { services } from '../data/services';
import styles from './LandingPage.module.css';

const featuredSlugs = ['ceramika', 'protezy', 'naprawa-protez'];
const featuredGroups = featuredSlugs.map(slug => services.find(c => c.slug === slug)).filter(Boolean);

const CITIES = {
  'zielona-gora': {
    seoTitle: 'Laboratorium Protetyczne dla Gabinetów w Zielonej Górze | D&M Laboratorium',
    seoDescription: 'D&M Laboratorium ze Słubic (ok. 90 km od Zielonej Góry) współpracuje z gabinetami stomatologicznymi w Zielonej Górze — korony, mosty i protezy CAD/CAM, szybka dostawa.',
    path: '/zielona-gora',
    heroTitle: 'Laboratorium Protetyczne Zielona Góra',
    breadcrumb: 'Zielona Góra',
    sectionTitle: <>Współpraca dla gabinetów <em>w Zielonej Górze</em></>,
    intro: (
      <>
        D&amp;M Laboratorium ze Słubic współpracuje z gabinetami stomatologicznymi w{' '}
        <strong>Zielonej Górze</strong> — stolicy województwa lubuskiego. Mimo odległości
        ok. 90 km, dzięki sprawnej organizacji odbioru i dostawy prace protetyczne trafiają
        do gabinetu bez opóźnień, z zachowaniem tej samej precyzji CAD/CAM co w Słubicach.
      </>
    ),
    localNote: 'Laboratorium protetyczne Zielona Góra · Protetyk Zielona Góra',
  },
  'gorzow-wielkopolski': {
    seoTitle: 'Laboratorium Protetyczne dla Gabinetów w Gorzowie Wielkopolskim | D&M Laboratorium',
    seoDescription: 'D&M Laboratorium ze Słubic (ok. 74 km od Gorzowa Wielkopolskiego) współpracuje z gabinetami stomatologicznymi w Gorzowie — korony, mosty i protezy CAD/CAM, szybka dostawa.',
    path: '/gorzow-wielkopolski',
    heroTitle: 'Laboratorium Protetyczne Gorzów Wielkopolski',
    breadcrumb: 'Gorzów Wielkopolski',
    sectionTitle: <>Współpraca dla gabinetów <em>w Gorzowie Wielkopolskim</em></>,
    intro: (
      <>
        D&amp;M Laboratorium ze Słubic współpracuje z gabinetami stomatologicznymi w{' '}
        <strong>Gorzowie Wielkopolskim</strong> — drugim co do wielkości mieście województwa
        lubuskiego, ok. 74 km od naszej siedziby. Sprawna dostawa pozwala utrzymać krótkie
        terminy realizacji przy pełnej precyzji CAD/CAM.
      </>
    ),
    localNote: 'Laboratorium protetyczne Gorzów Wielkopolski · Protetyk Gorzów Wielkopolski',
  },
};

export default function CityPage({ city }) {
  const c = CITIES[city];
  if (!c) return null;

  return (
    <PageLayout>
      <Seo
        title={c.seoTitle}
        description={c.seoDescription}
        path={c.path}
      />
      <PageHero
        eyebrow="Współpraca regionalna"
        title={c.heroTitle}
        subtitle="Precyzyjne korony, mosty i protezy CAD/CAM — ze Słubic, ze szybką i sprawną dostawą."
        photo={heroPhoto}
        photoPosition="center 20%"
        breadcrumb={c.breadcrumb}
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.contentWrap}>
            <div className={styles.sectionEyebrow}>Oferta</div>
            <h2 className={styles.sectionTitle}>{c.sectionTitle}</h2>
            <div className={styles.sectionDivider} />
            <p className={styles.intro}>{c.intro}</p>
          </div>

          {featuredGroups.map((group) => (
            <div key={group.slug} className={styles.accordionList}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <ul className={styles.servicesList}>
                {group.items.map((item, j) => (
                  <li key={j} className={styles.serviceItem}>
                    <span className={styles.bullet}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <p className={styles.localNote}>{c.localNote}</p>
          <p className={styles.localNote}>
            <Link to="/uslugi" className={styles.hairlineLink}>Zobacz pełną ofertę usług →</Link>
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
