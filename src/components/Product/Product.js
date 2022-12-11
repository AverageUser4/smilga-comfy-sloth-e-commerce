import React from 'react';
import PropTypes from 'prop-types';
import './product.css';

function Product({ image, price, name }) {
  return (
    <article className="product">

      <img className="product__image" src={image} alt={name}/>
      <span className="product__name">{name}</span>
      <span className="product__price">${price}</span>
      
    </article>
  );
}

Product.propTypes = {
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string
};

export default Product;
