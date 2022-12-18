import { useEffect, useState } from 'react';
import { shuffleArray } from '../utils/utils';

const API_ENDPOINT = 'https://course-api.com/react-store-products';

function useProducts(options = { featuredOnly: false, orderBy: '' }) {
  const [productsOriginal, setProductsOriginal] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let newProducts = [...productsOriginal];

    if(options.featuredOnly)
      newProducts = newProducts.filter(product => product.featured);

    switch(options.orderBy) {
      case 'shuffle':
        newProducts = shuffleArray(newProducts);
        break;

      case 'priceAsc':
        newProducts.sort((a, b) => a.price - b.price);
        break;
        
      case 'priceDesc':
        newProducts.sort((a, b) => b.price - a.price);
        break;

      case 'nameAsc':
        console.error('sorting by name not implemented')
        break;

      case 'nameDesc':
        console.error('sorting by name not implemented')
        break;
        
      case '':
        break;

      default:
        throw new Error(`Unrecognized "orderBy" argument: "${options.orderBy}"`)
    }

    setProducts(newProducts);
  }, [options.featuredOnly, options.orderBy, productsOriginal]);
  
  useEffect(() => {
    let ignore = false;

    async function fetchProducts() {
      try {
        const data = await fetch(API_ENDPOINT);
        let json = await data.json();
  
        if(ignore)
          return;

        setProductsOriginal(json);
      } catch(error) {
        console.error(error);
      }
    }

    fetchProducts();

    return () => ignore = true;
  }, []);

  return products;
}

export default useProducts;