import React from 'react';
import PropTypes from 'prop-types';
import css from './TotalPrice.module.css';
import { stringifyPrice } from '../../utils/utils';

function TotalPrice({ subtotal, shipping }) {
  const orderTotal = subtotal + shipping;

  return (
    <article className={css['container']}>

      <div data-testid="subtotal" className={css['data']}>
        <span>Subtotal:</span>
        <span>{stringifyPrice(subtotal)}</span>
      </div>

      <div data-testid="shipping" className={`${css['data']} ${css['normal-weight']}`}>
        <span>Shipping Fee:</span>
        <span>{stringifyPrice(shipping)}</span>
      </div>

      <div className="line"></div>

      <div data-testid="total" className={`${css['data']} ${css['total']}`}>
        <span>Order Total:</span>
        <span>{stringifyPrice(orderTotal)}</span>
      </div>

    </article>
  );
}

TotalPrice.propTypes = {
  subtotal: PropTypes.number.isRequired,
  shipping: PropTypes.number.isRequired,
};

export default TotalPrice;