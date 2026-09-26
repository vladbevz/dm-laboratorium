import React from 'react';
import PageLayout from '../components/Layout/PageLayout.jsx';
import PageHero from '../components/PageHero/PageHero.jsx';
import Contact from '../components/Contact/Contact.jsx';
import OrderForms from '../components/OrderForms/OrderForms.jsx';
import Seo from '../components/Seo/Seo.jsx';
import heroPhoto from '../assets/images/kontakt-hero.webp';

const CONTENT = {
  pl: {
    seoTitle: 'Kontakt — Laboratorium Protetyczne Słubice | D&M Laboratorium',
    seoDescription: 'Skontaktuj się z D&M Laboratorium w Słubicach — protetyk Słubice dla gabinetów stomatologicznych. Telefon, e-mail, adres: Wojska Polskiego 148/1, Słubice.',
    path: '/kontakt',
    eyebrow: 'Napisz do nas',
    title: 'Kontakt',
    subtitle: 'Chętnie odpowiemy na pytania i omówimy szczegóły współpracy.',
    breadcrumb: 'Kontakt',
    homePath: '/',
    homeLabel: 'Strona główna',
  },
  de: {
    seoTitle: 'Kontakt — Dentallabor Słubice | D&M Laboratorium',
    seoDescription: 'Kontaktieren Sie D&M Laboratorium in Słubice — Ihr Dentallabor für Zahnarztpraxen aus Deutschland und Polen, nur wenige Minuten von Frankfurt (Oder). Telefon, E-Mail, Adresse: Wojska Polskiego 148/1, Słubice.',
    path: '/de/kontakt',
    eyebrow: 'Schreiben Sie uns',
    title: 'Kontakt',
    subtitle: 'Wir beantworten gerne Ihre Fragen und besprechen die Details einer möglichen Zusammenarbeit.',
    breadcrumb: 'Kontakt',
    homePath: '/de',
    homeLabel: 'Startseite',
  },
};

const ALTERNATES = [
  { lang: 'pl', path: '/kontakt' },
  { lang: 'de', path: '/de/kontakt' },
  { lang: 'x-default', path: '/kontakt' },
];

export default function ContactPage({ lang = 'pl' }) {
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
        eyebrow={c.eyebrow}
        title={c.title}
        subtitle={c.subtitle}
        breadcrumb={c.breadcrumb}
        homePath={c.homePath}
        homeLabel={c.homeLabel}
        photo={heroPhoto}
      />
      <OrderForms lang={lang} />
      <Contact lang={lang} />
    </PageLayout>
  );
}
