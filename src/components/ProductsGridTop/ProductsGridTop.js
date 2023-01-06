import React from 'react';
import PropTypes from 'prop-types';
import css from './ProductsGridTop.module.css';

// assets
import { ReactComponent as Blocks } from '../../assets/blocks.svg';
import { ReactComponent as Bars } from '../../assets/menu-bars.svg';

function ProductsGridTop({ showDetails, setShowDetails, orderBy, setOrderBy, productsCount, isLoading }) {
  return (
    <div className={css['container']}>

      <ul className={css['buttons']}>
        <li>
          <button 
            className={"toggle-button" + (!showDetails ? ' toggle-button--active' : '')}
            onClick={() => setShowDetails(false)}
          >
            <Blocks alt="Simple view."/>
          </button>
        </li>
        <li>
          <button 
            className={"toggle-button" + (showDetails ? ' toggle-button--active' : '')}
            onClick={() => setShowDetails(true)}
          >
            <Bars alt="Detailed view."/>
          </button>
        </li>
      </ul>

      <div aria-live="polite" aria-atomic="true">
        {
          isLoading ?
            <span>loading...</span>
          :
            <span>{productsCount || 'no'} product{productsCount !== 1 && 's'} found</span>
        }
      </div>

      <div className="line"></div>

      <label className={css["label"]}>
        <span>Sort by</span>
        <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)} className="input">
          <option value={'priceAsc'}>price (lowest)</option>
          <option value={'priceDesc'}>price (highest)</option>
          <option value={'nameAsc'}>name (a-z)</option>
          <option value={'nameDesc'}>name (z-a)</option>
        </select>
      </label>

    </div>
  );
}

ProductsGridTop.propTypes = {
  showDetails: PropTypes.bool.isRequired,
  setShowDetails: PropTypes.func.isRequired,
  orderBy: PropTypes.string.isRequired,
  setOrderBy: PropTypes.func.isRequired,
  productsCount: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default ProductsGridTop;