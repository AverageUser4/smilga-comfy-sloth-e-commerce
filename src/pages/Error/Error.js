import React from 'react';
import PropTypes from 'prop-types';

function Error({ message = 'Unknown error.' }) {
  return (
    <>
      <h1>Something went wrong...</h1>
      <p>{message}</p>
    </>
  );
}

Error.propTypes = {
  message: PropTypes.string
};

export default Error;