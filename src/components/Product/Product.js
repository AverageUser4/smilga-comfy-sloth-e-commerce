import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Search } from '../../assets/magnyfing-glass.svg';
import css from './Product.module.css';

function Product({ image, price, name }) {
  return (
    <article>

      <a className={css["product"]} href="#">

        <div href="#" className={css['top']}>

          <div className={css["search"]} href="#">
            <Search/>
          </div>

          <img className={css["image"]} src={image} alt={name}/>

        </div>

        <span className={css["name"]}>{name}</span>
        <span className={css["price"]}>${price}</span>
        
      </a>
      
    </article>
  );
}

Product.propTypes = {
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string
};

export default Product;
