import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header.jsx';
import Hero from '../components/Hero/Hero.jsx';
import HowItWorks from '../components/HowItWorks/HowItWorks.jsx';
import Services from '../components/Services/Services.jsx';
import About from '../components/About/About.jsx';
import Reviews from '../components/Reviews/Reviews.jsx';
import Gallery from '../components/Gallery/Gallery.jsx';
import Contact from '../components/Contact/Contact.jsx';
import Footer from '../components/Footer/Footer.jsx';
import Preloader from '../components/Preloader/Preloader.jsx';
import Seo from '../components/Seo/Seo.jsx';

const SEO = {
  pl: {
    title: 'D&M Laboratorium — Pracownia Protetyczna Słubice | Protezy, Korony, Mosty CAD/CAM',
    description: 'D&M Laboratorium — pracownia protetyczna w Słubicach (woj. lubuskie), współpracująca z gabinetami stomatologicznymi w całej Polsce. Protezy całkowite, naprawa protez, korony i mosty CAD/CAM.',
    path: '/',
  },
  de: {
    title: 'D&M Laboratorium — Dentallabor Słubice, nahe Frankfurt (Oder) | Prothesen, Kronen, Brücken CAD/CAM',
    description: 'D&M Laboratorium — modernes Dentallabor in Słubice (Polen), nur wenige Minuten von Frankfurt (Oder). Zusammenarbeit mit Zahnarztpraxen in Deutschland und Polen. Vollprothesen, Prothesenreparatur, CAD/CAM-Kronen und -Brücken.',
    path: '/de',
  },
};

const ALTERNATES = [
  { lang: 'pl', path: '/' },
  { lang: 'de', path: '/de' },
  { lang: 'x-default', path: '/' },
];

const PRELOADER_KEY = 'dm_preloader_shown';

function hasShownPreloader() {
  try {
    return sessionStorage.getItem(PRELOADER_KEY) === '1';
  } catch {
    return false;
  }
}

function markPreloaderShown() {
  try {
    sessionStorage.setItem(PRELOADER_KEY, '1');
  } catch {
    // ignore — worst case the preloader shows again
  }
}

export default function HomePage({ lang = 'pl' }) {
  const [isLoading, setIsLoading] = useState(() => !hasShownPreloader());
  const seo = SEO[lang] ?? SEO.pl;

  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => {
      markPreloaderShown();
      setIsLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, [isLoading]);

  if (isLoading) return <Preloader />;

  return (
    <div>
      <Seo
        title={seo.title}
        description={seo.description}
        path={seo.path}
        lang={lang}
        alternates={ALTERNATES}
      />
      <Header lang={lang} />
      <main>
        <Hero lang={lang} />
        <HowItWorks lang={lang} />
        <Services lang={lang} />
        <About lang={lang} />
        <Reviews lang={lang} />
        <Gallery lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
