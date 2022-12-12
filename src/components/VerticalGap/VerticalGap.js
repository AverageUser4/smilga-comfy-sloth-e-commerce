import React from 'react';
import PropTypes from 'prop-types';
import css from './VerticalGap.module.css';

function VerticalGap({ typeID }) {
  return (
    <div style={{ width: '100%' }} className={css[`type-${typeID}`]}></div>
  );
}

VerticalGap.propTypes = {
  typeID: PropTypes.number
};

export default VerticalGap;