import { useEffect, useState } from 'react';

const API_ENDPOINT = 'https://course-api.com/react-store-products';

function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function fetchProducts() {
      try {
        const data = await fetch(API_ENDPOINT);
        const json = await data.json();
  
        if(ignore)
          return;
  
        setProducts(json);
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