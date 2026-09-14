import { useEffect } from 'react';

const SITE_URL = 'https://www.dm-lab.pl';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

function setMetaContent(selector, attr, value) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

function setAlternateLinks(alternates) {
  document.querySelectorAll('link[data-hreflang]').forEach((el) => el.remove());
  if (!alternates || alternates.length === 0) return;
  alternates.forEach(({ lang, path }) => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = lang;
    link.href = `${SITE_URL}${path}`;
    link.setAttribute('data-hreflang', '1');
    document.head.appendChild(link);
  });
}

export default function Seo({ title, description, path = '/', ogImage = DEFAULT_OG_IMAGE, noindex = false, lang = 'pl', alternates = null }) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    document.title = title;
    document.documentElement.lang = lang;
    setMetaContent('meta[name="description"]', 'content', description);
    setMetaContent('link[rel="canonical"]', 'href', url);
    setMetaContent('meta[name="robots"]', 'content', noindex ? 'noindex, follow' : 'index, follow');

    setMetaContent('meta[property="og:title"]', 'content', title);
    setMetaContent('meta[property="og:description"]', 'content', description);
    setMetaContent('meta[property="og:url"]', 'content', url);
    setMetaContent('meta[property="og:image"]', 'content', ogImage);
    setMetaContent('meta[property="og:locale"]', 'content', lang === 'de' ? 'de_DE' : 'pl_PL');

    setMetaContent('meta[name="twitter:title"]', 'content', title);
    setMetaContent('meta[name="twitter:description"]', 'content', description);
    setMetaContent('meta[name="twitter:image"]', 'content', ogImage);

    setAlternateLinks(alternates);
  }, [title, description, path, ogImage, noindex, lang, alternates]);

  return null;
}
