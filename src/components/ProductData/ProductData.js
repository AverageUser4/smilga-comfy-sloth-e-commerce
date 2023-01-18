import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useLocation, Link } from 'react-router-dom';
import Gallery from '../Gallery/Gallery';
import css from './ProductData.module.css';
import Rating from '../Rating/Rating.js';
import Counter from '../Counter/Counter.js';
import Loading from '../Loading/Loading.js';
import useFetch from '../../hooks/useFetch';
import { stringifyPrice, capitalize } from '../../utils/utils';
import ColorInput from '../ColorInput/ColorInput';
import { useCartContext } from '../../utils/CartContext';
import useNotification from '../../hooks/useNotification';
import { SINGLE_PRODUCT } from '../../utils/API_Endpoints';
import useDocumentTitle from '../../hooks/useDocumentTitle';

function ProductData({ setProductName }) {
  const [count, setCount] = useState(1);
  const [color, setColor] = useState('');
  const { id } = useParams();
  const { state: locationState } = useLocation();
  const { data: product, isError } = useFetch(SINGLE_PRODUCT + id);
  const { cartChangeCount, cartGetItemTypeCount } = useCartContext();
  const inCartCount = id ? cartGetItemTypeCount(id) : 0;
  const { NotificationElement, notifyUser } = useNotification();

  useDocumentTitle(product?.name ? capitalize(product.name) : null);

  useEffect(() => {
    if(color || !product?.colors?.[0])
      return;
      
    setColor(product.colors[0]);

  }, [product?.colors, color]);

  useEffect(() => {
    if(product?.name)
      setProductName(product.name);
  }, [product?.name, setProductName]);

  if(!product)
    return <Loading/>;

  if(isError)
    return <div>Something went wrong... Please, refresh the page.</div>;

  const { name, stock, price, reviews, stars, colors, images, description, company } = product;
  const availableCount = stock - inCartCount;

  const colorInputs = colors.map(col =>
    <ColorInput
      key={col}
      name="color"
      value={col}
      currentValue={color}
      handleChange={(e) => setColor(e.target.value)}
      size={'clamp(20px, 3vw, 24px)'}
    />
  );

  return (
    <>

      {NotificationElement}

      {
        locationState?.name && locationState?.url ?
          <div className="close-siblings">
            <Link to={locationState.url} className="button button--uppercase">Back to {locationState.name}</Link>
            <Link to="/products" className="button button--uppercase">More products</Link>
          </div>
        :
          <Link to="/products" className="button button--uppercase">Back to products</Link>
      }
    
      <article className={css['product']}>
      
        <Gallery
          photos={images.map(image => ({ src: image.thumbnails.large.url, alt: image.filename }))}
        />

        <div className={css['text-container']}>

          <h1 className="heading heading--no-margin heading--capitalized">{name}</h1>

          <span className={css['sibling']}>
            <Rating amount={stars} outOf={5}/>
            ({reviews} customer reviews)
          </span>

          <span className={css['price']}>{stringifyPrice(price)}</span>

          <p className="paragraph paragraph--small paragraph--no-margin paragraph--color-1 paragraph--big-line-height">{description}</p>

          <div className={css['data']}>
            <span>Availability:</span>
            {
              stock ?
                <span>in stock ( {stock} )</span>
              :
                <span>sold out</span>
            }
          </div>

          <div className={css['data']}>
            <span>SKU:</span>
            <span>{id}</span>
          </div>

          <div className={css['data']}>
            <span>Brand:</span>
            <span>{company}</span>
          </div>

          <div className={`line ${css['margin-bottom']}`}></div>

          <div className={`${css['data']} ${css['margin-bottom']}`}>
            <span>Colors:</span>
            <div className={css['colors']}>
              {colorInputs}
            </div>
          </div>

          {
            availableCount ?
              <>
                <Counter count={count} setCount={setCount} max={availableCount}/>
                <div className="distant-twins-layout">
                  <button 
                    className="button button--uppercase"
                    onClick={() => {
                      cartChangeCount(id, color, count, stock, name);
                      notifyUser(`Added ${name} x${count} to your cart!`);
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </>
            :
            stock ?
              <>
                <span className={css['alert']}>All in your cart!</span>
                <Link to="/cart" className="button button--uppercase">Go to cart</Link>
              </>
            :
              <span className={`${css['alert']} ${css['alert--danger']}`}>Sold out!</span>
          }
          
        </div>

      </article>

    </>
  );
}

ProductData.propTypes = {
  setProductName: PropTypes.func.isRequired,
};

export default ProductData;