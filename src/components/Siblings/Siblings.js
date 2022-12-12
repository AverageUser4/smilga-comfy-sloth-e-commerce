import React from 'react';
import PropTypes from 'prop-types';
import css from './Siblings.module.css';

function Siblings({ children }) {
  return (
    <div className={css['container']}>
      {children}
    </div>
  );
}

Siblings.propTypes = {
  children: PropTypes.node,
};

export default Siblings;