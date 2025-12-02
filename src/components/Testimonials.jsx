import React, {useEffect, useRef, useState} from 'react';
const items = [
  {text:'Професійний підхід, робота в обіцяні терміни, точність максимальна.', author:'Данилевський С.'},
  {text:'Найважливіше — якісна робота техніка. Дякую лабораторії Сергія!', author:'Гриник Р.'},
  {text:'Thank you Serhiy! I am so grateful to have met you and found your fantastic dental lab.', author:'E. Bramley'}
];
export default function Testimonials(){
  const [i,setI]=useState(0);
  const slider = useRef();
  useEffect(()=>{
    const id=setInterval(()=> setI(s=> (s+1)%items.length),4000);
    return ()=>clearInterval(id);
  },[]);
  useEffect(()=>{
    if(slider.current) slider.current.style.transform = `translateX(-${i*100}%)`;
  },[i]);
  return (
    <section className="section container testimonials">
      <h2>Відгуки</h2>
      <div style={{overflow:'hidden'}}>
        <div className="slider" ref={slider}>
          {items.map((it,idx)=>(
            <div className="slide" key={idx}>
              <p style={{margin:0,fontSize:18}}>{it.text}</p>
              <cite style={{display:'block',marginTop:10,color:'#666'}}>- {it.author}</cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}