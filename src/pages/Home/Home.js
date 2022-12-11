import React from 'react';
import manWorking from '../../assets/man-working.jpeg';
import furniture from '../../assets/furniture.jpeg';
import FancyPics from '../../components/FancyPics/FancyPics.js';
import Grid from '../../components/Grid/Grid.js';
import './home.css';
import Product from '../../components/Product/Product';


function Home() {
  return (
    <main className="main">

      <article className="article-with-photo">

        <div className="article-with-photo__text">
          <h1 className="heading heading--no-margin">Design Your <br/> Comfort Zone</h1>
          <p className="paragraph">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at sed omnis corporis doloremque possimus velit! Repudiandae nisi odit, aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis alias?</p>
          <a className="button" href="#">Shop now</a>
        </div>

        <FancyPics
          smallImage={{ src: manWorking, alt: 'Our professional, seasoned and well-paid employee working on our high quality products.' }}
          bigImage={{ src: furniture, alt: 'Our mind-blowing furniture.' }}
        />

      </article>

      <section className="dope-section">

        <h2 className="heading heading--no-margin heading--centered heading--underline">Featured Products</h2>

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

      </section>
      
    </main>
  );
}

export default Home;