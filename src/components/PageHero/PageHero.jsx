import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PageHero.module.css';

export default function PageHero({ eyebrow, title, subtitle, breadcrumb, photo }) {
  const contentRef = useRef();
  const [photoVisible, setPhotoVisible] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.isVisible);
          setTimeout(() => setPhotoVisible(true), 300);
        }
      });
    }, { threshold: 0.1 });
    if (el) io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.pageHero}>
      <div className={styles.heroBg}>
        <div className={styles.heroOverlay} />
      </div>
      <div className={styles.heroRule} />

      {photo && (
        <div className={`${styles.heroPhotoWrap} ${photoVisible ? styles.photoVisible : ''}`}>
          <img src={photo} alt="" className={styles.heroPhoto} aria-hidden="true" />
          <div className={styles.photoFade} />
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.heroInner} ref={contentRef}>
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
      </div>
    </section>
  );
}
