import React from 'react';

import Home from './pages/Home/Home.js';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';

export default function App() {
  return (
    <>
      <Header/>
      <Home/>
      <Footer/>
    </>
  );
}