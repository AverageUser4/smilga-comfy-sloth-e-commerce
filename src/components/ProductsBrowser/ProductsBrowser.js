import React, { useState } from 'react';
import css from './ProductsBrowser.module.css';
import ProductsFilterForm from '../../components/ProductsFilterForm/ProductsFilterForm.js';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection.js';
import ProductsGridTop from '../../components/ProductsGridTop/ProductsGridTop.js';
import useProducts from '../../hooks/useProducts';
import Product from '../Product/Product';
import Loading from '../Loading/Loading';

const initialFilters = {
  queryString: '',
  category: '',
  company: '',
  color: '',
  price: Number.MAX_SAFE_INTEGER,
  orderBy: 'priceAsc',
  freeShippingOnly: false
};

function ProductsBrowser() {
  const [showDetails, setShowDetails] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const { products } = useProducts({ ...filters });

  function setSingleFilter(which, value) {
    setFilters(prev => ({ ...prev, [which]: value }));
  }

  return (
    <StandaloneSection>

      <div className={css['siblings']}>

        <ProductsFilterForm
          queryString={filters.queryString}
          setQueryString={setSingleFilter.bind(null, 'queryString')}
          category={filters.category}
          setCategory={setSingleFilter.bind(null, 'category')}
          company={filters.company}
          setCompany={setSingleFilter.bind(null, 'company')}
          color={filters.color}
          setColor={setSingleFilter.bind(null, 'color')}
          price={filters.price}
          setPrice={setSingleFilter.bind(null, 'price')}
          freeShippingOnly={filters.freeShippingOnly}
          setFreeShippingOnly={setSingleFilter.bind(null, 'freeShippingOnly')}
        />

        <div>

          <ProductsGridTop
            showDetails={showDetails}
            setShowDetails={setShowDetails}
            orderBy={filters.orderBy}
            setOrderBy={(val) => setFilters(prev => ({ ...prev, orderBy: val }))}
          />

          {
            products.length ?
              <div className={showDetails ? 'vertical-grid' : 'small-grid'}>
                {products.map(product => 
                  <Product 
                    key={product.id}
                    {...product}
                    showDetails={showDetails}
                  />)}
              </div>
            :
              <Loading/>
          }

        </div>

      </div>

    </StandaloneSection>
  );
}

export default ProductsBrowser;