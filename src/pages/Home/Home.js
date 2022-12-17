import React from 'react';
import manWorking from '../../assets/man-working.jpeg';
import furniture from '../../assets/furniture.jpeg';
import FancyPics from '../../components/FancyPics/FancyPics.js';
import Grid from '../../components/Grid/Grid.js';
import Product from '../../components/Product/Product';
import Card from '../../components/Card/Card';
import { ReactComponent as Compass } from '../../assets/compass.svg';
import { ReactComponent as Mining } from '../../assets/mining-diamond.svg';
import { ReactComponent as Scroll } from '../../assets/scroll.svg';

import StandaloneSection from '../../components/StandaloneSection/StandaloneSection.js';
import Siblings from '../../components/Siblings/Siblings.js';
import BlockAndText from '../../components/BlockAndText/BlockAndText';
import VerticalGap from '../../components/VerticalGap/VerticalGap';
import DualInput from '../../components/DualInput/DualInput';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>

      <StandaloneSection>

        <BlockAndText>

          <div>
            <h1 className="heading heading--no-margin">Design Your <br/> Comfort Zone</h1>
            <p className="paragraph paragraph--width-cap paragraph--growing paragraph--big-line-height">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at sed omnis corporis doloremque possimus velit! Repudiandae nisi odit, aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis alias?</p>
            <Link to="products" className="button">Shop now</Link>
          </div>

          <FancyPics
            smallImage={{ src: manWorking, alt: 'Our professional, seasoned and well-paid employee working on our high quality products.' }}
            bigImage={{ src: furniture, alt: 'Our mind-blowing furniture.' }}
          />

        </BlockAndText>

      </StandaloneSection>

      <StandaloneSection backgroundID={1}>

        <h2 className="heading heading--no-margin heading--centered heading--underline">Featured Products</h2>

        <div className="standalone">

          <Grid>

            <Product
              name="sofa"
              price={123}
              image="https://cdn.wamiz.fr/cdn-cgi/image/format=auto,quality=80,width=400,height=400,fit=cover/animal/breed/pictures/613f5a1a89c13770998047.jpg"
            />
            <Product
              name="sofa"
              price={123}
              image="https://cdn.wamiz.fr/cdn-cgi/image/format=auto,quality=80,width=400,height=400,fit=cover/animal/breed/pictures/613f5a1a89c13770998047.jpg"
            />
            <Product
              name="sofa"
              price={123}
              image="https://cdn.wamiz.fr/cdn-cgi/image/format=auto,quality=80,width=400,height=400,fit=cover/animal/breed/pictures/613f5a1a89c13770998047.jpg"
            />
            
          </Grid>

        </div>

        <Link to="/products" className="button button--centered button--uppercase">All Products</Link>

      </StandaloneSection>

      <StandaloneSection backgroundID={2} isProtruding={true}>

        <Siblings>

          <h2 className="heading heading--no-shrink heading--medium heading--no-margin heading--color-2 heading-and-paragraph__heading">Custom Furniture <br/> Built Only For You</h2>
          <p className="paragraph paragraph--width-cap paragraph--no-margin paragraph--color-2 heading-and-paragraph__paragraph">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dolorum debitis consectetur
            reprehenderit non aliquam voluptates dolore aut vero consequuntur.
          </p>

        </Siblings>

        <VerticalGap typeID={1}/>

        <Grid>

          <Card
            heading="Mission"
            text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi"
            Icon={Compass}
          />

          <Card
            heading="Vision"
            text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi"
            Icon={Mining}
          />

          <Card
            heading="History"
            text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi"
            Icon={Scroll}
          />

        </Grid>

      </StandaloneSection>
      
      <StandaloneSection>

        <Siblings>

          <div>
            <h2 className="heading heading--medium heading--no-margin">Join our newsletter and get 20% off</h2>
            <p className="paragraph paragraph--big-line-height paragraph--width-cap">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Placeat sint unde quaerat ratione soluta veniam provident
              adipisci cumque eveniet tempore?
            </p>
          </div>

          <form>
            <DualInput>
              <input
                type="email"
                className="input input--type-1"
                placeholder="Enter Email"
              />
              <button 
                className="button button--type-1"
              >
                Subscribe
              </button>
            </DualInput>
          </form>
          
        </Siblings>

      </StandaloneSection>
      
    </>
  );
}

export default Home;