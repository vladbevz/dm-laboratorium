import { useEffect } from 'react';

const SITE_URL = 'https://dm-lab.pl';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

function setMetaContent(selector, attr, value) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export default function Seo({ title, description, path = '/', ogImage = DEFAULT_OG_IMAGE, noindex = false }) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    document.title = title;
    setMetaContent('meta[name="description"]', 'content', description);
    setMetaContent('link[rel="canonical"]', 'href', url);
    setMetaContent('meta[name="robots"]', 'content', noindex ? 'noindex, follow' : 'index, follow');

    setMetaContent('meta[property="og:title"]', 'content', title);
    setMetaContent('meta[property="og:description"]', 'content', description);
    setMetaContent('meta[property="og:url"]', 'content', url);
    setMetaContent('meta[property="og:image"]', 'content', ogImage);

    setMetaContent('meta[name="twitter:title"]', 'content', title);
    setMetaContent('meta[name="twitter:description"]', 'content', description);
    setMetaContent('meta[name="twitter:image"]', 'content', ogImage);
  }, [title, description, path, ogImage, noindex]);

  return null;
}
