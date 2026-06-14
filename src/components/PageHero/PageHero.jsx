import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PageHero.module.css';

export default function PageHero({ eyebrow, title, subtitle, breadcrumb }) {
  return (
    <section className={styles.pageHero}>
      <div className={styles.bg} />
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
      <div className={styles.rule} />
    </section>
  );
}
