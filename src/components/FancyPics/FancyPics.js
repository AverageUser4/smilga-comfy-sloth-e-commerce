import React from 'react';
import PropTypes from 'prop-types';


function FancyPics({ smallImage, bigImage, backgroundColor }) {
  const backgroundStyle = {};
  if(backgroundColor)
    backgroundStyle.backgroundColor = backgroundColor;

  return (
    <div className="photos-container">

      <div className="background"></div>

      <img src={smallImage.src}/>
      <img src={bigImage.src}/>

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