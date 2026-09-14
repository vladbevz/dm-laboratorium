import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../components/Layout/PageLayout.jsx';
import PageHero from '../components/PageHero/PageHero.jsx';
import Seo from '../components/Seo/Seo.jsx';
import heroPhoto from '../assets/images/o-nas-hero.webp';
import photoDasha from '../assets/images/dasha.webp';
import photoMariya from '../assets/images/mariya.webp';
import beforeAfter1 from '../assets/images/before-after-1.webp';
import beforeAfter2 from '../assets/images/before-after-2.webp';
import beforeAfter3 from '../assets/images/before-after-3.webp';
import styles from './AboutPage.module.css';

const CONTENT = {
  pl: {
    seoTitle: 'O nas — Laboratorium Protetyczne Słubice | D&M Laboratorium',
    seoDescription: 'Poznaj D&M Laboratorium — pracownię protetyczną w Słubicach prowadzoną przez Darynę i Marię Saiko. Protetyk Słubice z doświadczeniem w CAD/CAM, ceramice i protetyce implantologicznej.',
    path: '/o-nas',
    heroEyebrow: 'Kim jesteśmy',
    heroTitle: 'O nas',
    heroSubtitle: 'D&M Laboratorium to nowoczesna pracownia protetyczna prowadzona przez dwie pasjonatki — Darynę i Marię Saiko.',
    breadcrumb: 'O nas',
    homePath: '/',
    homeLabel: 'Strona główna',
    teamEyebrow: 'POZNAJ NAS',
    teamTitle: <>Nasz <em>zespół</em></>,
    team: [
      {
        photo: photoDasha,
        name: 'Dasha',
        fullName: 'Daryna Saiko',
        role: 'Współzałożycielka & Technik dentystyczny, Higienistka stomatologiczna',
        bio: 'Tworzy estetyczne i funkcjonalne rozwiązania protetyczne. Łączy cyfrową precyzję z indywidualnym podejściem do każdego przypadku.',
      },
      {
        photo: photoMariya,
        name: 'Mariya',
        fullName: 'Mariia Saiko',
        role: 'Współzałożycielka & Technik dentystyczny',
        bio: 'Specjalistka w zakresie protetyki stałej i ceramiki. Pasjonatka estetyki i precyzji — każdą pracę traktuje jak dzieło sztuki.',
      },
    ],
    baEyebrow: 'Efekty naszej pracy',
    baTitle: <>Jak zmieniamy <em>uśmiechy</em></>,
    baBefore: 'Przed',
    baAfter: 'Po',
    baAlt: (n) => `Transformacja protetyczna przed i po ${n} — D&M Laboratorium Słubice`,
    valuesEyebrow: 'Nasze wartości',
    valuesTitle: <>Na czym <em>stoimy</em></>,
    values: [
      { title: 'Precyzja', desc: 'Każda praca wykonywana jest z najwyższą dokładnością przy użyciu technologii CAD/CAM.' },
      { title: 'Estetyka', desc: 'Dbamy o to, aby każda realizacja spełniała najwyższe standardy estetyczne.' },
      { title: 'Niezawodność', desc: 'Terminowość i pełne zaangażowanie na każdym etapie współpracy.' },
      { title: 'Partnerstwo', desc: 'Stała komunikacja i wsparcie dla gabinetów stomatologicznych.' },
    ],
  },
  de: {
    seoTitle: 'Über uns — Dentallabor Słubice | D&M Laboratorium',
    seoDescription: 'Lernen Sie D&M Laboratorium kennen — ein modernes Dentallabor in Słubice, geleitet von Daryna und Mariia Saiko. Zahntechnik-Expertise in CAD/CAM, Keramik und Implantatprothetik, nur wenige Minuten von Frankfurt (Oder).',
    path: '/de/ueber-uns',
    heroEyebrow: 'Wer wir sind',
    heroTitle: 'Über uns',
    heroSubtitle: 'D&M Laboratorium ist ein modernes Dentallabor, geführt von zwei leidenschaftlichen Zahntechnikerinnen — Daryna und Mariia Saiko.',
    breadcrumb: 'Über uns',
    homePath: '/de',
    homeLabel: 'Startseite',
    teamEyebrow: 'LERNEN SIE UNS KENNEN',
    teamTitle: <>Unser <em>Team</em></>,
    team: [
      {
        photo: photoDasha,
        name: 'Dasha',
        fullName: 'Daryna Saiko',
        role: 'Mitgründerin & Zahntechnikerin, Dentalhygienikerin',
        bio: 'Entwickelt ästhetische und funktionale prothetische Lösungen. Verbindet digitale Präzision mit einem individuellen Ansatz für jeden Fall.',
      },
      {
        photo: photoMariya,
        name: 'Mariya',
        fullName: 'Mariia Saiko',
        role: 'Mitgründerin & Zahntechnikerin',
        bio: 'Spezialistin für festsitzenden Zahnersatz und Keramik. Leidenschaft für Ästhetik und Präzision — jede Arbeit wird wie ein Kunstwerk behandelt.',
      },
    ],
    baEyebrow: 'Ergebnisse unserer Arbeit',
    baTitle: <>Wie wir <em>Lächeln</em> verändern</>,
    baBefore: 'Vorher',
    baAfter: 'Nachher',
    baAlt: (n) => `Prothetische Transformation vorher-nachher ${n} — D&M Laboratorium Słubice`,
    valuesEyebrow: 'Unsere Werte',
    valuesTitle: <>Wofür wir <em>stehen</em></>,
    values: [
      { title: 'Präzision', desc: 'Jede Arbeit wird mit höchster Genauigkeit unter Einsatz von CAD/CAM-Technologie ausgeführt.' },
      { title: 'Ästhetik', desc: 'Wir achten darauf, dass jede Arbeit höchste ästhetische Standards erfüllt.' },
      { title: 'Zuverlässigkeit', desc: 'Termintreue und volles Engagement in jeder Phase der Zusammenarbeit.' },
      { title: 'Partnerschaft', desc: 'Ständige Kommunikation und Unterstützung für Zahnarztpraxen.' },
    ],
  },
};

