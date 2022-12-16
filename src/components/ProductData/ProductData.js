import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './ProductData.module.css';
import Rating from '../Rating/Rating.js';
import Counter from '../Counter/Counter.js';

function ProductData() {
  const [count, setCount] = useState(1);

  return (
    <div className={css['container']}>

      <h1 className="heading heading--no-margin heading--capitalized">modern poster</h1>

      <span className={css['sibling']}>
        <Rating amount={2.2} outOf={5}/>
        (100 customer reviews)
      </span>

      <span className={css['price']}>$39.99</span>

      <p className="paragraph paragraph--small paragraph--no-margin paragraph--color-1 paragraph--big-line-height">Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge</p>

      <div className={css['data']}>
        <span>Availability:</span>
        <span>in stock</span>
      </div>

      <div className={css['data']}>
        <span>SKU:</span>
        <span>recQ0fMd8T0Vk211E</span>
      </div>

      <div className={css['data']}>
        <span>Brand:</span>
        <span>Liddy</span>
      </div>

      <div className={`line ${css['margin-bottom']}`}></div>

      <div className={`${css['data']} ${css['margin-bottom']}`}>
        <span>Colors:</span>
        <span>TODO: here should be color inputs</span>
      </div>

      <Counter count={count} setCount={setCount}/>
      
      <Link to="/cart" className="button button--uppercase">Add to cart</Link>
      
    </div>
  );
}

ProductData.propTypes = {

};

export default ProductData;