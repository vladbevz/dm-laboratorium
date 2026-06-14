import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
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

  const navLinks = [
    { to: '/uslugi', label: 'Usługi' },
    { to: '/o-nas', label: 'O nas' },
    { to: '/galeria', label: 'Galeria' },
    { to: '/kontakt', label: 'Kontakt' },
  ];

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerInner}>

          {/* Logo */}
          <Link className={styles.logoText} to="/" onClick={closeMenu}>
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
              className={`${styles.contactBtn} ${styles.mobileContact}`}
              to="/kontakt"
              onClick={closeMenu}
            >
              Skontaktuj się
            </Link>
          </nav>

          {/* Desktop contact button */}
          <Link
            className={`${styles.contactBtn} ${styles.desktopContact}`}
            to="/kontakt"
            onClick={closeMenu}
          >
            Skontaktuj się
          </Link>

        </div>
      </div>

      {isMenuOpen && (
        <div className={styles.menuOverlay} onClick={closeMenu} />
      )}
    </header>
  );
}
