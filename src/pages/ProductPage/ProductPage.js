import React from 'react';
import { Link } from 'react-router-dom';
import CurrentPath from '../../components/CurrentPath/CurrentPath';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection';
import Gallery from '../../components/Gallery/Gallery';
import ProductData from '../../components/ProductData/ProductData';
import furniture from '../../assets/furniture.jpeg';
import work1 from '../../assets/work-1.jpeg';
import work2 from '../../assets/work-2.jpeg';
import work3 from '../../assets/work-3.jpeg';
import work4 from '../../assets/work-4.jpeg';
import css from './temporary.module.css';

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

          <ProductData/>

        </article>
        
      </StandaloneSection>

    </div>
  );
}

export default ProductPage;