import React from 'react';
import PageLayout from '../components/Layout/PageLayout.jsx';
import PageHero from '../components/PageHero/PageHero.jsx';
import Contact from '../components/Contact/Contact.jsx';

export default function ContactPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Napisz do nas"
        title="Kontakt"
        subtitle="Chętnie odpowiemy na pytania i omówimy szczegóły współpracy."
        breadcrumb="Kontakt"
      />
      <Contact />
    </PageLayout>
  );
}
