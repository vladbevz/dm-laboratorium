import React from 'react';
export default function Services(){
  const items = [
    {title:'Дизайн моделювання', desc:'CAD/CAM дизайн, цифрове моделювання.'},
    {title:'Тимчасові конструкції', desc:'Надійні тимчасові рішення.'},
    {title:'Безметалеві коронки', desc:'Діоксид цирконію, дисилікат літію.'},
    {title:'Постійні конструкції', desc:'Якісні реставрації та гарантія.'},
    {title:'Імплантні рішення', desc:'All-in-4 та інші протоколи.'},
    {title:'Реставрації', desc:'Вініри та кераміка на вогнетривкій масі.'}
  ];
  return (
    <section id="services" className="section services container">
      <h2>Послуги</h2>
      <div className="grid">
        {items.map((it,i)=>(
          <article className="card" key={i}>
            <h3>{it.title}</h3>
            <p>{it.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}