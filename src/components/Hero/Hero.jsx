import React, { useEffect, useRef, useState } from 'react';
import heroTeam from '../../assets/images/hero-team.webp';
import styles from './Hero.module.css';

const STRINGS = {
  pl: {
    alt: 'Dasha i Mariya — założycielki D&M Laboratorium',
    title: <>Nowoczesne <em>cyfrowe</em><br />laboratorium protetyczne w Słubicach</>,
    text: 'Protezy, korony i mosty łączące funkcję, estetykę i niezawodność. Precyzja CAD/CAM w każdej pracy — zaufany protetyk w Słubicach, współpraca z gabinetami w całej Polsce.',
    cta: 'Skontaktuj się',
  },
  de: {
    alt: 'Dasha und Mariya — Gründerinnen von D&M Laboratorium',
    title: <>Modernes <em>digitales</em><br />Dentallabor in Słubice, direkt an der deutschen Grenze</>,
    text: 'Prothesen, Kronen und Brücken, die Funktion, Ästhetik und Zuverlässigkeit vereinen. CAD/CAM-Präzision in jeder Arbeit — Ihr zuverlässiger Zahntechnik-Partner nur wenige Minuten von Frankfurt (Oder) entfernt.',
    cta: 'Kontakt aufnehmen',
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
