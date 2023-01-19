import React from 'react';
import { Link } from 'react-router-dom';
import css from './CheckoutProductsList.module.css';
import { useCartContext } from '../../utils/CartContext';
import { getColorName } from '../../utils/utils';

function CheckoutProductsList() {
  const { cartProductsData } = useCartContext();

  return (
    <ul className={css['list']}>
      { 
        cartProductsData.map(product => 
          <li key={product.id + product.color}>
            <Link to={`/products/${product.id}`} target="_blank" className="cool-link cool-link--capitalize">{product.name}</Link> ({getColorName(product.color)}) x{product.count}
          </li>)
      }
    </ul>
  );
}

export default CheckoutProductsList;