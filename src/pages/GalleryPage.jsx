import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../components/Layout/PageLayout.jsx';
import PageHero from '../components/PageHero/PageHero.jsx';
import heroPhoto from '../assets/images/galeria-hero.webp';
import styles from './GalleryPage.module.css';

const imageModules = import.meta.glob('../assets/images/*Projekt*.webp', { eager: true });

const imageOrder = [
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

const images = imageOrder
  .map(name => imageModules[`../assets/images/${name}`]?.default)
  .filter(Boolean);

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => { document.title = 'Galeria Realizacji — Efekty Naszej Pracy | D&M Laboratorium'; }, []);

  return (
    <PageLayout>
      <PageHero
        eyebrow="Nasze realizacje"
        title="Galeria"
        subtitle="Wybrane prace wykonane w D&M Laboratorium. Każda realizacja to połączenie precyzji technicznej i estetyki."
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
                  src={img}
                  alt={`Realizacja ${i + 1}`}
                  className={styles.img}
                  loading="lazy"
                />
                <div className={styles.overlay}>
                  <span className={styles.overlayIcon}>+</span>
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <button className={styles.lightboxClose} onClick={() => setLightbox(null)}>✕</button>
          <img
            src={images[lightbox]}
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
