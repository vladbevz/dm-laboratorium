import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import PageLayout from '../components/Layout/PageLayout.jsx';
import PageHero from '../components/PageHero/PageHero.jsx';
import Seo from '../components/Seo/Seo.jsx';
import heroPhoto from '../assets/images/uslugi-hero.webp';
import { services } from '../data/services';
import { servicesDe } from '../data/services.de';
import styles from './ServicesPage.module.css';

const CONTENT = {
  pl: {
    seoTitle: 'Usługi Protetyczne Słubice — Korony, Protezy, Naprawa Protez | D&M Laboratorium',
    seoDescription: 'Pełna oferta pracowni protetycznej D&M Laboratorium Słubice: korony i mosty CAD/CAM, protezy całkowite, implantoprotetyka, naprawa protez. Współpraca z gabinetami w regionie lubuskim i całej Polsce.',
    path: '/uslugi',
    eyebrow: 'Co oferujemy',
    title: 'Usługi Protetyczne',
    subtitle: 'Kompleksowe rozwiązania protetyczne wykonywane z najwyższą precyzją. Wybierz kategorię, aby poznać szczegółową ofertę.',
    breadcrumb: 'Usługi',
    homePath: '/',
    homeLabel: 'Strona główna',
    dedicatedLink: 'Zobacz szczegółową ofertę →',
  },
  de: {
    seoTitle: 'Zahntechnische Leistungen Słubice — Kronen, Prothesen, Reparaturen | D&M Laboratorium',
    seoDescription: 'Vollständiges Leistungsangebot des Dentallabors D&M Laboratorium in Słubice: CAD/CAM-Kronen und -Brücken, Vollprothesen, Implantatprothetik, Prothesenreparatur. Nur wenige Minuten von Frankfurt (Oder) — Zusammenarbeit mit Zahnarztpraxen in Deutschland und Polen.',
    path: '/de/leistungen',
    eyebrow: 'Unser Angebot',
    title: 'Zahntechnische Leistungen',
    subtitle: 'Umfassende zahntechnische Lösungen mit höchster Präzision. Wählen Sie eine Kategorie, um das vollständige Angebot zu sehen.',
    breadcrumb: 'Leistungen',
    homePath: '/de',
    homeLabel: 'Startseite',
    dedicatedLink: 'Mehr erfahren →',
  },
};

const ALTERNATES = [
  { lang: 'pl', path: '/uslugi' },
  { lang: 'de', path: '/de/leistungen' },
  { lang: 'x-default', path: '/uslugi' },
];

export default function ServicesPage({ lang = 'pl' }) {
  const location = useLocation();
  const [openItems, setOpenItems] = useState({});
  const c = CONTENT[lang] ?? CONTENT.pl;
  const list = lang === 'de' ? servicesDe : services;

  const toggle = (slug) => {
    setOpenItems((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  useEffect(() => {
    if (location.hash) {
      const slug = location.hash.replace('#', '');
      setOpenItems((prev) => ({ ...prev, [slug]: true }));
      setTimeout(() => {
        document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [location.hash]);

  return (
    <PageLayout lang={lang}>
      <Seo
        title={c.seoTitle}
        description={c.seoDescription}
        path={c.path}
        lang={lang}
        alternates={ALTERNATES}
      />
      <PageHero
        eyebrow={c.eyebrow}
        title={c.title}
        subtitle={c.subtitle}
        breadcrumb={c.breadcrumb}
        homePath={c.homePath}
        homeLabel={c.homeLabel}
        photo={heroPhoto}
        photoPosition="center 20%"
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.accordionList}>
            {list.map((category, i) => {
              const isOpen = !!openItems[category.slug];
              return (
                <motion.div
                  key={category.slug}
                  id={category.slug}
                  className={styles.accordionItem}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.04, ease: [0.4, 0, 0.2, 1] }}
                  viewport={{ once: true }}
                >
                  <button
                    className={`${styles.accordionHeader} ${isOpen ? styles.open : ''}`}
                    onClick={() => toggle(category.slug)}
                    aria-expanded={isOpen}
                  >
                    <span className={styles.accordionTitle}>{category.title}</span>
                    <motion.span
                      className={styles.accordionIcon}
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className={styles.accordionBody}>
                          <ul className={styles.servicesList}>
                            {category.items.map((item, j) => (
                              <li key={j} className={styles.serviceItem}>
                                <span className={styles.bullet}>•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                          {category.dedicatedPage && lang === 'pl' && (
                            <Link to={category.dedicatedPage} className={styles.dedicatedLink}>
                              {c.dedicatedLink}
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {lang === 'pl' && (
            <div className={styles.areaLinkWrap}>
              <Link to="/obszar-dzialania" className={styles.dedicatedLink}>
                Zobacz obszar działania →
              </Link>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
