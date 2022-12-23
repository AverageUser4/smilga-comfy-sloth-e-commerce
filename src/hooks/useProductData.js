import { useState, useEffect } from 'react';
import { SINGLE_PRODUCT } from '../utils/API_Endpoints';

function useProductData(id) {
  console.log(`useProductData(${id})`);
  const [productData, setProductData] = useState();

  useEffect(() => {
    let ignore = false;

    async function fetchProductData() {
      try {
        const data = await fetch(SINGLE_PRODUCT + id);
        const json = await data.json();
  
        if(ignore)
          return;
  
        setProductData(json);
      } catch(error) {
        console.error(error);
      }
    }

    fetchProductData();

    return () => ignore = true;
  }, []);

  return productData;
}

export default useProductData;