import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import css from './ProductInCart.module.css';
import Counter from '../Counter/Counter.js';
import { ReactComponent as TrashIcon } from '../../assets/trash.svg';
import { stringifyPrice } from '../../utils/utils';
import Loading from '../Loading/Loading';

function ProductInCart({ color, quantity, setQuantity, sameOfDifferentColorInCart, remove, id, setIsError, data }) {
  const isError = data?.isError;
  const price = data?.price;

  useEffect(() => {
    if(isError)
      setIsError(isError)
  }, [isError, setIsError]);
  
  if(isError)
    return (
      <p className="error">
        We were unable to find this product. Please, refresh the page or 
        <button className="button button--danger" onClick={remove}>remove it from cart</button>
      </p>
    );
  
  if(!data)
    return (
      <Loading
        style={{ width: 75, height: 75, margin: '0 auto 48px' }}
      />
    );

  const { name, stock } = data;
  const image = data.images[0].thumbnails.large.url
  const total = (quantity * price).toFixed(2);
  const available = stock - sameOfDifferentColorInCart;

  return (
    <article className={`cart-products-layout ${css['container']}`}>

      <div className={css['first-part']}>

        <Link tabIndex="-1" to={`/products/${id}`}>
          <img className={css['image']} src={image} alt={name}/>
        </Link>

        <div>

          <h4 className="heading heading--no-margin heading--pico heading--capitalized">
            <Link className={css['heading-link']} to={`/products/${id}`}>
              {name}
            </Link>
          </h4>

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

        <button className="button button--danger button--square" onClick={remove} aria-label="Remove from cart.">
          <TrashIcon className="annoying-garbage-icon" alt="Remove from cart."/>
        </button>

      </div>

    </article>
  );
}

ProductInCart.propTypes = {
  id: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
  sameOfDifferentColorInCart: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
  setIsError: PropTypes.func,
  data: PropTypes.object
};

export default ProductInCart;