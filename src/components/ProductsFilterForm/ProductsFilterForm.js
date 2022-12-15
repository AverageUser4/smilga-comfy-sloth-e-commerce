import React from 'react';
import PropTypes from 'prop-types';
import css from './ProductsFilterForm.module.css';

function ProductsFilterForm(props) {
  return (
    <form className={css['products-form']}>

      <label>
        <span className="heading heading--nano heading--only-bottom-margin">Search</span>
        <input className="input" placeholder='Search'/>
      </label>

      <fieldset className="fieldset">
        <legend className="heading heading--nano heading--no-margin">Category</legend>
        <ul className={`list ${css['categories-list']}`}>
          <li><button className="text-button">All</button></li>
          <li><button className="text-button">Office</button></li>
          <li><button className="text-button">Living room</button></li>
          <li><button className="text-button">Kitchen</button></li>
          <li><button className="text-button">Bedroom</button></li>
          <li><button className="text-button">Dining room</button></li>
          <li><button className="text-button">For kids</button></li>
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

};

export default ProductsFilterForm;