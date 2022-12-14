import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Search } from '../../assets/magnyfing-glass.svg';
import css from './Product.module.css';
import { Link } from 'react-router-dom';

function Product({ image, price, name, id }) {
  return (
    <article>

      <Link to={`/products/${id}`} className={css["product"]}>

        <div className={css['top']}>

          <div className={css["search"]}>
            <Search/>
          </div>

          <img className={css["image"]} src={image} alt={name}/>

        </div>

        <span className={css["name"]}>{name}</span>
        <span className={css["price"]}>${price}</span>
        
      </Link>
      
    </article>
  );
}

Product.propTypes = {
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  id: PropTypes.string
};

export default Product;
