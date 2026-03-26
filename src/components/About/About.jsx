import React from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
            className={styles.textWrapper}
          >
            <div className={styles.textContent}>
              <div className={styles.eyebrow}>O nas</div>

              <p className={styles.mainText}>
                <span className={styles.brandName}>D&M Laboratorium</span> —{' '}
                <span className={styles.highlight}>precyzja</span>,{' '}
                <span className={styles.highlight}>estetyka</span>,{' '}
                <span className={styles.highlight}>niezawodność</span>.
              </p>

              <div className={styles.divider} />

              <p className={styles.description}>
                Tworzymy prace protetyczne oparte na doświadczeniu, nowoczesnej technologii
                i dbałości o każdy detal. Wspieramy gabinety stomatologiczne w realizacji
                nawet najbardziej wymagających przypadków, oferując terminowość i pełne zaangażowanie.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
