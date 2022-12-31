import React from 'react';
import { Link } from  'react-router-dom';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection';
import CurrentPath from '../../components/CurrentPath/CurrentPath';
import { useAuthContext } from '../../utils/AuthContext';
import PayBox from '../../components/PayBox/PayBox';

function Checkout() {
  const { username, isLoggedIn } = useAuthContext();

  if(!isLoggedIn)
    return (
      <StandaloneSection isCentered={true}>
        <h1 className="heading heading--only-bottom-margin heading--medium">You have to log in to be able to buy our products.</h1>
        <Link to="/login" className="button button--uppercase">Login</Link>
      </StandaloneSection>
    );
  
  return (
    <div>

      <CurrentPath/>

      <StandaloneSection isCentered={true}>

        <h1 className="heading heading--small heading--no-margin">Hello, {username}!</h1>
        <p className="paragraph paragraph--color-1">Your total is $3,918.81</p>

        <PayBox/>

      </StandaloneSection>

    </div>
  );
}

export default Checkout;