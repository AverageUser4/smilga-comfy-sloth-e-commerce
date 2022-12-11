import React from 'react';
import PropTypes from 'prop-types';

import logo from '../../assets/logo.svg';

function Logo({ width, height }) {
  const logoStyle = { display: 'block' };
  if(Number.isInteger(width))
    logoStyle.width = width;
  if(Number.isInteger(height))
    logoStyle.height = height;

  return (
    <img
      src={logo}
      alt="ComfySloth logo"
      style={logoStyle}
    />
  );
}

Logo.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

export default Logo;