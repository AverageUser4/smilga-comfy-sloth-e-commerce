import React from 'react';
import PropTypes from 'prop-types';
import css from './DualInput.module.css';

function DualInput({ children }) {
  return (
    <div className={css.container}>
      {children}
    </div>
  );
}

DualInput.propTypes = {
  children: PropTypes.node
};

export default DualInput;