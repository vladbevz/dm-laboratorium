import React, {useEffect, useRef} from 'react';
export default function Header(){
  const headerRef = useRef();
  useEffect(()=>{
    const el = headerRef.current;
    const onScroll = ()=>{
      if(window.scrollY>40) el.classList.add('scrolled'); else el.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return ()=> window.removeEventListener('scroll', onScroll);
  },[]);
  return (
    <header ref={headerRef} className="site-header">
      <div className="container header-inner">
        <a className="logo" href="#">SENERGY</a>
        <nav className="main-nav" aria-label="Головне меню">
          <a href="#services">Послуги</a>
          <a href="#about">Про нас</a>
          <a href="#gallery">Галерея</a>
          <a href="#team">Команда</a>
          <a href="#contact">Контакти</a>
        </nav>
        <a className="phone" href="tel:+380673535566">+38 067 353 55 66</a>
      </div>
    </header>
  );
}