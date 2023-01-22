import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuthContext } from './AuthContext';
import { SINGLE_PRODUCT } from './API_Endpoints';
import { getColorName } from '../utils/utils';

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
  const latestUsernameRef = useRef(Math.random());
  const channelRef = useRef();
  const [cart, setCart] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [IDsToData, setIDsToData] = useState(new Map());
  const [cartProductsData, setCartProductsData] = useState([]);
  const fetchedIDsRef = useRef([]);
  const [mergeNotificationData, setMergeNotificationData] = useState({ content: '', timeout: 30000, type: '', data: null });
  const [readyPhase, setReadyPhase] = useState({ id: 0, name: 'initial' });
  
  const getSameProductDiffColorCount = useCallback((cart, item) => {
    let sameProductDiffColorsCount = 0;
    const sameProductDiffColors = cart.filter(product => product.id === item.id && product.color !== item.color);

    for(let product of sameProductDiffColors)
      sameProductDiffColorsCount += product.count;

    return sameProductDiffColorsCount;
  }, []);

  const cartMergeGuestWithUser = useCallback((cart, username) => {
    /* 
      when user has some items in the 'guest' account and then logs into actual account
      carts of boths are merged with respect to following rules:
        - nothing gets removed from the actual account
        - if item from guest account cannot fit to new cart it does not get added
        (if there is no remaining space) or only x amount gets added (when there is x remaining space)

      this function also creates changelog describing what was added to cart
    */
    const guestCart = [...cart];
    const userCart = getCartFromStorage(username);    
    const outcomeCart = userCart;
    const dataListItems = [];
    let newCount = 0;
    let changedCount = 0;
    let notFittingCount = 0;
    let notFullyFittingCount = 0;
    let messages = '';
    let content;

    for(let i = 0; i < guestCart.length; i++) {
      const guestItem = guestCart[i];
      const sameItemIndex = outcomeCart.findIndex(userItem => 
        userItem.id === guestItem.id && userItem.color === guestItem.color
      );

      if(sameItemIndex !== -1) {
        const outcomeItem = outcomeCart[sameItemIndex];
        const sameProductDiffColorsCount = getSameProductDiffColorCount(outcomeCart, outcomeItem);
        const availableSpace = outcomeItem.stock - sameProductDiffColorsCount;

        if(availableSpace) {
          const oldCount = outcomeItem.count;
          outcomeItem.count = Math.min(outcomeItem.count + guestItem.count, availableSpace);

          if(outcomeItem.count < oldCount + guestItem.count) {
            notFullyFittingCount++;
          }
          
          if(oldCount !== outcomeItem.count) {
            changedCount++;
            dataListItems.push(
              <li key={i}>
                Changed amount of ordered product <Link to={`products/${outcomeItem.id}`}>{outcomeItem.name}</Link> ({getColorName(outcomeItem.color)}) from {oldCount} to {outcomeItem.count}.
              </li>
            );
          }
        }
      } else {
        const sameProductDiffColorsCount = getSameProductDiffColorCount(outcomeCart, guestItem);
        const availableSpace = guestItem.stock - sameProductDiffColorsCount;

        if(availableSpace) {
          const oldCount = guestItem.count;
          guestItem.count = Math.min(guestItem.count, availableSpace);

          if(guestItem.count < oldCount) {
            notFullyFittingCount++;
          }

          outcomeCart.push(guestItem);
          newCount++;
          dataListItems.push(
            <li key={i}>
              Added product <Link to={`products/${guestItem.id}`}>{guestItem.name}</Link> ({getColorName(guestItem.color)}) x{guestItem.count} to your cart.
            </li>
          );
        } else {
          notFittingCount++;
          dataListItems.push(
            <li key={i}>
              Product <Link to={`products/${guestItem.id}`}>{guestItem.name}</Link> ({getColorName(guestItem.color)}) did not fit into your cart, because all of its stock is already in your cart.
            </li>
          );
        }
      }
    }

    for(let i = outcomeCart.length - 1; i >= 0; i--) {
      const item = outcomeCart[i];
      const sameProductDiffColorsCount = getSameProductDiffColorCount(outcomeCart, item);

      const availableSpace = item.stock - sameProductDiffColorsCount;

      if(availableSpace <= 0)
        outcomeCart.splice(i, 1);
      else
        item.count = Math.min(item.count, availableSpace);
    }

    messages += newCount ? `Added ${newCount} new item${newCount > 1 ? 's' : ''} to your cart. ` : '';
    messages += changedCount ? `Increased amount of ${changedCount} item${changedCount > 1 ? 's' : ''} in your cart. ` : '';
    messages += notFullyFittingCount ? `${notFullyFittingCount} item${notFullyFittingCount > 1 ? 's' : ''} didn't fully fit in your cart, because there is not enough in stock. ` : '';
    messages += notFittingCount ? `${notFittingCount} item${notFittingCount > 1 ? 's' : ''} didn't fit in your cart, because all of its stock is already in your cart. ` : '';
    content = <p>Your user cart has been merged with your guest cart. {messages} For more detail, checkout the <Link to="/cart-changelog">changelog</Link>.</p>;
    
    if(guestCart.length)
      setMergeNotificationData(prev => ({ 
        ...prev, content,
        data: dataListItems.length ? dataListItems : null
      }));

    setCart(outcomeCart);
    saveCartToStorage(username, outcomeCart);
    channelRef.current.postMessage({ action: 'cartChange', info: { cart: outcomeCart } });
  }, [getSameProductDiffColorCount]);

  useEffect(() => {
    /* handle messaging between different contexts (browser tabs / windows) 
       makes sure the cart stays the same between all the contexts */

    channelRef.current = new BroadcastChannel('cart');

    channelRef.current.addEventListener('message', (event) => {
      const { action, info } = event.data;

      switch(action) {
        case 'cartChange':
          setCart(info.cart);
          break;

        default:
          throw new Error(`Unrecognized message data: ${action}`);
      }
    });

    channelRef.current.addEventListener('messageerror', (event) => {
      console.error('messageerror in AuthProvider', event);
    });
    
    return () => channelRef.current.close();
  }, []);

  useEffect(() => {
    /* sets cartProductsData, cartProductsData is combination of cart 
       and additional data, as can be seen right below */

    const data = cart.map(item => {
      const sameProductDiffColorsCount = getSameProductDiffColorCount(cart, item);
      return { ...item, data: IDsToData.get(item.id), sameProductDiffColorsCount };
    });

    setCartProductsData(data);
  }, [cart, IDsToData, getSameProductDiffColorCount]);

  useEffect(() => {
    /* fetch data for every product that is in cart if it was not
       fetched yet, if 2 or more products share the same id, the data
       is fetched only once, as it is fetched per id */

    /* by default this hook does not perform any fetches,
       user has to call requireFullData first */
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
    /* set cart when username changes */

    // if username didn't change dont do anything
    if(username === latestUsernameRef.current)
      return;
      
    /* if user logged in and was not logged in before merge his guest 
       cart with the one they have on account they've just logged into */
    if(latestUsernameRef.current === '') {
      cartMergeGuestWithUser(cart, username);
      saveCartToStorage('', []);
    /* if user logs out or changes account just get the cart for that account */
    } else {
      setCart(getCartFromStorage(username));
    }

    latestUsernameRef.current = username;
  }, [username, cart, cartMergeGuestWithUser]);

  useEffect(() => {
    /* handles readyPhases of the CartContext,
       used by components to show loading screen or something like that */
    if(readyPhase.id !== 2 && cartProductsData.length && !cartProductsData.find(product => !product.data))
      setReadyPhase({ id: 2, name: 'all-fetched' });
    else if(readyPhase.id === 0)
      setReadyPhase({ id: 1, name: 'effects-ran' });
  }, [readyPhase, cartProductsData]);
  
  let totalPrice = cartProductsData.length ? { products: 0, shipping: 0 } : null;
  const overflowingProducts = [];
  const IDsCheckedForOverflow = [];

  for(let i = 0; i < cartProductsData.length; i++) {
    const item = cartProductsData[i];
    if(!item.data || item.data.isError) {
      totalPrice = null;
      break;
    }

    totalPrice.products += item.data.price * item.count;
    totalPrice.shipping += item.data.shipping ? 0 : 99 * item.count;

    if(!IDsCheckedForOverflow.includes(item.id)) {
      const overflow = item.data.stock - (item.count + item.sameProductDiffColorsCount);
      if(overflow < 0)
        overflowingProducts.push({ id: item.id, name: item.data.name, overflow: -overflow })
  
      IDsCheckedForOverflow.push(item.id);
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

  function cartChangeCount(id, color, count, stock, name) {
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
      copy[index] = { ...copy[index], id, color, count: currentCount + count };
    else {
      if((!stock && stock !== 0) || !name)
        throw new Error('When adding brand-new item to cart, stock and name have to be provided.');

      copy.push({ id, color, count, stock, name });
    }

    setCart(copy);
    saveCartToStorage(username, copy);
    channelRef.current.postMessage({ action: 'cartChange', info: { cart: copy } });
  }
  
  function cartEmpty() {
    setCart([]);
    saveCartToStorage(username, []);
    channelRef.current.postMessage({ action: 'cartChange', info: { cart: [] } });
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
    channelRef.current.postMessage({ action: 'cartChange', info: { cart: copy } });
  }
  
  return (
    <CartContext.Provider 
      value={{
        cartProductsData,
        totalPrice,
        overflowingProducts,
        mergeNotificationData,
        readyPhase,
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