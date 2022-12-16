import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection';

function Error({ message = 'Unknown error.' }) {
  return (
    <StandaloneSection isCentered={true}>
      <h1 className="heading heading--no-margin">Something went wrong...</h1>
      <p className="paragraph paragraph--big">{message}</p>
      <Link to="/" className="button button--uppercase">Back to homepage</Link>
    </StandaloneSection>
  );
}

Error.propTypes = {
  message: PropTypes.string
};

export default Error;