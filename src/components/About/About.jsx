import React from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import photoMariya from '../../assets/images/mariya.webp';
import photoDasha from '../../assets/images/dasha.webp';

const CONTENT = {
  pl: {
    eyebrow: 'O nas',
    mainText: (
      <>
        <span className={styles.brandName}>D&amp;M Laboratorium</span> —{' '}
        <span className={styles.highlight}>precyzja</span>,{' '}
        <span className={styles.highlight}>estetyka</span>,{' '}
        <span className={styles.highlight}>niezawodność</span>.
      </>
    ),
    description: 'Tworzymy prace protetyczne oparte na doświadczeniu, nowoczesnej technologii i dbałości o każdy detal. Wspieramy gabinety stomatologiczne w realizacji nawet najbardziej wymagających przypadków, oferując terminowość i pełne zaangażowanie.',
    teamEyebrow: 'Nasz zespół',
    team: [
      {
        photo: photoDasha,
        name: 'Daryna',
        role: 'Współzałożycielka & Technik dentystyczny',
        bio: 'Tworzy estetyczne i funkcjonalne rozwiązania protetyczne. Łączy cyfrową precyzję z indywidualnym podejściem do każdego przypadku.',
      },
      {
        photo: photoMariya,
        name: 'Mariia',
        role: 'Współzałożycielka & Technik dentystyczny',
        bio: 'Specjalistka w zakresie protetyki stałej i ceramiki. Pasjonatka estetyki i precyzji — każdą pracę traktuje jak dzieło sztuki.',
      },
    ],
  },
  de: {
    eyebrow: 'Über uns',
    mainText: (
      <>
        <span className={styles.brandName}>D&amp;M Laboratorium</span> —{' '}
        <span className={styles.highlight}>Präzision</span>,{' '}
        <span className={styles.highlight}>Ästhetik</span>,{' '}
        <span className={styles.highlight}>Zuverlässigkeit</span>.
      </>
    ),
    description: 'Wir fertigen zahntechnische Arbeiten auf Basis von Erfahrung, moderner Technologie und Liebe zum Detail. Wir unterstützen Zahnarztpraxen bei der Umsetzung auch anspruchsvollster Fälle — mit Termintreue und vollem Engagement.',
    teamEyebrow: 'Unser Team',
    team: [
      {
        photo: photoDasha,
        name: 'Daryna',
        role: 'Mitgründerin & Zahntechnikerin',
        bio: 'Entwickelt ästhetische und funktionale prothetische Lösungen. Verbindet digitale Präzision mit einem individuellen Ansatz für jeden Fall.',
      },
      {
        photo: photoMariya,
        name: 'Mariia',
        role: 'Mitgründerin & Zahntechnikerin',
        bio: 'Spezialistin für festsitzenden Zahnersatz und Keramik. Leidenschaft für Ästhetik und Präzision — jede Arbeit wird wie ein Kunstwerk behandelt.',
      },
    ],
  },
};

export default function About({ lang = 'pl' }) {
  const c = CONTENT[lang] ?? CONTENT.pl;

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>

        <div className={styles.textContainer}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
            className={styles.textWrapper}
          >
            <div className={styles.textContent}>
              <div className={styles.eyebrow}>{c.eyebrow}</div>

              <p className={styles.mainText}>
                {c.mainText}
              </p>

              <div className={styles.divider} />

              <p className={styles.description}>
                {c.description}
              </p>
            </div>
          </motion.div>
        </div>

        <div className={styles.teamSeparator} />

        <motion.div
          className={styles.teamEyebrow}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {c.teamEyebrow}
        </motion.div>

        <div className={styles.teamGrid}>
          {c.team.map((member, i) => (
            <motion.div
              key={i}
              className={styles.teamCard}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: i * 0.18, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true }}
            >
              <div className={styles.photoFrame}>
                <img
                  src={member.photo}
                  alt={`${member.name} — ${member.role}, D&M Laboratorium Słubice`}
                  className={styles.memberPhoto}
                  loading="lazy"
                />
                <div className={styles.photoOverlay} />
              </div>
              <div className={styles.memberInfo}>
                <div className={styles.memberRole}>{member.role}</div>
                <div className={styles.memberName}>{member.name}</div>
                <div className={styles.memberDivider} />
                <p className={styles.memberBio}>{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
