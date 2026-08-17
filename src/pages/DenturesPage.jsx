import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/Layout/PageLayout.jsx';
import PageHero from '../components/PageHero/PageHero.jsx';
import Seo from '../components/Seo/Seo.jsx';
import heroPhoto from '../assets/images/uslugi-hero.webp';
import { services } from '../data/services';
import styles from './LandingPage.module.css';

const dentureGroups = ['protezy', 'protezy-na-implantach', 'protezy-szkieletowe']
  .map(slug => services.find(c => c.slug === slug))
  .filter(Boolean);

export default function DenturesPage() {
  return (
    <PageLayout>
      <Seo
        title="Protezy Całkowite Słubice — Protezy Lubuskie | D&M Laboratorium"
        description="Protezy całkowite, szkieletowe i na implantach — pracownia protetyczna D&M Laboratorium w Słubicach obsługuje gabinety stomatologiczne w całym województwie lubuskim i Polsce."
        path="/protezy"
      />
      <PageHero
        eyebrow="Protezy"
        title="Protezy Całkowite Słubice"
        subtitle="Precyzyjnie wykonane protezy dla pacjentów w Słubicach i całym województwie lubuskim — akrylowe, szkieletowe i na implantach."
        photo={heroPhoto}
        photoPosition="center 20%"
        breadcrumb="Protezy"
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.contentWrap}>
            <div className={styles.sectionEyebrow}>Oferta</div>
            <h2 className={styles.sectionTitle}>Protezy <em>dopasowane do Ciebie</em></h2>
            <div className={styles.sectionDivider} />
            <p className={styles.intro}>
              D&amp;M Laboratorium wykonuje <strong>protezy całkowite</strong> oraz szkieletowe
              dla gabinetów stomatologicznych w Słubicach i regionie lubuskim. Każda proteza
              projektowana jest indywidualnie — z dbałością o funkcję, estetykę i komfort noszenia.
            </p>
          </div>

          {dentureGroups.map((group) => (
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

          <p className={styles.localNote}>Protezy Słubice · Protezy Lubuskie · Cała Polska</p>

          <div className={styles.ctaWrap}>
            <Link to="/kontakt" className={styles.ctaBtn}>
              Zapytaj o współpracę →
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
