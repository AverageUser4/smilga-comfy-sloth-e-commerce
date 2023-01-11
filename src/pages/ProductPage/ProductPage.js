import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CurrentPath from '../../components/CurrentPath/CurrentPath';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection';
import ProductData from '../../components/ProductData/ProductData';

function ProductPage() {
  const [productName, setProductName] = useState('product');
  
  return (
    <div>

      <CurrentPath lastPathName={productName}/>

      <StandaloneSection>

        <Link to="/products" className="button button--uppercase">Back to products</Link>

        <ProductData setProductName={setProductName}/>
        
      </StandaloneSection>

    </div>
  );
}

export default ProductPage;