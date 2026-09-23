import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const STRINGS = {
  pl: {
    links: [
      { to: '/', label: 'Główna' },
      { to: '/uslugi', label: 'Usługi' },
      { to: '/o-nas', label: 'O nas' },
      { to: '/galeria', label: 'Galeria' },
      { to: '/obszar-dzialania', label: 'Obszar działania' },
      { to: '/kontakt', label: 'Kontakt' },
    ],
    rights: 'Wszelkie prawa zastrzeżone',
    tagline: 'dla perfekcyjnych uśmiechów',
    taglinePrefix: 'Stworzone z',
    legal: 'Polityka Prywatności',
    legalPath: '/polityka-prywatnosci',
  },
  de: {
    links: [
      { to: '/de', label: 'Startseite' },
      { to: '/de/leistungen', label: 'Leistungen' },
      { to: '/de/ueber-uns', label: 'Über uns' },
      { to: '/de/galerie', label: 'Galerie' },
      { to: '/de/kontakt', label: 'Kontakt' },
    ],
    rights: 'Alle Rechte vorbehalten',
    tagline: 'für perfekte Lächeln',
    taglinePrefix: 'Erstellt mit',
    legal: 'Datenschutzerklärung',
    legalPath: '/polityka-prywatnosci',
  },
};

export default function Footer({ lang = 'pl' }) {
  const currentYear = new Date().getFullYear();
  const t = STRINGS[lang] ?? STRINGS.pl;

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
            {t.links.map(({ to, label }, i) => (
              <React.Fragment key={to}>
                {i > 0 && <span className={styles.separator}>◆</span>}
                <Link to={to} className={styles.link}>{label}</Link>
              </React.Fragment>
            ))}
          </nav>

          <div className={styles.copyright}>
            <p className={styles.copyrightText}>
              © {currentYear} D&M Laboratorium — {t.rights}
            </p>
            <p className={styles.note}>
              {t.taglinePrefix} <Heart size={12} className={styles.heartIcon} /> {t.tagline}
            </p>
            <p className={styles.legal}>
              <Link to={t.legalPath} className={styles.legalLink}>{t.legal}</Link>
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
