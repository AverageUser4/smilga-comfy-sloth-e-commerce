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

            <input className="inputs-1__input" placeholder='Search'/>

            <section>
              <h3 className="heading heading--nano">Category</h3>
              <ul className="list">
                <li><button className="plain-text plain-text--fancy">All</button></li>
                <li><button className="plain-text plain-text--fancy">Office</button></li>
                <li><button className="plain-text plain-text--fancy">Living room</button></li>
                <li><button className="plain-text plain-text--fancy">Kitchen</button></li>
                <li><button className="plain-text plain-text--fancy">Bedroom</button></li>
                <li><button className="plain-text plain-text--fancy">Dining room</button></li>
                <li><button className="plain-text plain-text--fancy">For kids</button></li>
              </ul>
            </section>

            <section>
              <h3 className="heading heading--nano">Company</h3>
              <select>
                <option>All</option>
                <option>Marcos</option>
                <option>Liddy</option>
                <option>Ikea</option>
                <option>Caressa</option>
              </select>
            </section>

            <section>
              <h3 className="heading heading--nano">Colors</h3>
              <input type="radio" name="color" value=""/>
              <input type="radio" name="color" value="red"/>
              <input type="radio" name="color" value="green"/>
              <input type="radio" name="color" value="purple"/>
              <input type="radio" name="color" value="black"/>
              <input type="radio" name="color" value="yellow"/>
            </section>

            <section>
              <h3 className="heading heading--nano">Price</h3>
              <input type="range" min="0" max="3100"/>
            </section>

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