import React, { useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const headerRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const el = headerRef.current;
    const onScroll = () => {
      if (window.scrollY > 40) el.classList.add(styles.scrolled);
      else el.classList.remove(styles.scrolled);
    };
    
    onScroll();
    window.addEventListener('scroll', onScroll);
    
    // Закривати меню при кліку поза ним
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

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerInner}>
          {/* Текстовий логотип */}
          <a className={styles.logoText} href="#" onClick={closeMenu}>
            <span className={styles.logoPart}>D&M</span>
            <span className={styles.logoPartSub}>Laboratorium</span>
          </a>

          {/* Бургер-кнопка */}
          <button 
            className={`${styles.burgerBtn} ${isMenuOpen ? styles.active : ''}`}
            aria-label="Відкрити меню"
            onClick={toggleMenu}
          >
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
          </button>

          {/* Основне меню */}
          <nav className={`${styles.mainNav} ${isMenuOpen ? styles.open : ''}`} aria-label="Головне меню">
            <a href="#services" onClick={closeMenu}>Usługi</a>
            <a href="#about" onClick={closeMenu}>O nas</a>
            <a href="#gallery" onClick={closeMenu}>Galeria</a>
            <a href="#contact" onClick={closeMenu}>Łączność</a>
            
            {/* Телефон в мобільному меню */}
            <a className={`${styles.phone} ${styles.mobilePhone}`} href="tel:+48577861595" onClick={closeMenu}>
              +48 577 861 595
            </a>
          </nav>

          {/* Телефон для десктопу */}
          <a className={`${styles.phone} ${styles.desktopPhone}`} href="tel:+48577861595">
            +48 577 861 595
          </a>
        </div>
      </div>
      
      {/* Оверлей для мобільного меню */}
      {isMenuOpen && (
        <div className={styles.menuOverlay} onClick={closeMenu}></div>
      )}
    </header>
  );
}