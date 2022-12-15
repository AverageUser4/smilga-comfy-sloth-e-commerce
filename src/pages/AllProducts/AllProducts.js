import React from 'react';
import CurrentPath from '../../components/CurrentPath/CurrentPath.js';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection.js';

// using fieldsets instead of sections makes more sense

function AllProducts() {
  return (
    <>
      <CurrentPath/>

      <StandaloneSection>

        <aside>

          <form>

            <input className="input" placeholder='Search'/>

            <fieldset className="fieldset small-standalone-element">
              <legend className="heading heading--nano">Category</legend>
              <ul className="list dope-list">
                <li><button className="text-button">All</button></li>
                <li><button className="text-button">Office</button></li>
                <li><button className="text-button">Living room</button></li>
                <li><button className="text-button">Kitchen</button></li>
                <li><button className="text-button">Bedroom</button></li>
                <li><button className="text-button">Dining room</button></li>
                <li><button className="text-button">For kids</button></li>
              </ul>
            </fieldset>

            <fieldset className="fieldset small-standalone-element">
              <legend className="heading heading--nano">Company</legend>
              <select className="input">
                <option>All</option>
                <option>Marcos</option>
                <option>Liddy</option>
                <option>Ikea</option>
                <option>Caressa</option>
              </select>
            </fieldset>

            <fieldset className="fieldset small-standalone-element horizontal-list">
              <legend className="heading heading--nano">Colors</legend>
              <label className="focus-label">
                <input defaultChecked className="hidden-radio" type="radio" name="color" value=""/>
                <span className="text-button">All</span>
              </label>
              <label className="focus-label">
                <input className="hidden-radio" type="radio" name="color" value="red"/>
                <span className="color"></span>
              </label>
              <label className="focus-label">
                <input className="hidden-radio" type="radio" name="color" value="green"/>
                <span className="color color--green"></span>
              </label>
              <label className="focus-label">
                <input className="hidden-radio" type="radio" name="color" value="purple"/>
                <span className="color color--blue"></span>
              </label>
              <label className="focus-label">
                <input className="hidden-radio" type="radio" name="color" value="black"/>
                <span className="color color--black"></span>
              </label>
              <label className="focus-label">
                <input className="hidden-radio" type="radio" name="color" value="orange"/>
                <span className="color color--orange"></span>
              </label>
            </fieldset>

            <fieldset className="fieldset small-standalone-element">
              <legend className="heading heading--nano">Price</legend>
              <input type="range" min="0" max="3100"/>
            </fieldset>

            <label htmlFor="freeShipping">Free shipping</label>
            <input
              id="freeShipping"
              type="checkbox"
            />

            <button className="button button--danger button--little-padding">Clear Filters</button>

          </form>
          
        </aside>
        
      </StandaloneSection>
    </>
  );
}

export default AllProducts;