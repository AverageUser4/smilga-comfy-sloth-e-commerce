import React from 'react';
import PropTypes from 'prop-types';
import css from './ProductsGridTop.module.css';

// assets
import { ReactComponent as Blocks } from '../../assets/blocks.svg';
import { ReactComponent as Bars } from '../../assets/menu-bars.svg';

function ProductsGridTop({ showDetails, setShowDetails, orderBy, setOrderBy, productsCount }) {
  return (
    <div className={css['container']}>

      <div className={css['buttons']}>
        <button 
          className={"toggle-button" + (!showDetails ? ' toggle-button--active' : '')}
          onClick={() => setShowDetails(false)}
        >
          <Blocks/>
        </button>
        <button 
          className={"toggle-button" + (showDetails ? ' toggle-button--active' : '')}
          onClick={() => setShowDetails(true)}
        >
          <Bars/>
        </button>
      </div>

      <span>{productsCount || 'no'} products found</span>

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
};

export default ProductsGridTop;