import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
            <Link to="/uslugi" className={styles.link}>Usługi</Link>
            <span className={styles.separator}>◆</span>
            <Link to="/o-nas" className={styles.link}>O nas</Link>
            <span className={styles.separator}>◆</span>
            <Link to="/galeria" className={styles.link}>Galeria</Link>
            <span className={styles.separator}>◆</span>
            <Link to="/kontakt" className={styles.link}>Kontakt</Link>
          </nav>

          <div className={styles.copyright}>
            <p className={styles.copyrightText}>
              © {currentYear} D&M Laboratorium — Wszelkie prawa zastrzeżone
            </p>
            <p className={styles.note}>
              Stworzone z <Heart size={12} className={styles.heartIcon} /> dla perfekcyjnych uśmiechów
            </p>
            <p className={styles.legal}>
              <Link to="/polityka-prywatnosci" className={styles.legalLink}>Polityka Prywatności</Link>
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
