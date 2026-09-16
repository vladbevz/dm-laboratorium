import React, { useEffect, useRef, useState } from 'react';
import heroTeam from '../../assets/images/hero-team.webp';
import styles from './Hero.module.css';

const STRINGS = {
  pl: {
    alt: 'Dasha i Mariya — założycielki D&M Laboratorium',
    title: <>Cyfrowe laboratorium protetyczne <em>w Słubicach</em><br />dla gabinetów w całej Polsce</>,
    text: 'Precyzyjne korony, mosty i prace implantoprotetyczne CAD/CAM. Jasna komunikacja, kontrola każdego etapu i terminowa realizacja.',
    cta: 'Wyślij przypadek do konsultacji',
  },
  de: {
    alt: 'Dasha und Mariya — Gründerinnen von D&M Laboratorium',
    title: <>Digitales Dentallabor <em>in Słubice</em><br />für Zahnarztpraxen in Polen und Deutschland</>,
    text: 'Präzise Kronen, Brücken und Implantatarbeiten aus CAD/CAM-Fertigung. Klare Kommunikation, Kontrolle in jeder Phase und termingerechte Lieferung.',
    cta: 'Fall zur Beratung senden',
  },
};

export default function Hero({ lang = 'pl' }) {
  const contentRef = useRef();
  const [photoVisible, setPhotoVisible] = useState(false);
  const t = STRINGS[lang] ?? STRINGS.pl;

  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const el = contentRef.current;
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.isVisible);
          setTimeout(() => setPhotoVisible(true), 300);
        }
      });
    }, { threshold: 0.2 });
    if (el) io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.heroBg}>
        <div className={styles.heroOverlay} />
      </div>
      <div className={styles.heroRule} />

      <div className={`${styles.heroPhotoWrap} ${photoVisible ? styles.photoVisible : ''}`}>
        <img
          src={heroTeam}
          alt={t.alt}
          className={styles.heroPhoto}
        />
        <div className={styles.photoFade} />
      </div>

      <div className={styles.container}>
        <div className={styles.heroInner} ref={contentRef}>
          <h1>
            {t.title}
          </h1>
          <p>
            {t.text}
          </p>
          <a className={styles.btn} href="#contact" onClick={scrollToContact}>
            {t.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
