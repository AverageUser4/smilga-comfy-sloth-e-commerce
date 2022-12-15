import React from 'react';
import PropTypes from 'prop-types';
import css from './ProductsGridTop.module.css';

// assets
import { ReactComponent as Blocks } from '../../assets/blocks.svg';
import { ReactComponent as Bars } from '../../assets/menu-bars.svg';

function ProductsGridTop() {
  return (
    <div className={css['container']}>

      <div className={css['buttons']}>
        <button className="toggle-button"><Blocks/></button>
        <button className="toggle-button"><Bars/></button>
      </div>

      <span>23 products found</span>

      <div className="line"></div>

      <label className={css["label"]}>
        <span>Sort by</span>
        <select className="input">
          <option>price (lowest)</option>
          <option>price (highest)</option>
          <option>name (a-z)</option>
          <option>name (z-a)</option>
        </select>
      </label>

    </div>
  );
}

ProductsGridTop.propTypes = {

};

export default ProductsGridTop;