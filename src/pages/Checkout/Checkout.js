import React, { useEffect, useState } from 'react';
import { Link } from  'react-router-dom';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection';
import CurrentPath from '../../components/CurrentPath/CurrentPath';
import Dialog from '../../components/Dialog/Dialog';
import { useAuthContext } from '../../utils/AuthContext';
import { useCartContext } from '../../utils/CartContext';
import PayBox from '../../components/PayBox/PayBox';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import CheckoutProductsList from '../../components/CheckoutProductsList/CheckoutProductsList';
import { stringifyPrice } from '../../utils/utils';

function Checkout() {
  useDocumentTitle('Checkout');
  const { username, isLoggedIn } = useAuthContext();
  const { cartProductsData, totalPrice, cartEmpty, overflowingProducts, requireFullData } = useCartContext();
  const [hasPaid, setHasPaid] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
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
        <h1 className="heading heading--small heading--no-margin">Thank you!</h1>
        <p className="paragraph paragraph--color-1">Your products will be shipped to you within 3 working days.</p>
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
  else if(totalPrice) {
    const priceString = stringifyPrice(totalPrice.products + totalPrice.shipping);
    content = (
      <>
        <Dialog
          isShown={showDialog}
          heading="Are you sure?"
          message={`You will have to pay ${priceString}.`}
          onConfirm={() => { setShowDialog(false); setHasPaid(true); cartEmpty(); }}
          onReject={() => setShowDialog(false)}
        />

        <h1 className="heading heading--small heading--no-margin">Hello, {username}!</h1>
        <p className="paragraph paragraph--color-1">Your total is {priceString}</p>
        <CheckoutProductsList/>
        <PayBox onSubmit={() => setShowDialog(prev => !prev)}/>
      </>
    );
  }

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