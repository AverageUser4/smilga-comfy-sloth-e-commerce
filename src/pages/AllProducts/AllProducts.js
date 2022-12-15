import React from 'react';
import CurrentPath from '../../components/CurrentPath/CurrentPath.js';
import ProductsFilterForm from '../../components/ProductsFilterForm/ProductsFilterForm.js';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection.js';
import Product from '../../components/Product/Product.js';
import css from './temporary.module.css';

function AllProducts() {
  return (
    <>
      <CurrentPath/>

      <StandaloneSection>

        <div className={css['siblings']}>

          <ProductsFilterForm/>

          <div>
            <Product name="sofa" price={123} image="https://cdn.wamiz.fr/cdn-cgi/image/format=auto,quality=80,width=400,height=400,fit=cover/animal/breed/pictures/613f5a1a89c13770998047.jpg"/>
            <Product name="sofa" price={123} image="https://cdn.wamiz.fr/cdn-cgi/image/format=auto,quality=80,width=400,height=400,fit=cover/animal/breed/pictures/613f5a1a89c13770998047.jpg"/>
            <Product name="sofa" price={123} image="https://cdn.wamiz.fr/cdn-cgi/image/format=auto,quality=80,width=400,height=400,fit=cover/animal/breed/pictures/613f5a1a89c13770998047.jpg"/>
            <Product name="sofa" price={123} image="https://cdn.wamiz.fr/cdn-cgi/image/format=auto,quality=80,width=400,height=400,fit=cover/animal/breed/pictures/613f5a1a89c13770998047.jpg"/>
            <Product name="sofa" price={123} image="https://cdn.wamiz.fr/cdn-cgi/image/format=auto,quality=80,width=400,height=400,fit=cover/animal/breed/pictures/613f5a1a89c13770998047.jpg"/>
            <Product name="sofa" price={123} image="https://cdn.wamiz.fr/cdn-cgi/image/format=auto,quality=80,width=400,height=400,fit=cover/animal/breed/pictures/613f5a1a89c13770998047.jpg"/>
          </div>

        </div>

      </StandaloneSection>
    </>
  );
}

export default AllProducts;