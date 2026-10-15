import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import DenturesPage from './pages/DenturesPage.jsx';
import DentureRepairPage from './pages/DentureRepairPage.jsx';
import ServiceAreaPage from './pages/ServiceAreaPage.jsx';
import CityPage from './pages/CityPage.jsx';
import CookieBanner from './components/CookieBanner/CookieBanner.jsx';
import ScrollTop from './components/ScrollTop/ScrollTop.jsx';

// Single source of truth for the site's routes. Also used at build time
// (src/entry-server.jsx) to prerender a static HTML file for every path.
export const ROUTES = [
  { path: '/', element: <HomePage /> },
  { path: '/uslugi', element: <ServicesPage /> },
  { path: '/protezy', element: <DenturesPage /> },
  { path: '/naprawa-protez', element: <DentureRepairPage /> },
  { path: '/o-nas', element: <AboutPage /> },
  { path: '/galeria', element: <GalleryPage /> },
  { path: '/kontakt', element: <ContactPage /> },
  { path: '/obszar-dzialania', element: <ServiceAreaPage /> },
  { path: '/zielona-gora', element: <CityPage city="zielona-gora" /> },
  { path: '/gorzow-wielkopolski', element: <CityPage city="gorzow-wielkopolski" /> },
  { path: '/polityka-prywatnosci', element: <PrivacyPage /> },

  { path: '/de', element: <HomePage lang="de" /> },
  { path: '/de/leistungen', element: <ServicesPage lang="de" /> },
  { path: '/de/ueber-uns', element: <AboutPage lang="de" /> },
  { path: '/de/galerie', element: <GalleryPage lang="de" /> },
  { path: '/de/kontakt', element: <ContactPage lang="de" /> },
];

export function AppRoutes() {
  return (
    <>
      <CookieBanner />
      <ScrollTop />
      <Routes>
        {ROUTES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
