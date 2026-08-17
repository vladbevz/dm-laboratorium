import React from 'react';
import PageLayout from '../components/Layout/PageLayout.jsx';
import PageHero from '../components/PageHero/PageHero.jsx';
import Contact from '../components/Contact/Contact.jsx';
import Seo from '../components/Seo/Seo.jsx';
import heroPhoto from '../assets/images/kontakt-hero.webp';

export default function ContactPage() {
  return (
    <PageLayout>
      <Seo
        title="Kontakt — Laboratorium Protetyczne Słubice | D&M Laboratorium"
        description="Skontaktuj się z D&M Laboratorium w Słubicach — protetyk Słubice dla gabinetów stomatologicznych. Telefon, e-mail, adres: Wojska Polskiego 148/1, Słubice."
        path="/kontakt"
      />
      <PageHero
        eyebrow="Napisz do nas"
        title="Kontakt"
        subtitle="Chętnie odpowiemy na pytania i omówimy szczegóły współpracy."
        photo={heroPhoto}
      />
      <Contact />
    </PageLayout>
  );
}
