import React from 'react';
import PropTypes from 'prop-types';
import Main from '../../components/Main/Main';

function Error({ message = 'Unknown error.' }) {
  return (
    <Main>
      <h1>Something went wrong...</h1>
      <p>{message}</p>
    </Main>
  );
}

Error.propTypes = {
  message: PropTypes.string
};

export default Error;