import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useAuthContext } from './AuthContext';
import { SINGLE_PRODUCT } from './API_Endpoints';

function getCartFromStorage(username) {
  if(typeof username !== 'string')
    throw new Error(`First argument provided to "getCartFromStorage" has to be a string, provided: ${username}`);

  return JSON.parse(localStorage.getItem(`${username}-cart`) || '[]');
}

function saveCartToStorage(username, cart) {
  if(typeof username !== 'string')
    throw new Error(`First argument provided to "saveCartToStorage" has to be a string, provided: ${username}`);
  if(!Array.isArray(cart))
    throw new Error(`Second argument provided to "saveCartToStorage" has to be an array, provided: ${cart}`)

  try {
    localStorage.setItem(`${username}-cart`, JSON.stringify(cart));
  } catch(error) {
    console.error(error);
  }
}

const CartContext = createContext();

function CartProvider({ children }) {
  const { username } = useAuthContext();
  const [cart, setCart] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [IDsToData, setIDsToData] = useState(new Map());
  const [cartProductsData, setCartProductsData] = useState([]);
  const fetchedIDsRef = useRef([]);

  useEffect(() => {
    const data = cart.map(item => {
      let sameProductDiffColorsCount = 0;
      const sameProductDiffColors = cart.filter(product => product.id === item.id && product.color !== item.color);
  
      for(let product of sameProductDiffColors)
        sameProductDiffColorsCount += product.count;
  
      return { ...item, data: IDsToData.get(item.id), sameProductDiffColorsCount };
    });

    setCartProductsData(data);
  }, [cart, IDsToData]);

  useEffect(() => {
    if(!shouldFetch)
      return;

    const allIDs = [...(new Set(cart.map(product => product.id)))];

    async function fetchProductsData(id) {
      try {
        const response = await fetch(SINGLE_PRODUCT + id);
        const json = await response.json();

        setIDsToData(prev => {
          const newIDsToData = new Map(prev);
          newIDsToData.set(id, json);
          return newIDsToData;
        });
      } catch(error) {
        console.error(error);
        setIDsToData(prev => {
          const newIDsToData = new Map(prev);
          newIDsToData.set(id, { isError: true });
          return newIDsToData;
        });
      }
    }

    for(let id of allIDs) {
      if(!fetchedIDsRef.current.includes(id)) {
        fetchedIDsRef.current.push(id);
        fetchProductsData(id);
      }
    }
  }, [shouldFetch, cart, IDsToData]);

  useEffect(() => {
    setCart(getCartFromStorage(username));
  }, [username]);
  
  let totalPrice = { products: 0, shipping: 0 };
  const overflowingProducts = [];
  const checkedIDs = [];

  for(let i = 0; i < cartProductsData.length; i++) {
    const item = cartProductsData[i];
    if(!item.data || item.data.isError) {
      totalPrice = null;
      break;
    }

    totalPrice.products += item.data.price * item.count;
    totalPrice.shipping += item.data.shipping ? 0 : 99 * item.count;

    if(!checkedIDs.includes(item.id)) {
      const overflow = item.data.stock - (item.count + item.sameProductDiffColorsCount);
      if(overflow < 0)
        overflowingProducts.push({ id: item.id, name: item.data.name, overflow: -overflow })
  
      checkedIDs.push(item.id);
    }
  }
  
  function checkArgs(id, color, count) {
    if(!id)
      throw new Error(`Incorrect id provided: '${id}'`);
    if(!color)
      throw new Error(`Incorrect color provided: '${color}'`);
    if(!Number.isInteger(count) || count === 0)
      throw new Error(`'count' argument has to be an integer !== 0 , provided: '${count}'`);
  }

  function requireFullData() {
    if(shouldFetch)
      return;

    setShouldFetch(true);
  }
  
  function getItemIndex(id, color) {
    const index = cart.findIndex(product => product.id === id && product.color === color);
    const itemExists = index !== -1;
      
    return { index, itemExists };
  }

  function cartGetItemCount(id, color) {
    checkArgs(id, color, 1);
    const { index } = getItemIndex(id, color, 1);

    return cart?.[index].count || 0;
  }

  function cartGetItemTypeCount(id) {
    checkArgs(id, '#000000', 1);
    const items = cart.filter(product => product.id === id);
    let count = 0;
    
    for(let i = 0; i < items.length; i++)
      count += items[i].count;

    return count;
  }

  function cartChangeCount(id, color, count) {
    checkArgs(id, color, count);
    const { index, itemExists } = getItemIndex(id, color, count);

    if(!itemExists && count < 0)
      throw new Error(`Tried to subtract from count of item that does not exist. id: '${id}', color: '${color}'`);

    const currentCount = cart?.[index]?.count || 0;
    const copy = [...cart];

    if(currentCount + count <= 0) {
      cartRemove(id, color, count);
      return;
    }

    if(itemExists)
      copy[index] = { id, color, count: currentCount + count };
    else
      copy.push({ id, color, count });

    setCart(copy);
    saveCartToStorage(username, copy);
  }
  
  function cartEmpty() {
    setCart([]);
    saveCartToStorage(username, []);
  }

  function cartRemove(id, color) {
    checkArgs(id, color, 1);
    const { index, itemExists } = getItemIndex(id, color, 1);

    if(!itemExists)
      throw new Error(`Tried to remove item that is not in the cart. id: ${id}, color: ${color}`);

    const copy = [...cart];
    copy.splice(index, 1);
    setCart(copy);
    saveCartToStorage(username, copy);
  }
  
  return (
    <CartContext.Provider 
      value={{
        cartProductsData,
        totalPrice,
        overflowingProducts,
        requireFullData,
        cartGetItemCount,
        cartGetItemTypeCount,
        cartChangeCount,
        cartRemove,
        cartEmpty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.element
};

function useCartContext() {
  return useContext(CartContext);
}

export {
  CartProvider,
  useCartContext
};