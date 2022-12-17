import { useState, useEffect } from 'react';

const API_ENDPOINT = 'https://course-api.com/react-store-single-product?id=';

function useProductData(id) {
  const [productData, setProductData] = useState();

  useEffect(() => {
    let ignore = false;

    async function fetchProductData() {
      try {
        const data = await fetch(API_ENDPOINT + id);
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