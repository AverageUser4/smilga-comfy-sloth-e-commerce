import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CurrentPath from '../../components/CurrentPath/CurrentPath.js';
import ProductInCart from '../../components/ProductInCart/ProductInCart.js';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection.js';
import CartProductsTableHead from '../../components/CartProductsTableHead/CartProductsTableHead.js';
import TotalPrice from '../../components/TotalPrice/TotalPrice.js';
import css from './temp.module.css';
import { useCartContext } from '../../utils/CartContext.js';
import { SINGLE_PRODUCT } from '../../utils/API_Endpoints';
import Loading from '../../components/Loading/Loading';

function Cart() {
  /*
    - currently there is a problem:
      - if the same product is in cart with 2 different colors
        the available propert is not correct
  */
  const { cart, cartChangeCount, cartRemove, cartEmpty } = useCartContext();
  const allIDs = [...(new Set(cart.map(product => product.id)))];
  const [IDsToData, setIDsToData] = useState(new Map());

  let subtotal = 0;
  for(let product of cart) {
    const data = IDsToData.get(product.id);

    if(!data) {
      subtotal = 0;
      break;
    }

    subtotal += product.count * data.price;
  }

  const productElements = [];
  for(let i = 0; i < cart.length; i++) {
    const data = IDsToData.get(cart[i].id);

    let sameProductDiffColorsCount = 0;
    const sameProductDiffColors = cart.filter(product => product.id === cart[i].id && product.color !== cart[i].color);
    for(let product of sameProductDiffColors)
      sameProductDiffColorsCount += product.count;

    if(data) {
      productElements.push(
        <ProductInCart
          key={`${cart[i].id} ${cart[i].color}`}
          name={data.name}
          color={cart[i].color}
          price={data.price}
          quantity={cart[i].count}
          setQuantity={(count) => cartChangeCount(cart[i].id, cart[i].color, count - cart[i].count)}
          available={data.stock - sameProductDiffColorsCount}
          image={data.images[0].thumbnails.large.url}
          remove={() => cartRemove(cart[i].id, cart[i].color)}
        />
      );
    } else {
      productElements.push(
        <Loading 
          key={`${cart[i].id} ${cart[i].color}`}
          style={{ width: 75, height: 75, margin: '0 auto 48px' }}
        />);
    }
  }
  
  useEffect(() => {
    let ignore = false;

    async function fetchProductsData(id) {
      try {
        const response = await fetch(SINGLE_PRODUCT + id);
        const json = await response.json();

        // always true for some reason
        // if(ignore)
        //   return;

        const newIDsToData = new Map(IDsToData);
        newIDsToData.set(id, json);
        setIDsToData(newIDsToData);
      } catch(error) {
        console.log(error);
      }
    }

    for(let id of allIDs)
      if(!IDsToData.has(id)) {
        const newIDsToData = new Map(IDsToData);
        newIDsToData.set(id, null);
        setIDsToData(newIDsToData);
        fetchProductsData(id);
      }

    return () => ignore = true;
  });

  if(!cart.length)
    return (
      <div>
        <CurrentPath/>
        <StandaloneSection isCentered={true}>
          <h1 className="heading heading--only-bottom-margin">Your cart is empty</h1>
          <Link className="button button--uppercase" to="/products">Fill it</Link>
        </StandaloneSection>
      </div>
    );
  
  return (
    <div>

      <CurrentPath/>

      <StandaloneSection>

        <CartProductsTableHead/>

        {productElements}

        <div className="line"></div>

        <div className="distant-twins-layout standalone standalone--small">
          <Link to="/products" className="button">Continue Shopping</Link>
          <button 
            onClick={cartEmpty}
            className="button button--color-1"
          >
            Clear Shopping Cart
          </button>
        </div>

        {
          subtotal ?
            <div className={`standalone standalone--medium standalone--no-bottom-margin ${css['total-container']}`}>
              <TotalPrice subtotal={subtotal} shipping={999} />
              <Link to="/login" className="button button--uppercase button--block">Login</Link>
            </div>
          :
            <Loading/>
        }

      </StandaloneSection>
      
    </div>
  );
}

export default Cart;