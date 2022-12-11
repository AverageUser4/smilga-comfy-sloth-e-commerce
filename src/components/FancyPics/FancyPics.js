import React from 'react';
import PropTypes from 'prop-types';

import './fancy-pics.css';

function FancyPics({ smallImage, bigImage, backgroundColor }) {
  const backgroundStyle = {};
  if(backgroundColor)
    backgroundStyle.backgroundColor = backgroundColor;

  return (
    <div className="photos-container">

      <img className="photos-container__photo photos-container__photo--big" src={bigImage.src}/>
      <img className="photos-container__photo photos-container__photo--small" src={smallImage.src}/>

    </div>
  );
}

FancyPics.propTypes = {
  smallImage: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string
  }).isRequired,
  bigImage: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string
  }).isRequired,
  backgroundColor: PropTypes.string
};

export default FancyPics;