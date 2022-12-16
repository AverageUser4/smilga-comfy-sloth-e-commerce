import React from 'react';
import { Link } from 'react-router-dom';
import CurrentPath from '../../components/CurrentPath/CurrentPath.js';
import ProductInCart from '../../components/ProductInCart/ProductInCart.js';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection.js';

function Cart() {
  return (
    <div>

      <CurrentPath/>

      {/* <StandaloneSection isCentered={true}>
        <h1 className="heading heading--only-bottom-margin">Your cart is empty</h1>
        <Link className="button button--uppercase" to="/products">Fill it</Link>
      </StandaloneSection> */}

      <StandaloneSection>

        <ProductInCart
          name={'amazing product'}
          color={'red'}
          price={1200}
          quantity={2}
          setQuantity={x=>x}
        />

      </StandaloneSection>
      
    </div>
  );
}

export default Cart;