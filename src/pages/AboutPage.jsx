import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../components/Layout/PageLayout.jsx';
import PageHero from '../components/PageHero/PageHero.jsx';
import heroPhoto from '../assets/images/o-nas-hero.webp';
import photoDasha from '../assets/images/dasha.webp';
import photoMariya from '../assets/images/mariya.webp';
import styles from './AboutPage.module.css';

const team = [
  {
    photo: photoDasha,
    name: 'Dasha',
    fullName: 'Daryna Saiko',
    role: 'Współzałożycielka & Technik dentystyczny',
    bio: 'Tworzy estetyczne i funkcjonalne rozwiązania protetyczne. Łączy cyfrową precyzję z indywidualnym podejściem do każdego przypadku.',
  },
  {
    photo: photoMariya,
    name: 'Mariya',
    fullName: 'Mariia Saiko',
    role: 'Współzałożycielka & Technik dentystyczny',
    bio: 'Specjalistka w zakresie protetyki stałej i ceramiki. Pasjonatka estetyki i precyzji — każdą pracę traktuje jak dzieło sztuki.',
  },
];

const values = [
  { title: 'Precyzja', desc: 'Każda praca wykonywana jest z najwyższą dokładnością przy użyciu technologii CAD/CAM.' },
  { title: 'Estetyka', desc: 'Dbamy o to, aby każda realizacja spełniała najwyższe standardy estetyczne.' },
  { title: 'Niezawodność', desc: 'Terminowość i pełne zaangażowanie na każdym etapie współpracy.' },
  { title: 'Partnerstwo', desc: 'Stała komunikacja i wsparcie dla gabinetów stomatologicznych.' },
];

export default function AboutPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Kim jesteśmy"
        title="O nas"
        subtitle="D&M Laboratorium to nowoczesna pracownia protetyczna prowadzona przez dwie pasjonatki — Darynę i Marię Saiko."
        breadcrumb="O nas"
        photo={heroPhoto}
        photoPosition="center 25%"
      />

      {/* Team */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionEyebrow}>Założycielki</div>
          <h2 className={styles.sectionTitle}>Nasz <em>zespół</em></h2>
          <div className={styles.sectionDivider} />

          <div className={styles.teamGrid}>
            {team.map((member, i) => (
              <motion.div
                key={i}
                className={styles.teamCard}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2, ease: [0.4, 0, 0.2, 1] }}
                viewport={{ once: true }}
              >
                <div className={styles.photoWrap}>
                  <img src={member.photo} alt={member.fullName} className={styles.photo} />
                </div>
                <div className={styles.memberInfo}>
                  <div className={styles.memberRole}>{member.role}</div>
                  <div className={styles.memberName}>{member.fullName}</div>
                  <div className={styles.memberDivider} />
                  <p className={styles.memberBio}>{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab photos placeholder */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.container}>
          <div className={styles.sectionEyebrow}>Nasze laboratorium</div>
          <h2 className={styles.sectionTitle}>Miejsce, gdzie powstają <em>prace</em></h2>
          <div className={styles.sectionDivider} />
          <div className={styles.labGrid}>
            {[1, 2, 3].map((n) => (
              <div key={n} className={styles.photoPlaceholder}>
                <span className={styles.placeholderIcon}>+</span>
                <span className={styles.placeholderText}>Zdjęcie laboratorium</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionEyebrow}>Nasze wartości</div>
          <h2 className={styles.sectionTitle}>Na czym <em>stoimy</em></h2>
          <div className={styles.sectionDivider} />
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <motion.div
                key={i}
                className={styles.valueCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={styles.valueAccent} />
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
