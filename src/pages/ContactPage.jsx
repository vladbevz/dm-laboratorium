import React from 'react';
import PageLayout from '../components/Layout/PageLayout.jsx';
import PageHero from '../components/PageHero/PageHero.jsx';
import Contact from '../components/Contact/Contact.jsx';
import heroPhoto from '../assets/images/kontakt-hero.webp';

export default function ContactPage() {
  return (
    <PageLayout>
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
