import React from 'react';
import { Link } from 'react-router-dom';
import manWorking from '../../assets/man-working-tiny.jpeg';
import furniture from '../../assets/furniture-small.jpeg';
import FancyPics from '../../components/FancyPics/FancyPics.js';
import Card from '../../components/Card/Card';
import { ReactComponent as Compass } from '../../assets/compass.svg';
import { ReactComponent as Mining } from '../../assets/mining-diamond.svg';
import { ReactComponent as Scroll } from '../../assets/scroll.svg';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection.js';
import VerticalGap from '../../components/VerticalGap/VerticalGap';
import useProducts from '../../hooks/useProducts';
import Product from '../../components/Product/Product';
import Loading from '../../components/Loading/Loading';
import useDocumentTitle from '../../hooks/useDocumentTitle';

function Home() {
  useDocumentTitle('Home');
  let { products, isLoading, error } = useProducts({ featuredOnly: true, orderBy: 'shuffle' });
  products = products.slice(0, 3);

  return (
    <>

      <StandaloneSection isSemanticSection={true}>

        <div className="text-and-block">

          <div>
            <h1 className="heading heading--no-margin">Design Your <br/> Comfort Zone</h1>
            <p className="paragraph paragraph--width-cap paragraph--growing paragraph--big-line-height">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at sed omnis corporis doloremque possimus velit! Repudiandae nisi odit, aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis alias?</p>
            <Link to="products" className="button">Shop now</Link>
          </div>

          <FancyPics
            smallImage={{ src: manWorking, alt: 'Our professional, seasoned and well-paid employee working on our high quality products.' }}
            bigImage={{ src: furniture, alt: 'Our mind-blowing furniture.' }}
          />

        </div>

      </StandaloneSection>

      <StandaloneSection isSemanticSection={true} backgroundID={1}>

        <h2 className="heading heading--no-margin heading--centered heading--underline">Featured Products</h2>

        <div className="standalone">
          {
            error ?
              <p className="error">{error}</p>
              :
            isLoading ?
              <Loading/>
            :
              <div className="grid">
                {products.map(product => <Product key={product.id} {...product} locationData={{ name: 'home', url: '/' }}/>)}
              </div>
          }
        </div>

        <Link to="/products" className="button button--centered button--uppercase">All Products</Link>

      </StandaloneSection>

      <StandaloneSection isSemanticSection={true} backgroundID={2} isProtruding={true}>

        <div className="siblings">

          <h2 className="heading heading--no-shrink heading--medium heading--no-margin heading--color-2 heading-and-paragraph__heading">Custom Furniture <br/> Built Only For You</h2>
          <p className="paragraph paragraph--width-cap paragraph--no-margin paragraph--color-2 heading-and-paragraph__paragraph">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dolorum debitis consectetur
            reprehenderit non aliquam voluptates dolore aut vero consequuntur.
          </p>

        </div>

        <VerticalGap typeID={1}/>

        <div className="grid">

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

        </div>

      </StandaloneSection>
      
      <StandaloneSection isSemanticSection={true}>

        <div className="siblings">

          <div>
            <h2 className="heading heading--medium heading--no-margin">Join our newsletter and get 20% off</h2>
            <p className="paragraph paragraph--big-line-height paragraph--width-cap">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Placeat sint unde quaerat ratione soluta veniam provident
              adipisci cumque eveniet tempore?
            </p>
          </div>

          <form>
            <div className="dual-input">
              <input
                type="email"
                className="input input--type-1"
                placeholder="Enter email"
                aria-label="Email"
              />
              <button 
                className="button button--type-1"
              >
                Subscribe
              </button>
            </div>
          </form>
          
        </div>

      </StandaloneSection>
      
    </>
  );
}

export default Home;