import React from 'react';
import CurrentPath from '../../components/CurrentPath/CurrentPath.js';
import ProductsBrowser from '../../components/ProductsBrowser/ProductsBrowser.js';

function AllProducts() {
  return (
    <>
      <CurrentPath/>
      <ProductsBrowser/>
    </>
  );
}

export default AllProducts;