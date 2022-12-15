import React from 'react';
import PropTypes from 'prop-types';
import css from './Gallery.module.css';

function Gallery({ photos }) {
  return (
    <section className={css["gallery"]}>

      <img className={css["main-photo"]} src={photos[0].src}/>

      <div className={css["thumbnails"]}>

        {photos.map(photo => <img key={photo.src} src={photo.src} alt={photo.alt}/>)}
        
      </div>
      
    </section>
  );
}

Gallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string
  })).isRequired
};

export default Gallery;