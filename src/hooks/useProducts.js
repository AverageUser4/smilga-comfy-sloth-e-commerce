import { useEffect, useState } from 'react';
import { shuffleArray } from '../utils/utils';

const API_ENDPOINT = 'https://course-api.com/react-store-products';

function useProducts(options = { featuredOnly: false, orderBy: '' }) {
  const [productsOriginal, setProductsOriginal] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let newProducts = [...productsOriginal];

    function sortByName(arr, desc = false) {
      const names = arr.map(product => product.name);
      names.sort();
      const sorted = [];
      
      for(let i = 0; i < names.length; i++) {
        const index = arr.findIndex(product => product.name === names[i]);
        sorted.push(arr[index]);
        arr.splice(index, 1);
      }
  
      if(desc)
        sorted.reverse();
  
      return sorted;
    }

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

      case 'nameAsc': {
        newProducts = sortByName(newProducts);
        break;
      }

      case 'nameDesc':
        newProducts = sortByName(newProducts, true);
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
        setCategories([...new Set(json.map(product => product.category))]);
      } catch(error) {
        console.error(error);
      }
    }

    fetchProducts();

    return () => ignore = true;
  }, []);

  return { products, categories };
}

export default useProducts;