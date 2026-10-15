// Build-time entry used only by scripts/prerender.mjs (vite build --ssr).
// Renders one route to HTML and returns the SEO props its <Seo> received.
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppRoutes, ROUTES } from './App.jsx';
import { ssrSeo } from './components/Seo/Seo.jsx';

export const routes = ROUTES.map((r) => r.path);

export function render(url) {
  ssrSeo.current = null;
  const html = renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>
  );
  return { html, seo: ssrSeo.current };
}
