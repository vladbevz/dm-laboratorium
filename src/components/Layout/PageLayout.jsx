import React from 'react';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';

export default function PageLayout({ children }) {
  return (
    <div>
      <Header />
      <main style={{ paddingTop: '88px' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
