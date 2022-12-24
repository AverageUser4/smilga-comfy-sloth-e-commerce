import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CurrentPath from '../../components/CurrentPath/CurrentPath.js';
import ProductInCart from '../../components/ProductInCart/ProductInCart.js';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection.js';
import CartProductsTableHead from '../../components/CartProductsTableHead/CartProductsTableHead.js';
import TotalPrice from '../../components/TotalPrice/TotalPrice.js';
import css from './temp.module.css';
import { useCartContext } from '../../utils/CartContext.js';
import Loading from '../../components/Loading/Loading';

function Cart() {
  const { cart, cartChangeCount, cartRemove, cartEmpty } = useCartContext();
  const [IDsToPrices, setIDsToPrices] = useState(new Map());
  const [isError, setIsError] = useState(false);
  let subtotal = 0;

  const productElements = [];
  for(let i = 0; i < cart.length; i++) {
    const item = cart[i];
    
    let sameProductDiffColorsCount = 0;
    const sameProductDiffColors = cart.filter(product => product.id === item.id && product.color !== item.color);

    for(let product of sameProductDiffColors)
      sameProductDiffColorsCount += product.count;

    productElements.push(
      <ProductInCart
        key={`${item.id} ${item.color}`}
        id={item.id}
        color={item.color}
        quantity={item.count}
        setQuantity={(count) => cartChangeCount(item.id, item.color, count - item.count)}
        sameOfDifferentColorInCart={sameProductDiffColorsCount}
        remove={() => cartRemove(item.id, item.color)}
        setIsError={setIsError}
        setPrice={(price) => {
          setIDsToPrices(prev => {
            const copy = new Map(prev);
            copy.set(item.id, price);
            return copy;
          })
        }}
      />
    );

    subtotal += item.count * IDsToPrices.get(item.id);
  }

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
          isError ?
            <p className="error">Oops... we have some trouble getting needed data. Please, refresh the page.</p>
          :
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