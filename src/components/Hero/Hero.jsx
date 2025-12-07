import React, { useEffect, useRef } from 'react';
import heroImg from '../../assets/images/hero-placeholder.webp';
import styles from './Hero.module.css';

export default function Hero() {
  const heroRef = useRef();
  const contentRef = useRef();

  // Функція для плавного скролу
  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    const el = contentRef.current;
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add(styles.isVisible);
      });
    }, { threshold: 0.2 });
    
    if (el) io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.hero} ref={heroRef} id="hero">
      <div className={styles.heroBg} style={{ backgroundImage: `url(${heroImg})` }}>
        {/* Градієнтний оверлей для кращої читабельності */}
        <div className={styles.heroOverlay}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.heroInner} ref={contentRef}>
          <h1>Nowoczesne cyfrowe laboratorium protetyczne</h1>
          <p>Tworzymy protetykę, która łączy funkcję, estetykę i niezawodność.</p>
          <a className={styles.btn} href="#contact" onClick={scrollToContact}>
            Skontaktuj się z nami
          </a>
        </div>
      </div>
    </section>
  );
}