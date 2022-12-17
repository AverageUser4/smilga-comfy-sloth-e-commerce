import React from 'react';
import { Link } from 'react-router-dom';
import CurrentPath from '../../components/CurrentPath/CurrentPath';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection';
import ProductData from '../../components/ProductData/ProductData';

function ProductPage() {
  return (
    <div>

      <CurrentPath lastPathName="my amazing product"/>

      <StandaloneSection>

        <Link to="/products" className="button button--uppercase">Back to products</Link>

        <ProductData/>
        
      </StandaloneSection>

    </div>
  );
}

export default ProductPage;