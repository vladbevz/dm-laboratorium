import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../components/Layout/PageLayout.jsx';
import PageHero from '../components/PageHero/PageHero.jsx';
import Seo from '../components/Seo/Seo.jsx';
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
  '16_Projekt bez nazwy.webp',
  '17_Projekt bez nazwy.webp',
  '18_Projekt bez nazwy.webp',
  '19_Projekt bez nazwy.webp',
];

const images = imageOrder
  .map(name => imageModules[`../assets/images/${name}`]?.default)
  .filter(Boolean);

const CONTENT = {
  pl: {
    seoTitle: 'Galeria Realizacji Protetycznych Słubice | D&M Laboratorium',
    seoDescription: 'Zobacz realizacje pracowni protetycznej D&M Laboratorium w Słubicach — korony, mosty, protezy i prace implantoprotetyczne wykonane z precyzją CAD/CAM.',
    path: '/galeria',
    eyebrow: 'Nasze realizacje',
    title: 'Galeria',
    subtitle: 'Wybrane prace wykonane w D&M Laboratorium. Każda realizacja to połączenie precyzji technicznej i estetyki.',
    breadcrumb: 'Galeria',
    homePath: '/',
    homeLabel: 'Strona główna',
    imgAlt: (i) => `Realizacja protetyczna ${i} — D&M Laboratorium Słubice`,
    close: 'Zamknij',
    prev: 'Poprzednie',
    next: 'Następne',
  },
  de: {
    seoTitle: 'Galerie unserer zahntechnischen Arbeiten Słubice | D&M Laboratorium',
    seoDescription: 'Sehen Sie Arbeiten des Dentallabors D&M Laboratorium in Słubice — Kronen, Brücken, Prothesen und Implantatprothetik, gefertigt mit CAD/CAM-Präzision.',
    path: '/de/galerie',
    eyebrow: 'Unsere Arbeiten',
    title: 'Galerie',
    subtitle: 'Ausgewählte Arbeiten aus D&M Laboratorium. Jede Arbeit verbindet technische Präzision mit Ästhetik.',
    breadcrumb: 'Galerie',
    homePath: '/de',
    homeLabel: 'Startseite',
    imgAlt: (i) => `Zahntechnische Arbeit ${i} — D&M Laboratorium Słubice`,
    close: 'Schließen',
    prev: 'Zurück',
    next: 'Weiter',
  },
};

const ALTERNATES = [
  { lang: 'pl', path: '/galeria' },
  { lang: 'de', path: '/de/galerie' },
  { lang: 'x-default', path: '/galeria' },
];

export default function GalleryPage({ lang = 'pl' }) {
  const [lightbox, setLightbox] = useState(null);
  const c = CONTENT[lang] ?? CONTENT.pl;

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
                  alt={c.imgAlt(i + 1)}
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
          <button className={styles.lightboxClose} onClick={() => setLightbox(null)} aria-label={c.close}>✕</button>
          <img
            src={images[lightbox]}
            alt=""
            className={styles.lightboxImg}
            onClick={(e) => e.stopPropagation()}
          />
          <div className={styles.lightboxNav}>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + images.length) % images.length); }} aria-label={c.prev}>←</button>
            <span>{lightbox + 1} / {images.length}</span>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % images.length); }} aria-label={c.next}>→</button>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
