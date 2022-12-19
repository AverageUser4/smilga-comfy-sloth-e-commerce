import React from 'react';
import PropTypes from 'prop-types';
import css from './ProductsFilterForm.module.css';
import useProducts from '../../hooks/useProducts';

function ProductsFilterForm(props) {
  let { categories, companies, colors } = useProducts();
  categories = [''].concat(categories);
  colors = [''].concat(colors);
  
  const { queryString, category, company, color, priceMin, priceMax, freeShippingOnly, resetFilters } = props;
  
  function handleChange(event) {
    let { value, name, type, checked } = event.target;
    const funcName = 'set' + name.slice(0, 1).toUpperCase() + name.slice(1);

    if(name === 'priceMin' || name === 'priceMax') {
      const parsed = parseInt(value);
      if(value && Number.isNaN(parsed))
        return;
    }

    props[funcName](type === 'checkbox' ? checked : value);
  }
  
  const categoryInputs = categories.map(cat =>
    <li key={cat} className={css['hidden-radio-container']}>
      <label className={css['radio-label']}>
        <span className={`text-button ${category === cat ? 'text-button--active' : ''}`}>
          {cat ? cat : 'All'}
        </span>
        <input
          type="radio"
          name="category"
          value={cat}
          checked={category === cat}
          onChange={handleChange}
          className="hidden-radio"
        />
      </label>            
    </li>
  );

  const colorInputs = colors.map(col =>
    <label key={col} className="focus-label">
      <input 
        className="hidden-radio"
        type="radio"
        name="color"
        value={col}
        checked={col === color}
        onChange={handleChange}
      />
      {
        col ?
          <span className="color" style={{ backgroundColor: col }}></span>
        :
          <span className="text-button">All</span>
      }
    </label>
  );
  
  return (
    <form className={css['products-form']} onSubmit={(e) => e.preventDefault()}>

      <label>
        <span className="heading heading--nano heading--only-bottom-margin">Search</span>
        <input
          className="input"
          placeholder='Search'
          name="queryString"
          value={queryString}
          onChange={handleChange}
        />
      </label>

      <fieldset className="fieldset">
        <legend className="heading heading--nano heading--no-margin">Category</legend>
        <ul className={`list ${css['categories-list']}`}>
          {categoryInputs}
        </ul>
      </fieldset>

      <fieldset className="fieldset">
        <legend className="heading heading--nano heading--no-margin">Company</legend>
        <select 
          name="company"
          value={company} 
          onChange={handleChange}
          className="input"
        >
          <option value="">All</option>
          {
            companies.map(company => 
              <option key={company} value={company}>{company}</option> 
            )
          }
        </select>
      </fieldset>

      <fieldset className="fieldset horizontal-list">
        <legend className="heading heading--nano heading--no-margin">Colors</legend>
        {colorInputs}
      </fieldset>

      <fieldset className="fieldset">
        <legend className="heading heading--nano heading--no-margin">Price</legend>
        <label className={css['price-label']}>
          <span>min.</span>
          <input 
            type="number"
            className="input"
            min="0"
            max="999999999"
            name="priceMin"
            value={priceMin}
            onChange={handleChange}
          />
        </label>
        <label className={css['price-label']}>
          <span>max.</span>
          <input 
            type="number"
            className="input"
            min="0"
            max="999999999"
            name="priceMax"
            value={priceMax}
            onChange={handleChange}
          />
        </label>
      </fieldset>

      <label className={css['free-shipping']}>
        <span>Free shipping</span>
        <input
          type="checkbox"
          name="freeShippingOnly"
          checked={freeShippingOnly}
          onChange={handleChange}
        />
      </label>

      <button className="button button--danger button--little-padding" onClick={resetFilters}>Clear Filters</button>

    </form>
  );
}

ProductsFilterForm.propTypes = {
  queryString: PropTypes.string,
  setQueryString: PropTypes.func,
  category: PropTypes.string,
  setCategory: PropTypes.func,
  company: PropTypes.string,
  setCompany: PropTypes.func,
  color: PropTypes.string,
  setColor: PropTypes.func,
  priceMin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setPriceMin: PropTypes.func,
  priceMax: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setPriceMax: PropTypes.func,
  setPrice: PropTypes.func,
  freeShippingOnly: PropTypes.bool,
  setFreeShippingOnly: PropTypes.func,
  resetFilters: PropTypes.func,
};

export default ProductsFilterForm;