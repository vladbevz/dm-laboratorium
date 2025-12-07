import React, { useEffect, useRef } from 'react';
import styles from './Services.module.css';

export default function Services() {
  const sectionRef = useRef();
  const cardsRef = useRef([]);

  const items = [
    { title: 'Precyzja i powtarzalność', desc: 'Dzięki technologiom CAD/CAM każda praca jest wykonana z najwyższą dokładnością.' },
    { title: 'Wsparcie dla lekarzy', desc: 'Stała komunikacja, konsultacje i szybka pomoc w trudnych przypadkach.' },
    { title: 'Nowoczesne materiały', desc: 'Pracujemy na sprawdzonych systemach, gwarantujących trwałość i estetykę.' },
    { title: 'Terminowość', desc: 'Szanujemy czas — Twój i pacjenta. Zawsze dotrzymujemy ustaleń.' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className={`${styles.section} ${styles.services}`} ref={sectionRef}>
      <div className={styles.container}>
        {/* Заголовок секції */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionSubtitle}>Co oferujemy</span>
          <h2 className={styles.sectionTitle}>Usługi</h2>
          <div className={styles.sectionDivider}></div>
          <p className={styles.sectionDescription}>
            Kompleksowe rozwiązania w nowoczesnym laboratorium stomatologicznym
          </p>
        </div>

        {/* Картки послуг */}
        <div className={styles.servicesGrid}>
          {items.map((item, index) => (
            <div
              className={styles.serviceCard}
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              style={{ '--delay': `${index * 0.1}s` }}
            >
            
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.desc}</p>
              </div>
              <div className={styles.cardHoverEffect}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}