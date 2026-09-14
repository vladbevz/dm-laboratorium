import React, { useEffect, useState } from 'react';
import { Star, ExternalLink } from 'lucide-react';
import styles from './Reviews.module.css';

const STRINGS = {
  pl: {
    eyebrow: 'Opinie klientów',
    title: <>Co mówią <em>o nas</em></>,
    description: 'Opinie zweryfikowane przez Google, od gabinetów stomatologicznych współpracujących z nami',
    ratingSuffix: (count) => `na podstawie ${count} opinii w Google`,
    cta: 'Zobacz wszystkie opinie na Google',
    fallbackMapsUrl: 'https://www.google.com/maps/search/?api=1&query=D%26M+Laboratorium+S%C5%82ubice',
  },
  de: {
    eyebrow: 'Kundenbewertungen',
    title: <>Was unsere Kunden <em>sagen</em></>,
    description: 'Von Google verifizierte Bewertungen von Zahnarztpraxen, die mit uns zusammenarbeiten',
    ratingSuffix: (count) => `basierend auf ${count} Google-Bewertungen`,
    cta: 'Alle Bewertungen auf Google ansehen',
    fallbackMapsUrl: 'https://www.google.com/maps/search/?api=1&query=D%26M+Laboratorium+S%C5%82ubice',
  },
};

function Stars({ rating }) {
  const full = Math.round(rating ?? 0);
  return (
    <div className={styles.stars} aria-label={`${rating} / 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className={i < full ? styles.starFilled : styles.starEmpty} />
      ))}
    </div>
  );
}

export default function Reviews({ lang = 'pl' }) {
  const t = STRINGS[lang] ?? STRINGS.pl;
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/reviews')
      .then((r) => r.json())
      .then((json) => { if (!cancelled) setData(json); })
      .catch(() => { if (!cancelled) setData({ reviews: [] }); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    document.querySelectorAll('script[data-aggregate-rating]').forEach((el) => el.remove());
    if (!data?.rating || !data?.userRatingCount) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-aggregate-rating', '1');
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'AggregateRating',
      itemReviewed: { '@type': 'MedicalBusiness', name: 'D&M Laboratorium' },
      ratingValue: data.rating,
      reviewCount: data.userRatingCount,
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, [data]);

  if (!data || data.reviews.length === 0) return null;

  const mapsUrl = data.googleMapsUri || t.fallbackMapsUrl;

  return (
    <section id="reviews" className={styles.section}>
      <div className={styles.container}>

        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>{t.eyebrow}</div>
          <h2 className={styles.sectionTitle}>{t.title}</h2>
          <div className={styles.sectionDivider} />
          <p className={styles.sectionDescription}>{t.description}</p>

          {data.rating != null && (
            <div className={styles.aggregateRating}>
              <Stars rating={data.rating} />
              <span className={styles.aggregateText}>
                {data.rating.toFixed(1)} — {t.ratingSuffix(data.userRatingCount ?? data.reviews.length)}
              </span>
            </div>
          )}
        </div>

        <div className={styles.grid}>
          {data.reviews.slice(0, 6).map((review, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardHeader}>
                {review.authorPhoto ? (
                  <img src={review.authorPhoto} alt="" className={styles.avatar} loading="lazy" referrerPolicy="no-referrer" />
                ) : (
                  <div className={styles.avatarFallback}>{review.author?.[0] ?? '★'}</div>
                )}
                <div>
                  <div className={styles.authorName}>{review.author}</div>
                  <Stars rating={review.rating} />
                </div>
              </div>
              <p className={styles.reviewText}>{review.text}</p>
              {review.relativeTime && <span className={styles.reviewTime}>{review.relativeTime}</span>}
            </div>
          ))}
        </div>

        <div className={styles.ctaWrap}>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
            {t.cta}
            <ExternalLink size={13} />
          </a>
        </div>

      </div>
    </section>
  );
}