const ALTERNATES = [
  { lang: 'pl', path: '/o-nas' },
  { lang: 'de', path: '/de/ueber-uns' },
  { lang: 'x-default', path: '/o-nas' },
];

export default function AboutPage({ lang = 'pl' }) {
  const c = CONTENT[lang] ?? CONTENT.pl;

  return (
    <PageLayout lang={lang}>
      <Seo
        title={c.seoTitle}
        description={c.seoDescription}
        path={c.path}
        lang={lang}
        alternates={ALTERNATES}
      />
      <PageHero
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
        breadcrumb={c.breadcrumb}
        homePath={c.homePath}
        homeLabel={c.homeLabel}
        photo={heroPhoto}
        photoPosition="center 25%"
      />

      {/* Team */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionEyebrow}>{c.teamEyebrow}</div>
          <h2 className={styles.sectionTitle}>{c.teamTitle}</h2>
          <div className={styles.sectionDivider} />

          <div className={styles.teamGrid}>
            {c.team.map((member, i) => (
              <motion.div
                key={i}
                className={styles.teamCard}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2, ease: [0.4, 0, 0.2, 1] }}
                viewport={{ once: true }}
              >
                <div className={styles.photoWrap}>
                  <img
                    src={member.photo}
                    alt={`${member.fullName} — ${member.role}, D&M Laboratorium Słubice`}
                    className={styles.photo}
                    loading="lazy"
                  />
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

      {/* Before / After */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.container}>
          <div className={styles.sectionEyebrow}>{c.baEyebrow}</div>
          <h2 className={styles.sectionTitle}>{c.baTitle}</h2>
          <div className={styles.sectionDivider} />
          <div className={styles.beforeAfterGrid}>
            {[1, 2, 3].map((n) => (
              <motion.div
                key={n}
                className={styles.beforeAfterCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: n * 0.1, ease: [0.4, 0, 0.2, 1] }}
                viewport={{ once: true }}
              >
                <div className={styles.beforeAfterImgWrap}>
                  <img
                    src={[beforeAfter1, beforeAfter2, beforeAfter3][n - 1]}
                    alt={c.baAlt(n)}
                    className={styles.beforeAfterImg}
                    loading="lazy"
                  />
                </div>
                <div className={styles.beforeAfterLabel}>
                  <span>{c.baBefore}</span>
                  <span className={styles.labelDivider} />
                  <span>{c.baAfter}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionEyebrow}>{c.valuesEyebrow}</div>
          <h2 className={styles.sectionTitle}>{c.valuesTitle}</h2>
          <div className={styles.sectionDivider} />
          <div className={styles.valuesGrid}>
            {c.values.map((v, i) => (
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
