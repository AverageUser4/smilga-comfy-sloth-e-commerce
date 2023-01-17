import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CurrentPath from '../../components/CurrentPath/CurrentPath.js';
import ProductInCart from '../../components/ProductInCart/ProductInCart.js';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection.js';
import ProductsInCartHead from '../../components/ProductsInCartHead/ProductsInCartHead.js';
import TotalPrice from '../../components/TotalPrice/TotalPrice.js';
import Loading from '../../components/Loading/Loading';
import { useCartContext } from '../../utils/CartContext.js';
import { useAuthContext } from '../../utils/AuthContext.js';
import useDocumentTitle from '../../hooks/useDocumentTitle';

function Cart() {
  useDocumentTitle('Cart');
  const { isLoggedIn } = useAuthContext();
  const { cartProductsData, cartChangeCount, cartRemove, cartEmpty, totalPrice, requireFullData } = useCartContext();
  const [isError, setIsError] = useState(false);

  useEffect(() => requireFullData(), [requireFullData]);
  
  const productsInCart = [];
  for(let i = 0; i < cartProductsData.length; i++) {
    const item = cartProductsData[i];

    productsInCart.push(
      <ProductInCart
        key={`${item.id} ${item.color}`}
        id={item.id}
        color={item.color}
        quantity={item.count}
        setQuantity={(count) => cartChangeCount(item.id, item.color, count - item.count)}
        data={item.data}
        sameOfDifferentColorInCart={item.sameProductDiffColorsCount}
        remove={() => cartRemove(item.id, item.color)}
        setIsError={setIsError}
        locationData={{ url: '/cart', name: 'cart' }}
      />
    );
  }

  if(!cartProductsData.length)
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

        <ProductsInCartHead/>

        {productsInCart}

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
          totalPrice ?
            <div className="standalone standalone--medium standalone--no-bottom-margin center-then-right">
              <TotalPrice subtotal={totalPrice.products} shipping={totalPrice.shipping} />
              {
                isLoggedIn ?
                  <Link to="/checkout" className="button button--uppercase button--block">Proceed to checkout</Link>
                :
                  <Link to="/login" className="button button--uppercase button--block">Login</Link>
              }
            </div>
          :
            <Loading/>
        }

      </StandaloneSection>
      
    </div>
  );
}

export default Cart;