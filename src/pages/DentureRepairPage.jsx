import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/Layout/PageLayout.jsx';
import PageHero from '../components/PageHero/PageHero.jsx';
import Seo from '../components/Seo/Seo.jsx';
import heroPhoto from '../assets/images/uslugi-hero.webp';
import { services } from '../data/services';
import styles from './LandingPage.module.css';

const repairGroup = services.find(c => c.slug === 'naprawa-protez');

export default function DentureRepairPage() {
  return (
    <PageLayout>
      <Seo
        title="Naprawa Protez Słubice i Lubuskie | D&M Laboratorium"
        description="Naprawa protez w Słubicach i regionie lubuskim — polerowanie, dostawienie zęba lub klamry, naprawa złamanej protezy, podścielenie i rebazacja. Szybka realizacja dla gabinetów stomatologicznych."
        path="/naprawa-protez"
      />
      <PageHero
        eyebrow="Naprawa protez"
        title="Naprawa Protez Słubice"
        subtitle="Szybka i precyzyjna naprawa protez dla gabinetów stomatologicznych w Słubicach i całym województwie lubuskim."
        photo={heroPhoto}
        photoPosition="center 20%"
        breadcrumb="Naprawa protez"
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.contentWrap}>
            <div className={styles.sectionEyebrow}>Serwis</div>
            <h2 className={styles.sectionTitle}>Naprawa protez <em>Słubice i Lubuskie</em></h2>
            <div className={styles.sectionDivider} />
            <p className={styles.intro}>
              Pęknięta lub złamana proteza? D&amp;M Laboratorium wykonuje{' '}
              <strong>naprawę protez</strong> dla gabinetów stomatologicznych w Słubicach
              i regionie lubuskim — od drobnych napraw po pełną rebazację i podścielenie płyty protezy.
            </p>
          </div>

          {repairGroup && (
            <div className={styles.accordionList}>
              <ul className={styles.servicesList}>
                {repairGroup.items.map((item, j) => (
                  <li key={j} className={styles.serviceItem}>
                    <span className={styles.bullet}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className={styles.localNote}>Naprawa protez Słubice · Naprawa protez Lubuskie</p>

          <div className={styles.ctaWrap}>
            <Link to="/kontakt" className={styles.ctaBtn}>
              Zgłoś naprawę →
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
