import React from 'react';
import { Instagram } from 'lucide-react';
import styles from './InstagramCTA.module.css';

export default function InstagramCTA() {
  return (
    <section className={styles.section}>
      <a
        href="https://www.instagram.com/d_m_laboratorium"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.btn}
      >
        <Instagram size={18} strokeWidth={1.4} />
        Śledź nas na Instagramie
      </a>
    </section>
  );
}
