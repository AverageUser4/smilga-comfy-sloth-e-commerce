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

            <input placeholder='Search'/>

            <section>
              <h3>Category</h3>
              <ul>
                <li><button>All</button></li>
                <li><button>Office</button></li>
                <li><button>Living room</button></li>
                <li><button>Kitchen</button></li>
                <li><button>Bedroom</button></li>
                <li><button>Dining room</button></li>
                <li><button>For kids</button></li>
              </ul>
            </section>

            <section>
              <h3>Company</h3>
              <select>
                <option>All</option>
                <option>Marcos</option>
                <option>Liddy</option>
                <option>Ikea</option>
                <option>Caressa</option>
              </select>
            </section>

            <section>
              <h3>Colors</h3>
              <input type="radio" name="color" value=""/>
              <input type="radio" name="color" value="red"/>
              <input type="radio" name="color" value="green"/>
              <input type="radio" name="color" value="purple"/>
              <input type="radio" name="color" value="black"/>
              <input type="radio" name="color" value="yellow"/>
            </section>

            <section>
              <h3>Price</h3>
              <input type="range" min="0" max="3100"/>
            </section>

            <label htmlFor="freeShipping">Free shipping</label>
            <input
              id="freeShipping"
              type="checkbox"
            />

            <button>Clear filters</button>

          </form>
          
        </aside>
        
      </StandaloneSection>
    </>
  );
}

export default AllProducts;