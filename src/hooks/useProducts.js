import { useEffect, useState } from 'react';
import { shuffleArray } from '../utils/utils';

const API_ENDPOINT = 'https://course-api.com/react-store-products';

const defaultOptions = { 
  featuredOnly: false, queryString: '', category: '', company: '', color: '',
  priceMin: '', priceMax: '', orderBy: '', freeShippingOnly: false
};
const optionKeys = [];
for(let key in defaultOptions)
  optionKeys.push(key);

const initialData = {
  productsOriginal: [],
  products: [],
  categories: [],
  companies: [],
  colors: []
};

function useProducts(options = defaultOptions) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(initialData);
  // const [productsOriginal, setProductsOriginal] = useState([]);
  // const [products, setProducts] = useState([]);
  // const [categories, setCategories] = useState([]);
  // const [companies, setCompanies] = useState([]);
  // const [colors, setColors] = useState([]);

  const { 
    featuredOnly, queryString, category, company, color, 
    priceMin, priceMax, orderBy, freeShippingOnly
  } = options;

  const dependencyArrayForFirstEffect = [data.productsOriginal].concat(optionKeys.map(key => options[key]));
  useEffect(() => {
    let newProducts = [...data.productsOriginal];

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
    if(priceMin)
      checks.push(product => product.price >= priceMin * 100);
    if(priceMax)
      checks.push(product => product.price <= priceMax * 100);
    if(freeShippingOnly)
      checks.push(product => product.shipping);

    newProducts = newProducts.filter(product => {
      for(let i = 0; i < checks.length; i++)
        if(!checks[i](product))
          return false;

      return true;
    });

    switch(orderBy) {
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
        throw new Error(`Unrecognized "orderBy" argument: "${orderBy}"`)
    }

    setData(prev => ({ ...prev, products: newProducts }));
  }, dependencyArrayForFirstEffect);
  //[productsOriginal, featuredOnly, queryString, category, company, color, priceMin, priceMax, orderBy, freeShippingOnly]
  
  useEffect(() => {
    let ignore = false;

    async function fetchProducts() {
      try {
        const data = await fetch(API_ENDPOINT);
        let json = await data.json();
  
        if(ignore)
          return;

        setData(prev => ({
          ...prev,
          productsOriginal: json,
          categories: [...new Set(json.map(product => product.category))],
          companies: [...new Set(json.map(product => product.company))],
          colors: [...new Set(json.map(product => product.colors).flat(1))]
        }));
      } catch(error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();

    return () => ignore = true;
  }, []);

  return { 
    products: data.products, categories: data.categories, companies: data.companies,
    colors: data.colors, isLoading
  };
}

export default useProducts;