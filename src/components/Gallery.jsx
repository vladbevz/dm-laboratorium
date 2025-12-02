import React from 'react';
import g1 from '../assets/images/gallery-1.jpg';
import g2 from '../assets/images/gallery-2.jpg';
import g3 from '../assets/images/gallery-3.jpg';
import g4 from '../assets/images/gallery-4.jpg';
export default function Gallery(){
  const images=[g1,g2,g3,g4];
  const open=(src)=>{
    const overlay=document.createElement('div');
    overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:9999';
    overlay.innerHTML=`<img src="${src}" style="max-width:92%;max-height:92%;border-radius:10px"/>`;
    overlay.addEventListener('click',()=>overlay.remove());
    document.body.appendChild(overlay);
  };
  return (
    <section id="gallery" className="section gallery container">
      <h2>Галерея робіт</h2>
      <div className="gallery-grid">
        {images.map((src,i)=>(<img key={i} src={src} alt={'gallery-'+i} onClick={()=>open(src)}/>))}
      </div>
    </section>
  );
}