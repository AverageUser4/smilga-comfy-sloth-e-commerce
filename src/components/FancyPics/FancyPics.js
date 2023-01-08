import React from 'react';
import PropTypes from 'prop-types';
import css from './FancyPics.module.css';

function FancyPics({ smallImage, bigImage, backgroundColor }) {
  const backgroundStyle = {};
  if(backgroundColor)
    backgroundStyle.backgroundColor = backgroundColor;

  return (
    <div className={css['container']}>
      <img className={`${css['photo']} ${css['photo--big']}`} src={bigImage.src} alt={bigImage.alt}/>
      <img className={`${css['photo']} ${css['photo--small']}`} src={smallImage.src} alt={smallImage.alt}/>
    </div>
  );
}

FancyPics.propTypes = {
  smallImage: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string
  }).isRequired,
  bigImage: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string
  }).isRequired,
  backgroundColor: PropTypes.string,
};

export default FancyPics;