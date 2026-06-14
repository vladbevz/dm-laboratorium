import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PageHero.module.css';

export default function PageHero({ eyebrow, title, subtitle, breadcrumb, photo }) {
  return (
    <section className={styles.pageHero}>
      {/* Atmospheric background */}
      <div className={styles.heroBg}>
        <div className={styles.heroOverlay} />
      </div>

      {/* Photo — right side, full height, same as main Hero */}
      {photo && (
        <div className={styles.heroPhotoWrap}>
          <img src={photo} alt="" className={styles.heroPhoto} aria-hidden="true" />
          <div className={styles.photoFade} />
        </div>
      )}

      <div className={styles.heroRule} />

      <div className={styles.container}>
        {breadcrumb && (
          <nav className={styles.breadcrumb}>
            <Link to="/" className={styles.breadcrumbLink}>Strona główna</Link>
            <span className={styles.breadcrumbSep}>—</span>
            <span className={styles.breadcrumbCurrent}>{breadcrumb}</span>
          </nav>
        )}
        {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </section>
  );
}
