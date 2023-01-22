import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import CurrentPath from '../../components/CurrentPath/CurrentPath';

function ErrorPage({ message = 'Unknown error.' }) {
  useDocumentTitle('Error');
  
  return (
    <div>
      <CurrentPath lastPathName="Error"/>

      <StandaloneSection isCentered={true}>
        <h1 className="heading heading--no-margin">Something went wrong...</h1>
        <p className="paragraph paragraph--big">{message}</p>
        <Link to="/" className="button button--uppercase">Back to homepage</Link>
      </StandaloneSection>
    </div>
  );
}

ErrorPage.propTypes = {
  message: PropTypes.string
};

export default ErrorPage;