import React from 'react';
import PropTypes, { string } from 'prop-types';
import css from './ProductInCart.module.css';
import Counter from '../Counter/Counter.js';
import { ReactComponent as TrashIcon } from '../../assets/trash.svg';
import { stringifyPrice } from '../../utils/utils';

/*
  changing this layout to actual html table is a good idea
*/

function ProductInCart({ image, name, color, price, quantity, setQuantity, available, remove }) {
  const total = (quantity * price).toFixed(2);

  return (
    <article className={`cart-products-layout ${css['container']}`}>

      <div className={css['first-part']}>

        <img className={css['image']} src={image} alt={name}/>

        <div>

          <h4 className="heading heading--no-margin heading--pico heading--capitalized">{name}</h4>

          <div className={css['color-container']}>
            Color: 
            <span 
              style={{ backgroundColor: color }}
              className={css['color']}></span>
          </div>

          <div className="text text--color-1 text--bold">{stringifyPrice(price)}</div>

        </div>
        
      </div>

      <div className={`${css['medium-screen']} text text--color-1`}>{stringifyPrice(price)}</div>

      <div className={css['second-part']}>

        <Counter count={quantity} setCount={setQuantity} fontSize={'clamp(20px, 2.5vw, 24px)'} max={available}/>

        <div className={css['medium-screen']}>{stringifyPrice(total)}</div>

        <button className="button button--danger button--square" onClick={remove}>
          <TrashIcon className="annoying-garbage-icon"/>
        </button>

      </div>

    </article>
  );
}

ProductInCart.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  setQuantity: PropTypes.func,
  available: PropTypes.number,
  remove: PropTypes.func
};

export default ProductInCart;