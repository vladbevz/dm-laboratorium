import React, {useState} from 'react';
export default function Contact(){
  const [msg,setMsg]=useState('');
  const submit=(e)=>{e.preventDefault(); setMsg('Дякуємо! Ми зв\'яжемося з вами найближчим часом.'); e.target.reset();};
  return (
    <section id="contact" className="section contact container">
      <h2>Контакти</h2>
      <form className="contact-form" onSubmit={submit}>
        <label>Ім'я<input name="name" required/></label>
        <label>Телефон<input name="phone" required/></label>
        <label>Повідомлення<textarea name="message"/></label>
        <button className="btn" type="submit">Передзвоніть мені</button>
        <p className="form-result" style={{color:'green'}}>{msg}</p>
      </form>
      <aside className="contact-info">
        <p><strong>Телефон:</strong> <a href="tel:+380673535566">+38 067 353 55 66</a></p>
        <p><strong>Адреса:</strong> м. Львів, вул. Пасічна, 43</p>
        <p><a href="https://www.google.com/maps/search/?api=1&query=Lviv+Pasichna+43" target="_blank">Прокласти маршрут</a></p>
      </aside>
    </section>
  );
}