import React from 'react';
import PropTypes from 'prop-types';
import css from './Grid.module.css';

function Grid({ children }) {
  return (
    <div className={css['grid']}>
      {children}
    </div>
  );
}

Grid.propTypes = {
  children: PropTypes.node
};

export default Grid;