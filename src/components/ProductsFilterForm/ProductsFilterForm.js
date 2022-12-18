import React from 'react';
import PropTypes from 'prop-types';
import css from './ProductsFilterForm.module.css';
import { spacesToCamelCase } from '../../utils/utils';
import useProducts from '../../hooks/useProducts';

function ProductsFilterForm(props) {
  const categories = [''].concat(useProducts().categories);
  
  function handleChange(event) {
    const { value, name, type, checked } = event.target;
    const funcName = 'set' + name.slice(0, 1).toUpperCase() + name.slice(1);

    console.log(funcName)

    props[funcName](type === 'checkbox' ? checked : value);
  }

  const { queryString, category, company, color, price, freeShippingOnly, resetFilters } = props;
  
  const categoryInputs = categories.map(cat =>
    <li key={cat}>
      <label className={css['radio-label']}>
        <span className={`text-button ${category === spacesToCamelCase(cat) ? 'text-button--active' : ''}`}>
          {cat ? cat : 'All'}
        </span>
        <input
          type="radio"
          name="category"
          value={spacesToCamelCase(cat)}
          checked={category === spacesToCamelCase(cat)}
          onChange={handleChange}
          className="hidden-radio"
        />
      </label>            
    </li>
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
        <select className="input">
          <option>All</option>
          <option>Marcos</option>
          <option>Liddy</option>
          <option>Ikea</option>
          <option>Caressa</option>
        </select>
      </fieldset>

      <fieldset className="fieldset horizontal-list">
        <legend className="heading heading--nano heading--no-margin">Colors</legend>
        <label className={css['focus-label']}>
          <input defaultChecked className="hidden-radio" type="radio" name="color" value=""/>
          <span className="text-button">All</span>
        </label>
        <label className={css['focus-label']}>
          <input className="hidden-radio" type="radio" name="color" value="red"/>
          <span className="color"></span>
        </label>
        <label className={css['focus-label']}>
          <input className="hidden-radio" type="radio" name="color" value="green"/>
          <span className="color color--green"></span>
        </label>
        <label className={css['focus-label']}>
          <input className="hidden-radio" type="radio" name="color" value="purple"/>
          <span className="color color--blue"></span>
        </label>
        <label className={css['focus-label']}>
          <input className="hidden-radio" type="radio" name="color" value="black"/>
          <span className="color color--black"></span>
        </label>
        <label className={css['focus-label']}>
          <input className="hidden-radio" type="radio" name="color" value="orange"/>
          <span className="color color--orange"></span>
        </label>
      </fieldset>

      <label className="vertical-list">
        <span className="heading heading--nano heading--only-bottom-margin">Price</span>
        <span className="block paragraph paragraph--1-line-height">$3100</span>
        <input className="block range" type="range" min="0" max="3100"/>
      </label>

      <label className={css['free-shipping']}>
        <span>Free shipping</span>
        <input
          id="freeShipping"
          type="checkbox"
        />
      </label>

      <button className="button button--danger button--little-padding">Clear Filters</button>

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
  price: PropTypes.number,
  setPrice: PropTypes.func,
  freeShippingOnly: PropTypes.bool,
  setFreeShippingOnly: PropTypes.func,
  resetFilters: PropTypes.func,
};

export default ProductsFilterForm;