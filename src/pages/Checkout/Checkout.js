import React, { useEffect, useState } from 'react';
import { Link } from  'react-router-dom';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection';
import CurrentPath from '../../components/CurrentPath/CurrentPath';
import { useAuthContext } from '../../utils/AuthContext';
import { useCartContext } from '../../utils/CartContext';
import PayBox from '../../components/PayBox/PayBox';
import { stringifyPrice } from '../../utils/utils';
import useDocumentTitle from '../../hooks/useDocumentTitle';

function Checkout() {
  useDocumentTitle('Checkout');
  const { username, isLoggedIn } = useAuthContext();
  const { cartProductsData, totalPrice, cartEmpty, overflowingProducts, requireFullData } = useCartContext();
  const [hasPaid, setHasPaid] = useState(false);

  useEffect(() => requireFullData(), [requireFullData]);
  
  let content = <div></div>;

  if(!isLoggedIn)
    content = (
      <>
        <h1 className="heading heading--only-bottom-margin heading--medium">You have to log in to be able to buy our products.</h1>
        <Link to="/login" className="button button--uppercase">Login</Link>
      </>
    );
  else if(hasPaid)
    content = (
      <>
        <h1 className="heading heading--small heading--no-margin">Congraulations, <span className="dramatic-emphasis">you moron!</span></h1>
        <p className="paragraph paragraph--color-1">You just have been scammed! All of your money now belongs to us.</p>
        <Link to="/" className="button button--uppercase">Go back to the homepage</Link>
      </>
    );
  else if(!cartProductsData.length)
    content = (
      <>
        <h1 className="heading heading--only-bottom-margin heading--medium">Nothing in your cart yet.</h1>
        <Link to="/products" className="button button--uppercase">See what&apos;s in stock</Link>
      </>
    );
  else if(overflowingProducts.length)
      content = (
        <>
          <h1 className="heading heading--only-bottom-margin heading--medium">Oops... looks like you are trying to buy more than we have in our stock.</h1>
          <p className="paragraph paragraph--color-1">Please, go to your cart and remove given amounts of these products:</p>
          <ul>
            {
              overflowingProducts.map(item => (
                <li key={item.id}>
                  You have {item.overflow} <Link to={`/products/${item.id}`}>{item.name}</Link> more in your cart than we have in our stock.
                </li>
              ))
            }
          </ul>
        </>
      );
  else if(totalPrice)
    content = (
      <>
        <h1 className="heading heading--small heading--no-margin">Hello, {username}!</h1>
        <p className="paragraph paragraph--color-1">Your total is {stringifyPrice(totalPrice.products + totalPrice.shipping)}</p>
        <PayBox onSubmit={() => { setHasPaid(true); cartEmpty(); }}/>
      </>
    );

  return (
    <div>

      <CurrentPath/>

      <StandaloneSection isCentered={true}>
        {content}
      </StandaloneSection>

    </div>
  );
}

export default Checkout;