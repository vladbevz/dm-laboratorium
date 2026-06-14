import React, { useEffect, useRef, useState } from 'react';
import heroTeam from '../../assets/images/hero-team.webp';
import styles from './Hero.module.css';

export default function Hero() {
  const contentRef = useRef();
  const [photoVisible, setPhotoVisible] = useState(false);

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
          alt="Dasha i Mariya — założycielki D&M Laboratorium"
          className={styles.heroPhoto}
        />
        <div className={styles.photoFade} />
      </div>

      <div className={styles.container}>
        <div className={styles.heroInner} ref={contentRef}>
          <h1>
            Nowoczesne <em>cyfrowe</em><br />
            laboratorium protetyczne
          </h1>
          <p>
            Tworzymy protetykę, która łączy funkcję, estetykę i niezawodność.
            Precyzja CAD/CAM w każdej pracy.
          </p>
          <a className={styles.btn} href="#contact" onClick={scrollToContact}>
            Skontaktuj się
          </a>
        </div>
      </div>
    </section>
  );
}
