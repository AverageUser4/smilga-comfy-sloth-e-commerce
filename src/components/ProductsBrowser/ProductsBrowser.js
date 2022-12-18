import React, { useState } from 'react';
import css from './ProductsBrowser.module.css';
import ProductsFilterForm from '../../components/ProductsFilterForm/ProductsFilterForm.js';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection.js';
import ProductsGridTop from '../../components/ProductsGridTop/ProductsGridTop.js';
import useProducts from '../../hooks/useProducts';
import Product from '../Product/Product';

function ProductsBrowser() {
  const [showDetails, setShowDetails] = useState(false);
  const [orderBy, setOrderBy] = useState('priceAsc');
  const products = useProducts({ orderBy });

  return (
    <StandaloneSection>

      <div className={css['siblings']}>

        <ProductsFilterForm/>

        <div>

          <ProductsGridTop
            showDetails={showDetails}
            setShowDetails={setShowDetails}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
          />

          <div className={showDetails ? 'vertical-grid' : 'small-grid'}>
            {products.map(product => 
              <Product 
                key={product.id}
                {...product}
                showDetails={showDetails}
              />)}
          </div>

        </div>

      </div>

    </StandaloneSection>
  );
}

export default ProductsBrowser;