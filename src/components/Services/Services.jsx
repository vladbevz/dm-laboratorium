import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Services.module.css';
import { services } from '../../data/services';

export default function Services() {
  const [openItems, setOpenItems] = useState({});

  const toggle = (slug) => {
    setOpenItems((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>

        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>Co oferujemy</div>
          <h2 className={styles.sectionTitle}>
            Usługi <strong>Protetyczne</strong>
          </h2>
          <div className={styles.sectionDivider} />
          <p className={styles.sectionDescription}>
            Kompleksowe rozwiązania w nowoczesnym laboratorium stomatologicznym
          </p>
        </div>

        <div className={styles.accordionList}>
          {services.map((category, i) => {
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
                    to={`/uslugi#${category.slug}`}
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
          <Link to="/uslugi" className={styles.ctaBtn}>
            Pełna oferta usług →
          </Link>
        </div>

      </div>
    </section>
  );
}
