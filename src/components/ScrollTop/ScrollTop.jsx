import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import styles from './ScrollTop.module.css';

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      className={`${styles.btn} ${visible ? styles.visible : ''}`}
      onClick={scrollUp}
      aria-label="Przewiń do góry"
    >
      <ArrowUp size={18} strokeWidth={1.5} />
    </button>
  );
}
