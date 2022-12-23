import { useEffect, useState } from 'react';
import { shuffleArray } from '../utils/utils';
import { ALL_PRODUCTS } from '../utils/API_Endpoints';
import { sortArrayOfObjectsByProperty } from '../utils/utils';

const defaultOptions = { 
  featuredOnly: false, queryString: '', category: '', company: '', color: '',
  priceMin: '', priceMax: '', orderBy: '', freeShippingOnly: false
};

const optionKeys = [];
for(let key in defaultOptions)
  optionKeys.push(key);

const initialData = {
  productsOriginal: [], products: [], 
  allCategories: [], allCompanies: [],  allColors: [],
};

function useProducts(options = defaultOptions) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState(initialData);

  const { 
    featuredOnly, queryString, category, company, color, 
    priceMin, priceMax, orderBy, freeShippingOnly
  } = options;

  useEffect(() => {
    let ignore = false;

    async function fetchProducts() {
      try {
        const data = await fetch(ALL_PRODUCTS);
        let json = await data.json();
  
        if(ignore)
          return;

        setData(prev => ({
          ...prev,
          productsOriginal: json,
          allCategories: [...new Set(json.map(product => product.category))],
          allCompanies: [...new Set(json.map(product => product.company))],
          allColors: [...new Set(json.map(product => product.colors).flat(1))]
        }));
      } catch(error) {
        console.error(error);
        setError('We were unable to get data of our products. Please, refresh the page or try again later.');
      }
    }

    fetchProducts();

    return () => ignore = true;
  }, []);
  
  const dependencyArray = [data.productsOriginal].concat(optionKeys.map(key => options[key]));
  useEffect(() => {
    let newProducts = [...data.productsOriginal];
    if(!newProducts.length)
      return;

    const checks = [];
    if(featuredOnly) checks.push(product => product.featured);
    if(queryString) checks.push(product => product.name.includes(queryString));
    if(category) checks.push(product => product.category === category);
    if(company) checks.push(product => product.company === company);
    if(color) checks.push(product => product.colors.includes(color));
    if(priceMin) checks.push(product => product.price >= priceMin * 100);
    if(priceMax) checks.push(product => product.price <= priceMax * 100);
    if(freeShippingOnly) checks.push(product => product.shipping);

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
        newProducts = sortArrayOfObjectsByProperty(newProducts, 'name');
        break;
      }

      case 'nameDesc':
        newProducts = sortArrayOfObjectsByProperty(newProducts, 'name', true);
        break;
        
      case '':
        break;

      default:
        throw new Error(`Unrecognized "orderBy" argument: "${orderBy}"`)
    }

    setData(prev => ({ ...prev, products: newProducts }));
    setIsLoading(false);
  }, dependencyArray);
  //[productsOriginal, featuredOnly, queryString, category, company, color, priceMin, priceMax, orderBy, freeShippingOnly]
  
  return { 
    products: data.products, 
    allCategories: data.allCategories,
    allCompanies: data.allCompanies,
    allColors: data.allColors,
    isLoading,
    error
  };
}

export default useProducts;