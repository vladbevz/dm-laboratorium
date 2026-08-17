import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import PageLayout from '../components/Layout/PageLayout.jsx';
import PageHero from '../components/PageHero/PageHero.jsx';
import Seo from '../components/Seo/Seo.jsx';
import heroPhoto from '../assets/images/uslugi-hero.webp';
import { services } from '../data/services';
import styles from './ServicesPage.module.css';

export default function ServicesPage() {
  const location = useLocation();
  const [openItems, setOpenItems] = useState({});

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
    <PageLayout>
      <Seo
        title="Usługi Protetyczne Słubice — Korony, Protezy, Naprawa Protez | D&M Laboratorium"
        description="Pełna oferta pracowni protetycznej D&M Laboratorium Słubice: korony i mosty CAD/CAM, protezy całkowite, implantoprotetyka, naprawa protez. Współpraca z gabinetami w regionie lubuskim i całej Polsce."
        path="/uslugi"
      />
      <PageHero
        eyebrow="Co oferujemy"
        title="Usługi Protetyczne"
        subtitle="Kompleksowe rozwiązania protetyczne wykonywane z najwyższą precyzją. Wybierz kategorię, aby poznać szczegółową ofertę."
        photo={heroPhoto}
        photoPosition="center 20%"
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.accordionList}>
            {services.map((category, i) => {
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
                          {category.dedicatedPage && (
                            <Link to={category.dedicatedPage} className={styles.dedicatedLink}>
                              Zobacz szczegółową ofertę →
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
        </div>
      </section>
    </PageLayout>
  );
}
