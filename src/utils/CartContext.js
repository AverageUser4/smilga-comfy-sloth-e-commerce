import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuthContext } from './AuthContext';

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

  localStorage.setItem(`${username}-cart`, JSON.stringify(cart));
}

const CartContext = createContext();

function CartProvider({ children }) {
  const { username } = useAuthContext();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCartFromStorage(username));
  }, [username]);

  useEffect(() => {
    console.log(cart)
    saveCartToStorage(username, cart);
  }, [username, cart]);
  
  function checkArgs(id, color, count) {
    if(!id)
      throw new Error(`Incorrect id provided: '${id}'`);
    if(!color)
      throw new Error(`Incorrect color provided: '${color}'`);
    if(!Number.isInteger(count) || count === 0)
      throw new Error(`'count' argument has to be an integer !== 0 , provided: '${count}'`);
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
  }
  
  function cartEmpty() {
    setCart([]);
  }

  function cartRemove(id, color) {
    checkArgs(id, color, 1);
    const { index, itemExists } = getItemIndex(id, color, 1);

    if(!itemExists)
      throw new Error(`Tried to remove item that is not in the cart. id: ${id}, color: ${color}`);

    setCart(prev => {
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  }
  
  return (
    <CartContext.Provider 
      value={{
        cart,
        cartGetItemCount,
        cartGetItemTypeCount,
        cartChangeCount,
        cartRemove,
        cartEmpty
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