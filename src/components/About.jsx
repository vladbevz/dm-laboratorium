import React from 'react';
export default function About(){
  return (
    <section id="about" className="section about container">
      <h2>Про нас</h2>
      <div className="about-inner">
        <div>
          <h3>Сергій Грибовський — Засновник</h3>
          <p>Зубний технік, засновник лабораторії. Досвід та авторські підходи.</p>
        </div>
        <div className="stats">
          <div><strong>12</strong><div>майстрів</div></div>
          <div><strong>6</strong><div>країн</div></div>
          <div><strong>10 000</strong><div>робіт</div></div>
        </div>
      </div>
    </section>
  );
}