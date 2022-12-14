import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

function logoBody(props, ref) {
  const logoStyle = { display: 'block' };
  if(Number.isInteger(props.width))
    logoStyle.width = props.width;
  if(Number.isInteger(props.height))
    logoStyle.height = props.height;

  return (
    <Link to="/" ref={ref}>
      <img
        src={logo}
        alt="ComfySloth logo"
        style={logoStyle}
      />
    </Link>
  );
}

const Logo = forwardRef(logoBody);

Logo.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

export default Logo;