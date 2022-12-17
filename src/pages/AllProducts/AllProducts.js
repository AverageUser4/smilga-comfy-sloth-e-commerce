import React from 'react';
import CurrentPath from '../../components/CurrentPath/CurrentPath.js';
import ProductsFilterForm from '../../components/ProductsFilterForm/ProductsFilterForm.js';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection.js';
import Product from '../../components/Product/Product.js';
import css from './temporary.module.css';
import ProductsGridTop from '../../components/ProductsGridTop/ProductsGridTop.js';
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid.js';

function AllProducts() {
  return (
    <>
      <CurrentPath/>

      <StandaloneSection>

        <div className={css['siblings']}>

          <ProductsFilterForm/>

          <div>

            <ProductsGridTop/>

            <ProductsGrid/>

          </div>

        </div>

      </StandaloneSection>
    </>
  );
}

export default AllProducts;