import React from 'react';
import { Heart } from 'lucide-react';
import styles from './Footer.module.css'; // Імпорт модульних стилів

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}> {/* Використовуємо module.css */}
      <div className={styles.container}>
        {/* Основна частина футера */}
        <div className={styles.content}>
          {/* Логотип */}
          <div className={styles.logo}>
            <span className={styles.logoMain}>D&M</span>
            <span className={styles.logoSub}>Laboratorium</span>
          </div>

          {/* Копірайт та права */}
          <div className={styles.copyright}>
            <p className={styles.copyrightText}>
              © {currentYear} D&M Laboratorium — Wszelkie prawa zastrzeżone
            </p>
            <p className={styles.note}>
              Stworzone z <Heart size={14} className={styles.heartIcon} /> dla perfekcyjnych uśmiechów
            </p>
          </div>

          {/* Проста навігація */}
          <div className={styles.links}>
            <a href="#contact" className={styles.link}>Kontakt</a>
            <span className={styles.separator}>•</span>
            <a href="#gallery" className={styles.link}>Galeria</a>
            <span className={styles.separator}>•</span>
            <a href="#services" className={styles.link}>Usługi</a>
          </div>
        </div>
      </div>
    </footer>
  );
}