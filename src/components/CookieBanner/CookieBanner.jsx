import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CookieBanner.module.css';

const STORAGE_KEY = 'dm_cookie_consent';

export function getCookieConsent() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getCookieConsent()) {
      setTimeout(() => setVisible(true), 800);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics: true, maps: true }));
    setVisible(false);
    window.dispatchEvent(new Event('cookieConsentUpdated'));
  };

  const reject = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics: false, maps: false }));
    setVisible(false);
    window.dispatchEvent(new Event('cookieConsentUpdated'));
  };

  if (!visible) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <p>
            Używamy plików cookies, aby zapewnić prawidłowe działanie strony oraz analizować ruch
            (Google Analytics, Google Maps). Więcej informacji:{' '}
            <Link to="/polityka-prywatnosci" className={styles.link}>Polityka Prywatności</Link>.
          </p>
        </div>
        <div className={styles.actions}>
          <button className={styles.btnReject} onClick={reject}>
            Tylko niezbędne
          </button>
          <button className={styles.btnAccept} onClick={accept}>
            Akceptuję wszystkie
          </button>
        </div>
      </div>
    </div>
  );
}
