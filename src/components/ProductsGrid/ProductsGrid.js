import React from 'react';
import PropTypes from 'prop-types';
import Product from '../Product/Product';
import useProducts from '../../hooks/useProducts';
import { shuffleArray } from '../../utils/utils';

function ProductsGrid({ featuredOnly = false }) {
  const products = useProducts();
  
  function mapCallback(product) {
    return (
      <Product
        key={product.id}
        id={product.id}
        name={product.name}
        price={product.price}
        image={product.image}
      />
    );
  }

  if(!featuredOnly)
    return (
      <div className='small-grid'>
        {products.map(mapCallback)}
      </div>
    );

  const featured = products.filter(product => product.featured);
  const shuffled = shuffleArray(featured);
  const shown = shuffled.slice(0, 3);

  return (
    <div className="standalone">

      <div className="grid">
        {shown.map(mapCallback)}
      </div>

    </div>
  );
}

ProductsGrid.propTypes = {
  featuredOnly: PropTypes.bool
}

export default ProductsGrid;