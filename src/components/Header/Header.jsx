import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const NAV_LINKS = {
  pl: [
    { to: '/uslugi', label: 'Usługi' },
    { to: '/o-nas', label: 'O nas' },
    { to: '/galeria', label: 'Galeria' },
    { to: '/kontakt', label: 'Kontakt' },
  ],
  de: [
    { to: '/de/leistungen', label: 'Leistungen' },
    { to: '/de/ueber-uns', label: 'Über uns' },
    { to: '/de/galerie', label: 'Galerie' },
    { to: '/de/kontakt', label: 'Kontakt' },
  ],
};

const STRINGS = {
  pl: { contact: 'Skontaktuj się', contactPath: '/kontakt', home: '/' },
  de: { contact: 'Kontakt aufnehmen', contactPath: '/de/kontakt', home: '/de' },
};

const PL_TO_DE = { '/': '/de', '/uslugi': '/de/leistungen', '/o-nas': '/de/ueber-uns', '/galeria': '/de/galerie', '/kontakt': '/de/kontakt' };
const DE_TO_PL = { '/de': '/', '/de/leistungen': '/uslugi', '/de/ueber-uns': '/o-nas', '/de/galerie': '/galeria', '/de/kontakt': '/kontakt' };

function otherLangPath(pathname, lang) {
  if (lang === 'de') return DE_TO_PL[pathname] ?? '/';
  return PL_TO_DE[pathname] ?? '/de';
}

export default function Header({ lang = 'pl' }) {
  const headerRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const el = headerRef.current;
    const onScroll = () => {
      el.classList.toggle(styles.scrolled, window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles.mainNav}`) && !e.target.closest(`.${styles.burgerBtn}`)) {
        closeMenu();
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menuOpen', isMenuOpen);
  }, [isMenuOpen]);

  useEffect(() => {
    closeMenu();
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = NAV_LINKS[lang] ?? NAV_LINKS.pl;
  const t = STRINGS[lang] ?? STRINGS.pl;
  const switchTo = lang === 'de' ? 'pl' : 'de';
  const switchPath = otherLangPath(location.pathname, lang);

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerInner}>

          {/* Logo */}
          <Link className={styles.logoText} to={t.home} onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <span className={styles.logoPart}>D&M</span>
            <span className={styles.logoPartSub}>Laboratorium</span>
          </Link>

          {/* Burger */}
          <button
            className={`${styles.burgerBtn} ${isMenuOpen ? styles.active : ''}`}
            aria-label="Menu"
            onClick={toggleMenu}
          >
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </button>

          {/* Nav */}
          <nav className={`${styles.mainNav} ${isMenuOpen ? styles.open : ''}`}>
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={location.pathname === to ? styles.activeLink : ''}
                onClick={closeMenu}
              >
                {label}
              </Link>
            ))}
            <Link
              to={switchPath}
              onClick={closeMenu}
              lang={switchTo}
              aria-label={switchTo === 'de' ? 'Auf Deutsch anzeigen' : 'Przełącz na polski'}
              className={`${styles.langSwitch} ${styles.mobileLangSwitch}`}
            >
              {switchTo.toUpperCase()}
            </Link>
            <Link
              className={`${styles.contactBtn} ${styles.mobileContact}`}
              to={t.contactPath}
              onClick={closeMenu}
            >
              {t.contact}
            </Link>
          </nav>

          {/* Language switch (desktop) */}
          <Link
            to={switchPath}
            lang={switchTo}
            aria-label={switchTo === 'de' ? 'Auf Deutsch anzeigen' : 'Przełącz na polski'}
            className={`${styles.langSwitch} ${styles.desktopLangSwitch}`}
          >
            {switchTo.toUpperCase()}
          </Link>

          {/* Desktop contact button */}
          <Link
            className={`${styles.contactBtn} ${styles.desktopContact}`}
            to={t.contactPath}
            onClick={closeMenu}
          >
            {t.contact}
          </Link>

        </div>
      </div>

      {isMenuOpen && (
        <div className={styles.menuOverlay} onClick={closeMenu} />
      )}
    </header>
  );
}
