import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Services.module.css';
import { services } from '../../data/services';
import { servicesDe } from '../../data/services.de';

const STRINGS = {
  pl: {
    eyebrow: 'Co oferujemy',
    titlePrefix: 'Usługi',
    titleStrong: 'Protetyczne',
    description: 'Kompleksowe rozwiązania w nowoczesnym laboratorium stomatologicznym',
    cta: 'Pełna oferta usług →',
    basePath: '/uslugi',
  },
  de: {
    eyebrow: 'Unser Angebot',
    titlePrefix: 'Zahntechnische',
    titleStrong: 'Leistungen',
    description: 'Umfassende Lösungen aus einem modernen Dentallabor',
    cta: 'Vollständiges Leistungsangebot →',
    basePath: '/de/leistungen',
  },
};

export default function Services({ lang = 'pl' }) {
  const [openItems, setOpenItems] = useState({});
  const t = STRINGS[lang] ?? STRINGS.pl;
  const list = lang === 'de' ? servicesDe : services;

  const toggle = (slug) => {
    setOpenItems((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>

        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>{t.eyebrow}</div>
          <h2 className={styles.sectionTitle}>
            {t.titlePrefix} <strong>{t.titleStrong}</strong>
          </h2>
          <div className={styles.sectionDivider} />
          <p className={styles.sectionDescription}>
            {t.description}
          </p>
        </div>

        <div className={styles.accordionList}>
          {list.map((category, i) => {
            const isOpen = !!openItems[category.slug];
            return (
              <motion.div
                key={category.slug}
                className={styles.accordionItem}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.4, 0, 0.2, 1] }}
                viewport={{ once: true }}
              >
                <button
                  className={`${styles.accordionHeader} ${isOpen ? styles.accordionHeaderOpen : ''}`}
                  onClick={() => toggle(category.slug)}
                  aria-expanded={isOpen}
                >
                  <Link
                    to={lang === 'de' ? `${t.basePath}#${category.slug}` : (category.dedicatedPage ?? `${t.basePath}#${category.slug}`)}
                    className={styles.accordionTitleLink}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {category.title}
                  </Link>
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
                      <ul className={styles.servicesList}>
                        {category.items.map((item, j) => (
                          <li key={j} className={styles.serviceItem}>
                            <span className={styles.bullet}>•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className={styles.ctaWrap}>
          <Link to={t.basePath} className={styles.ctaBtn}>
            {t.cta}
          </Link>
        </div>

      </div>
    </section>
  );
}
