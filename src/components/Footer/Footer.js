import React from 'react';
import css from './Footer.module.css';

function Footer() {
  return (
    <footer className={css['footer']}>
      <p>© 2022 <span>ComfySloth</span></p>
      <p>All rights reserved</p>
    </footer>
  );
}

export default Footer;