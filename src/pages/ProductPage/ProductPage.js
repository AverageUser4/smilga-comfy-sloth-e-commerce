import React from 'react';
import { Link } from 'react-router-dom';
import CurrentPath from '../../components/CurrentPath/CurrentPath';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection';
import css from './temporary.module.css';

// assets
import furniture from '../../assets/furniture.jpeg';
import work1 from '../../assets/work-1.jpeg';
import work2 from '../../assets/work-2.jpeg';
import work3 from '../../assets/work-3.jpeg';
import work4 from '../../assets/work-4.jpeg';
import Gallery from '../../components/Gallery/Gallery';

function ProductPage() {
  return (
    <div>

      <CurrentPath lastPathName="my amazing product"/>

      <StandaloneSection>

        <Link to="/products" className="button button--uppercase">Back to products</Link>

        <article className={css['product']}>

          <Gallery 
            photos={[
              { src: furniture, alt: 'Presented product.' },
              { src: work1, alt: 'Scobs.' },
              { src: work2, alt: 'Person preparing wood.' },
              { src: work3, alt: 'Person cutting wood.' },
              { src: work4, alt: 'Person checking out laptop, surrounded by wood.' }
            ]}
          />

          <div>

            <h1>modern poster</h1>

            <span>f f h n n (100 customer reviews)</span>

            <p>Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge</p>
            
          </div>

        </article>
        
      </StandaloneSection>

    </div>
  );
}

export default ProductPage;