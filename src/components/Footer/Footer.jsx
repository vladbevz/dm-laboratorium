import React from 'react';
import { Heart } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>

          <div className={styles.logo}>
            <span className={styles.logoMain}>D&M</span>
            <span className={styles.logoSub}>Laboratorium</span>
          </div>

          <div className={styles.footerDivider} />

          <nav className={styles.links}>
            <a href="#services" className={styles.link} onClick={e => scrollTo(e, 'services')}>Usługi</a>
            <span className={styles.separator}>◆</span>
            <a href="#about" className={styles.link} onClick={e => scrollTo(e, 'about')}>O nas</a>
            <span className={styles.separator}>◆</span>
            <a href="#gallery" className={styles.link} onClick={e => scrollTo(e, 'gallery')}>Galeria</a>
            <span className={styles.separator}>◆</span>
            <a href="#contact" className={styles.link} onClick={e => scrollTo(e, 'contact')}>Kontakt</a>
          </nav>

          <div className={styles.copyright}>
            <p className={styles.copyrightText}>
              © {currentYear} D&M Laboratorium — Wszelkie prawa zastrzeżone
            </p>
            <p className={styles.note}>
              Stworzone z <Heart size={12} className={styles.heartIcon} /> dla perfekcyjnych uśmiechów
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
