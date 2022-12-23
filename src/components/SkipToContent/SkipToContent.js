import React from 'react';
import css from './SkipToContent.module.css';

function SkipToContent() {
  return (
    <a
      className={css['skip']}
      href="#main"
    >
      Skip To Content
    </a>
  );
}

export default SkipToContent;