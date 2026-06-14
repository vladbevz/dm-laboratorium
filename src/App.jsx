import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/uslugi" element={<ServicesPage />} />
        <Route path="/o-nas" element={<AboutPage />} />
        <Route path="/galeria" element={<GalleryPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}
