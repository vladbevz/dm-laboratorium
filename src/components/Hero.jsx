import React, {useEffect, useRef} from 'react';
import hero from '../assets/images/hero-placeholder.jpg';
export default function Hero(){
  const ref = useRef();
  useEffect(()=>{
    const el = ref.current;
    const io = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, {threshold:0.2});
    if(el) io.observe(el);
    return ()=> io.disconnect();
  },[]);
  return (
    <section className="hero container">
      <div className="hero-inner" ref={ref}>
        <h1>Сучасна цифрова зуботехнічна лабораторія</h1>
        <p>Професійний підхід, робота в обіцяні терміни, точність максимальна.</p>
        <a className="btn" href="#contact">Передзвоніть мені</a>
      </div>
      <div className="hero-image">
        <img src={hero} alt="Лабораторія" />
      </div>
    </section>
  );
}