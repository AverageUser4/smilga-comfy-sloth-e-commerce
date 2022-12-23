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
  priceMin: '',
  priceMax: '',
  orderBy: 'priceAsc',
  freeShippingOnly: false
};

function ProductsBrowser() {
  const [showDetails, setShowDetails] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const { products, isLoading, error, allCategories, allCompanies, allColors } = useProducts({ ...filters });

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
          priceMin={filters.priceMin}
          setPriceMin={setSingleFilter.bind(null, 'priceMin')}
          priceMax={filters.priceMax}
          setPriceMax={setSingleFilter.bind(null, 'priceMax')}
          freeShippingOnly={filters.freeShippingOnly}
          setFreeShippingOnly={setSingleFilter.bind(null, 'freeShippingOnly')}
          resetFilters={() => setFilters(prev => ({ ...initialFilters, orderBy: prev.orderBy }))}
          categories={allCategories}
          companies={allCompanies}
          colors={allColors}
        />

        <div>

          {
            error ?
              <p className="error">{error}</p>
            :
              <>
                <ProductsGridTop
                  showDetails={showDetails}
                  setShowDetails={setShowDetails}
                  orderBy={filters.orderBy}
                  setOrderBy={(val) => setFilters(prev => ({ ...prev, orderBy: val }))}
                  productsCount={products.length}
                  isLoading={isLoading}
                />

                {
                  !isLoading ?
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
              </>
          }

        </div>

      </div>

    </StandaloneSection>
  );
}

export default ProductsBrowser;