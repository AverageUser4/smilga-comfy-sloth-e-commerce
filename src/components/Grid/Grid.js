import React from 'react';
import PropTypes from 'prop-types';
import './grid.css';

function Grid({ children }) {
  return (
    <div className="grid">
      {children}
    </div>
  );
}

Grid.propTypes = {
  children: PropTypes.node
};

export default Grid;