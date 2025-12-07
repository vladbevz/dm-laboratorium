import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header.jsx';
import Hero from './components/Hero/Hero.jsx';
import Services from './components/Services/Services.jsx';
import About from './components/About/About.jsx'
import Gallery from './components/Gallery/Gallery.jsx';
import Contact from './components/Contact/Contact.jsx';
import Footer from './components/Footer/Footer.jsx';
import Preloader from './components/Preloader/Preloader.jsx';


export default function App(){
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);
   if (isLoading) {
    return <Preloader />;
  }
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}