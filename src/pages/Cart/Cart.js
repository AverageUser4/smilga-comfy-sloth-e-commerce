import React from 'react';
import { Link } from 'react-router-dom';
import CurrentPath from '../../components/CurrentPath/CurrentPath.js';
import ProductInCart from '../../components/ProductInCart/ProductInCart.js';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection.js';
import CartProductsTableHead from '../../components/CartProductsTableHead/CartProductsTableHead.js';
import TotalPrice from '../../components/TotalPrice/TotalPrice.js';

function Cart() {
  return (
    <div>

      <CurrentPath/>

      {/* DONT DELETE, FOR USE LATER !!!!!!!! */}
      {/* <StandaloneSection isCentered={true}>
        <h1 className="heading heading--only-bottom-margin">Your cart is empty</h1>
        <Link className="button button--uppercase" to="/products">Fill it</Link>
      </StandaloneSection> */}

      <StandaloneSection>

        <CartProductsTableHead/>

        <ProductInCart
          name={'amazing product'}
          color={'red'}
          price={1200}
          quantity={2}
          setQuantity={x=>x}
        />

        <ProductInCart
          name={'amazing product'}
          color={'red'}
          price={1200}
          quantity={2}
          setQuantity={x=>x}
        />

        <div className="line"></div>

        <div className="distant-twins-layout standalone-element standalone-element--small">
          <Link to="/products" className="button">Continue Shopping</Link>
          <button className="button button--color-1">Clear Shopping Cart</button>
        </div>

        <div className="standalone-element standalone-element--medium push-right">
          <TotalPrice subtotal={1239.89} shipping={12.32} />
          <Link to="/login" className="button button--uppercase">Login</Link>
        </div>

      </StandaloneSection>
      
    </div>
  );
}

export default Cart;