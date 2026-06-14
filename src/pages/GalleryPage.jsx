import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../components/Layout/PageLayout.jsx';
import PageHero from '../components/PageHero/PageHero.jsx';
import heroPhoto from '../assets/images/galeria-hero.webp';
import styles from './GalleryPage.module.css';

const images = [
  '4_Projekt bez nazwy.webp',
  '7_Projekt bez nazwy.webp',
  '6_Projekt bez nazwy.webp',
  '12_Projekt bez nazwy.webp',
  '5_Projekt bez nazwy.webp',
  '8_Projekt bez nazwy.webp',
  '3_Projekt bez nazwy.webp',
  '13_Projekt bez nazwy.webp',
  '10_Projekt bez nazwy.webp',
  '9_Projekt bez nazwy.webp',
  '15_Projekt bez nazwy.webp',
  '2_Projekt bez nazwy.webp',
  '1_Projekt bez nazwy.webp',
];

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <PageLayout>
      <PageHero
        eyebrow="Nasze realizacje"
        title="Galeria"
        subtitle="Wybrane prace wykonane w D&M Laboratorium. Każda realizacja to połączenie precyzji technicznej i estetyki."
        breadcrumb="Galeria"
        photo={heroPhoto}
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {images.map((img, i) => (
              <motion.div
                key={i}
                className={styles.item}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
                onClick={() => setLightbox(i)}
              >
                <img
                  src={`/src/assets/images/${img}`}
                  alt={`Realizacja ${i + 1}`}
                  className={styles.img}
                  loading="lazy"
                />
                <div className={styles.overlay}>
                  <span className={styles.overlayIcon}>+</span>
                </div>
              </motion.div>
            ))}

            {/* Placeholder slots for client photos */}
            {[1, 2, 3].map((n) => (
              <div key={`ph-${n}`} className={`${styles.item} ${styles.placeholder}`}>
                <span className={styles.placeholderIcon}>+</span>
                <span className={styles.placeholderText}>Zdjęcie</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <button className={styles.lightboxClose} onClick={() => setLightbox(null)}>✕</button>
          <img
            src={`/src/assets/images/${images[lightbox]}`}
            alt=""
            className={styles.lightboxImg}
            onClick={(e) => e.stopPropagation()}
          />
          <div className={styles.lightboxNav}>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + images.length) % images.length); }}>←</button>
            <span>{lightbox + 1} / {images.length}</span>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % images.length); }}>→</button>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
