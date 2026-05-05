import React from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import photoDaria from '../../assets/photo_2026-05-05_21-20-27.jpg';
import photoMonika from '../../assets/photo_2026-05-05_21-20-29.jpg';

const team = [
  {
    photo: photoDaria,
    name: 'D.',
    role: 'Współzałożycielka & Technik dentystyczny',
    bio: 'Specjalistka w zakresie protetyki stałej i ceramiki. Pasjonatka estetyki i precyzji — każdą pracę traktuje jak dzieło sztuki.',
  },
  {
    photo: photoMonika,
    name: 'M.',
    role: 'Współzałożycielka & Technik dentystyczny',
    bio: 'Ekspertka od protez ruchomych i szkieletowych. Łączy tradycyjne rzemiosło z nowoczesnymi technikami cyfrowymi.',
  },
];

export default function About() {
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
              <div className={styles.eyebrow}>O nas</div>

              <p className={styles.mainText}>
                <span className={styles.brandName}>D&amp;M Laboratorium</span> —{' '}
                <span className={styles.highlight}>precyzja</span>,{' '}
                <span className={styles.highlight}>estetyka</span>,{' '}
                <span className={styles.highlight}>niezawodność</span>.
              </p>

              <div className={styles.divider} />

              <p className={styles.description}>
                Tworzymy prace protetyczne oparte na doświadczeniu, nowoczesnej technologii
                i dbałości o każdy detal. Wspieramy gabinety stomatologiczne w realizacji
                nawet najbardziej wymagających przypadków, oferując terminowość i pełne zaangażowanie.
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
          Założycielki
        </motion.div>

        <div className={styles.teamGrid}>
          {team.map((member, i) => (
            <motion.div
              key={i}
              className={styles.teamCard}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: i * 0.18, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true }}
            >
              <div className={styles.photoFrame}>
                <img src={member.photo} alt={member.name} className={styles.memberPhoto} />
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
