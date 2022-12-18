import { useEffect, useState } from 'react';
import { shuffleArray } from '../utils/utils';

const API_ENDPOINT = 'https://course-api.com/react-store-products';

function useProducts(options = { 
  featuredOnly: false,
  queryString: '',
  category: '',
  company: '',
  color: '',
  price: Number.MAX_SAFE_INTEGER,
  orderBy: '',
  freeShippingOnly: false
}) {
  const [productsOriginal, setProductsOriginal] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [colors, setColors] = useState([]);
  const [biggestPrice, setBiggestPrice] = useState(9_999_999);

  const { featuredOnly, queryString, category, company, color, price, orderBy, freeShippingOnly } = options;

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

    const checks = [];
    if(featuredOnly)
      checks.push(product => product.featured);
    if(queryString)
      checks.push(product => product.name.includes(queryString));
    if(category)
      checks.push(product => product.category === category);
    if(company)
      checks.push(product => product.company === company);
    if(color)
      checks.push(product => product.colors.includes(color));
    if(price)
      checks.push(product => product.price <= options.price);
    if(freeShippingOnly)
      checks.push(product => product.shipping);

    newProducts = newProducts.filter(product => {
      for(let i = 0; i < checks.length; i++)
        if(!checks[i](product))
          return false;

      return true;
    });

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
  }, [productsOriginal, featuredOnly, queryString, category, company, color, price, orderBy, freeShippingOnly]);
  
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
        setCompanies([...new Set(json.map(product => product.company))]);
        setColors([...new Set(json.map(product => product.colors).flat(1))]);

        let biggest = 0;
        for(let i = 0; i < json.length; i++)
          biggest = Math.max(biggest, json[i].price);

        setBiggestPrice(biggest);
      } catch(error) {
        console.error(error);
      }
    }

    fetchProducts();

    return () => ignore = true;
  }, []);

  return { products, categories, companies, colors, biggestPrice };
}

export default useProducts;