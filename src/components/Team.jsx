import React from 'react';
const team = ['Сергій Грибовський','Роман Плугатор','Юрій Пасічняк','Дмитро Дацків','Василь Парфанюк','Ігор Дзира'];
export default function Team(){
  return (
    <section id="team" className="section team container">
      <h2>Команда</h2>
      <ul className="team-list">
        {team.map((t,i)=>(<li key={i}><strong>{t.split(' ')[0]}</strong><div style={{fontSize:13,color:'#666'}}>{t.replace(t.split(' ')[0]+' ','')}</div></li>))}
      </ul>
    </section>
  );
}