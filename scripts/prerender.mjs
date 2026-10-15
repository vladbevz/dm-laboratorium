// Build step: writes a static HTML file for every route so that search
// engines get the right <title>, description, canonical, lang and hreflang
// (and the page text) without having to run JavaScript.
//
// Runs after `vite build` (client, -> dist/) and
// `vite build --ssr src/entry-server.jsx` (-> dist-ssr/).
// Output: dist/index.html for "/", dist/<path>/index.html for the rest
// (Vercel serves a folder's index.html at /<path> before applying rewrites).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
const { render, routes } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Replacement is passed as a function so "$" in page text is never treated
// as a special replacement pattern.
function replaceOnce(html, pattern, replacement, label, route) {
  const found = typeof pattern === 'string' ? html.includes(pattern) : pattern.test(html);
  if (!found) {
    throw new Error(`[prerender] ${route}: could not find ${label} in index.html`);
  }
  return html.replace(pattern, () => replacement);
}

function setMeta(html, attr, key, value, route) {
  const re = new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"`);
  return replaceOnce(html, re, `<meta ${attr}="${key}" content="${esc(value)}"`, `meta ${attr}="${key}"`, route);
}

let count = 0;
for (const route of routes) {
  const { html: appHtml, seo } = render(route);
  if (!seo) throw new Error(`[prerender] ${route}: page did not render <Seo>`);

  const url = `${seo.siteUrl}${seo.path}`;
  const locale = seo.lang === 'de' ? 'de_DE' : 'pl_PL';
  let html = template;

  html = replaceOnce(html, /<html lang="[^"]*">/, `<html lang="${esc(seo.lang)}">`, '<html lang>', route);
  html = replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(seo.title)}</title>`, '<title>', route);
  html = setMeta(html, 'name', 'description', seo.description, route);
  html = setMeta(html, 'name', 'robots', seo.noindex ? 'noindex, follow' : 'index, follow', route);
  html = replaceOnce(
    html,
    /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${esc(url)}">`,
    'canonical',
    route
  );
  html = setMeta(html, 'property', 'og:title', seo.title, route);
  html = setMeta(html, 'property', 'og:description', seo.description, route);
  html = setMeta(html, 'property', 'og:url', url, route);
  html = setMeta(html, 'property', 'og:image', seo.ogImage, route);
  html = setMeta(html, 'property', 'og:locale', locale, route);
  html = setMeta(html, 'name', 'twitter:title', seo.title, route);
  html = setMeta(html, 'name', 'twitter:description', seo.description, route);
  html = setMeta(html, 'name', 'twitter:image', seo.ogImage, route);

  // Same markup Seo.jsx creates in the browser (data-hreflang lets it replace them).
  const alternates = (seo.alternates || [])
    .map(
      ({ lang, path: p }) =>
        `<link rel="alternate" hreflang="${esc(lang)}" href="${esc(seo.siteUrl + p)}" data-hreflang="1">`
    )
    .join('\n  ');
  if (alternates) html = html.replace('</head>', () => `  ${alternates}\n</head>`);

  html = replaceOnce(html, '<div id="root"></div>', `<div id="root">${appHtml}</div>`, '<div id="root">', route);

  const outFile = path.join(distDir, route.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
  count++;
}

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`[prerender] wrote ${count} pages`);
