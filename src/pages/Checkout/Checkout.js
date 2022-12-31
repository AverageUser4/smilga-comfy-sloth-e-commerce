import React, { useState } from 'react';
import { Link } from  'react-router-dom';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection';
import CurrentPath from '../../components/CurrentPath/CurrentPath';
import { useAuthContext } from '../../utils/AuthContext';
import { useCartContext } from '../../utils/CartContext';
import PayBox from '../../components/PayBox/PayBox';
import { stringifyPrice } from '../../utils/utils';
import Loading from '../../components/Loading/Loading';

function Checkout() {
  const { username, isLoggedIn } = useAuthContext();
  const { cartProductsData, totalPrice } = useCartContext();
  const [hasPaid, setHasPaid] = useState(false);

  if(!isLoggedIn)
    return (
      <div>
        <CurrentPath/>

        <StandaloneSection isCentered={true}>
          <h1 className="heading heading--only-bottom-margin heading--medium">You have to log in to be able to buy our products.</h1>
          <Link to="/login" className="button button--uppercase">Login</Link>
        </StandaloneSection>
      </div>
    );

  if(hasPaid)
    return (
      <div>

        <CurrentPath/>

        <StandaloneSection isCentered={true}>

          <h1 className="heading heading--small heading--no-margin">Congraulations, <span className="dramatic-emphasis">you moron!</span></h1>
          <p className="paragraph paragraph--color-1">You just have been scammed! All of your money now belongs to us.</p>
          <Link to="/" className="button button--uppercase">Go back to the homepage</Link>

        </StandaloneSection>

      </div>
    );

  if(!cartProductsData.length)
    return (
      <div>
        <CurrentPath/>
        <StandaloneSection isCentered={true}>
          <h1 className="heading heading--only-bottom-margin heading--medium">Nothing in your cart yet.</h1>
          <Link to="/products" className="button button--uppercase">See what&apos;s in stock</Link>
        </StandaloneSection>
      </div>
    );

  if(!totalPrice)
    return (
      <div>
        <CurrentPath/>
        <Loading/>
      </div>
    );
  
  return (
    <div>

      <CurrentPath/>

      <StandaloneSection isCentered={true}>

        <h1 className="heading heading--small heading--no-margin">Hello, {username}!</h1>
        <p className="paragraph paragraph--color-1">Your total is {stringifyPrice(totalPrice.products + totalPrice.shipping)}</p>

        <PayBox onSubmit={() => setHasPaid(true)}/>

      </StandaloneSection>

    </div>
  );
}

export default Checkout;