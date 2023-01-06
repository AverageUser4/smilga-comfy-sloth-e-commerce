import React from 'react';
import CurrentPath from '../../components/CurrentPath/CurrentPath.js';
import ProductsBrowser from '../../components/ProductsBrowser/ProductsBrowser.js';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';

function AllProducts() {
  useDocumentTitle('Products');

  return (
    <>
      <CurrentPath/>
      <ProductsBrowser/>
    </>
  );
}

export default AllProducts;