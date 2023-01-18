import React, { useState } from 'react';
import CurrentPath from '../../components/CurrentPath/CurrentPath';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection';
import ProductData from '../../components/ProductData/ProductData';

function ProductPage() {
  const [productName, setProductName] = useState(' ');
  
  return (
    <div>

      <CurrentPath lastPathName={productName}/>

      <StandaloneSection>

        <ProductData setProductName={setProductName}/>
        
      </StandaloneSection>

    </div>
  );
}

export default ProductPage;