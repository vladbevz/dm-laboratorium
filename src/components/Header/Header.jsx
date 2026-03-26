import React, { useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const headerRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const scrollToContact = (e) => {
    e.preventDefault();
    closeMenu();
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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

  const navLinks = [
    { href: '#services', label: 'Usługi' },
    { href: '#about', label: 'O nas' },
    { href: '#gallery', label: 'Galeria' },
    { href: '#contact', label: 'Kontakt' },
  ];

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerInner}>

          {/* Logo */}
          <a className={styles.logoText} href="#" onClick={closeMenu}>
            <span className={styles.logoPart}>D&M</span>
            <span className={styles.logoPartSub}>Laboratorium</span>
          </a>

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
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => {
                  if (href === '#contact') return scrollToContact(e);
                  closeMenu();
                }}
              >
                {label}
              </a>
            ))}
            <a
              className={`${styles.contactBtn} ${styles.mobileContact}`}
              href="#contact"
              onClick={scrollToContact}
            >
              Skontaktuj się
            </a>
          </nav>

          {/* Desktop contact button */}
          <a
            className={`${styles.contactBtn} ${styles.desktopContact}`}
            href="#contact"
            onClick={scrollToContact}
          >
            Skontaktuj się
          </a>

        </div>
      </div>

      {isMenuOpen && (
        <div className={styles.menuOverlay} onClick={closeMenu} />
      )}
    </header>
  );
}
