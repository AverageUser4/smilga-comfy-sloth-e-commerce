import React from 'react';
import PropTypes from 'prop-types';
import css from './ProductsFilterForm.module.css';
import ColorInput from '../ColorInput/ColorInput';

function ProductsFilterForm(props) {
  const { 
    queryString, category, company, color, priceMin, priceMax, freeShippingOnly,
    resetFilters, categories, companies, colors 
  } = props;

  const allCategories = [''].concat(categories);
  const allColors = [''].concat(colors);
  const allCompanies = companies;
  
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

  const categoryInputs = allCategories.map(cat =>
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

  const colorInputs = allColors.map(col =>
    <ColorInput
      key={col}
      value={col}
      currentValue={color}
      name="color"
      handleChange={handleChange}
    />
  );
  
  return (
    <form role="search" className={css['products-form']} onSubmit={(e) => e.preventDefault()}>

      <label>
        <span className="heading heading--nano heading--only-bottom-margin">Search</span>
        <input
          className="input"
          type="search"
          placeholder='Item name'
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
            allCompanies.map(company => 
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

      <button type="button" className="button button--danger button--little-padding" onClick={resetFilters}>Clear Filters</button>

    </form>
  );
}

ProductsFilterForm.propTypes = {
  queryString: PropTypes.string.isRequired,
  setQueryString: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
  company: PropTypes.string.isRequired,
  setCompany: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  setColor: PropTypes.func.isRequired,
  priceMin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  setPriceMin: PropTypes.func.isRequired,
  priceMax: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  setPriceMax: PropTypes.func.isRequired,
  freeShippingOnly: PropTypes.bool.isRequired,
  setFreeShippingOnly: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  companies: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
};

export default ProductsFilterForm;