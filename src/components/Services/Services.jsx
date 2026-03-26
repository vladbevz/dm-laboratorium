import React, { useEffect, useRef } from 'react';
import styles from './Services.module.css';

const items = [
  {
    title: 'Precyzja i powtarzalność',
    desc: 'Dzięki technologiom CAD/CAM każda praca jest wykonana z najwyższą dokładnością i idealną powtarzalnością.',
  },
  {
    title: 'Wsparcie dla lekarzy',
    desc: 'Stała komunikacja, konsultacje i szybka pomoc w trudnych przypadkach — jesteśmy partnerem, nie tylko dostawcą.',
  },
  {
    title: 'Nowoczesne materiały',
    desc: 'Pracujemy na sprawdzonych systemach i certyfikowanych materiałach, gwarantujących trwałość i estetykę.',
  },
  {
    title: 'Terminowość',
    desc: 'Szanujemy czas — Twój i pacjenta. Każde zlecenie realizujemy zgodnie z ustalonym harmonogramem.',
  },
];

export default function Services() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add(styles.visible);
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => { if (card) observer.observe(card); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>Co oferujemy</div>
          <h2 className={styles.sectionTitle}>
            Nasze <strong>Usługi</strong>
          </h2>
          <div className={styles.sectionDivider} />
          <p className={styles.sectionDescription}>
            Kompleksowe rozwiązania w nowoczesnym laboratorium stomatologicznym
          </p>
        </div>

        <div className={styles.servicesGrid}>
          {items.map((item, i) => (
            <div
              key={i}
              className={styles.serviceCard}
              ref={(el) => (cardsRef.current[i] = el)}
            >
              <span className={styles.cardNumber}>0{i + 1}</span>
              <span className={styles.cardAccent} />
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDescription}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
