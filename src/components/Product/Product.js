import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Search } from '../../assets/magnyfing-glass.svg';
import css from './Product.module.css';
import { Link } from 'react-router-dom';
import { cutText, stringifyPrice } from '../../utils/utils';
import Loading from '../Loading/Loading';
import useFullImageLoad from '../../hooks/useFullImageLoad';

function Product({ image, price, name, id, description, showDetails = false }) {
  const url = `/products/${id}`;
  const imageReady = useFullImageLoad(image);

  const imageOrLoading = 
    imageReady ?
      <img className={css["image"]} src={image} alt={name}/>
    :
      <div className={css['loading-container']}>
        <Loading style={{ margin: 0 }}/>
      </div>;

  if(!showDetails)
    return (
      <article>

        <Link to={url} className={css["plain__product"]}>

          <div aria-hidden="true" className={css['plain__top']}>

            <div className={css["plain__search"]}>
              <Search alt="View product page."/>
            </div>

            {imageOrLoading}

          </div>

          <div className={css['plain__bottom']}>
            <h4 className={`${css["plain__name"]} heading heading--nano heading--no-margin heading--normal-weight heading--capitalized`}>{name}</h4>
            <span className={css["plain__price"]}>{stringifyPrice(price)}</span>
          </div>
          
        </Link>
        
      </article>
    );

  return (
    <article className={css['detailed']}>

      <Link aria-hidden="true" to={url} className={css['detailed__image-container']}>
        {imageOrLoading}
      </Link>

      <div>

        <Link to={url} className="clean-link">
          <h4 className={`${css["detailed__name"]} heading heading--small heading--capitalized heading--1-line-height`}>{name}</h4>
        </Link>

        <div className={css['detailed__price']}>{stringifyPrice(price)}</div>
        <p className="paragraph paragraph--small paragraph--color-1">{cutText(description, 130)}</p>

        <Link to="url" className="button button--uppercase">Details</Link>

      </div>

      
    </article>
  );
}

Product.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  showDetails: PropTypes.bool,
};

export default Product;
