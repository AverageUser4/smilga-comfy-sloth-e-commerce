import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Gallery.module.css';

function Gallery({ photos }) {
  const [currentPhoto, setCurrentPhoto] = useState(photos[0]);

  return (
    <section className={css["gallery"]}>

      <img className={css["main-photo"]} src={currentPhoto.src} alt={currentPhoto.alt}/>

      <div className={css["thumbnails"]}>

        {
          photos.map(photo => 
            <button 
              className={css['button']}
              key={photo.src}
              onClick={() => setCurrentPhoto(photo)}
            >
              <img src={photo.src} alt={photo.alt}/>
            </button>)
        }
        
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