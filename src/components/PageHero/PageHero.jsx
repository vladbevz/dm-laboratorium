import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PageHero.module.css';

export default function PageHero({ eyebrow, title, subtitle, breadcrumb, photo }) {
  return (
    <section className={styles.pageHero}>
      {photo && (
        <div className={styles.photoBg}>
          <img src={photo} alt="" className={styles.photoBgImg} aria-hidden="true" />
          <div className={styles.photoOverlay} />
        </div>
      )}
      <div className={styles.atmoOverlay} />
      <div className={styles.rule} />

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
