import React from 'react';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import InstagramCTA from '../InstagramCTA/InstagramCTA.jsx';

export default function PageLayout({ children, lang = 'pl' }) {
  return (
    <div>
      <Header lang={lang} />
      <main style={{ paddingTop: '88px' }}>
        {children}
      </main>
      <InstagramCTA lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}
