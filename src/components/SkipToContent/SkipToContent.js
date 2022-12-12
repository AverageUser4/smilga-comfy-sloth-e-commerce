import React from 'react';
import PropTypes from 'prop-types';
import css from './SkipToContent.module.css';

function SkipToContent({ lastFocusableInNav }) {
  console.log(lastFocusableInNav)

  return (
    <button
      className={css['button']}
      onClick={() => {
        console.log(lastFocusableInNav)
        lastFocusableInNav?.focus();
      }}
    >
      Skip To Content
    </button>
  );
}

SkipToContent.propTypes = {
  lastFocusableInNav: PropTypes.instanceOf(HTMLElement)
};

export default SkipToContent;