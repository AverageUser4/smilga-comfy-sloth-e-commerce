import React from 'react';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useAuthContext } from '../../utils/AuthContext.js';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import useDocumentTitle from '../../hooks/useDocumentTitle';

function Login() {
  const { isLoggedIn, username } = useAuthContext();
  useDocumentTitle('Login');

  if(isLoggedIn)
    return (
      <StandaloneSection isCentered={true}>
        <h1 className="heading heading--only-bottom-margin heading--medium">You are logged in, {username}!</h1>
        <Link to="/products" className="button button--uppercase">See what&apos;s in stock</Link>
      </StandaloneSection>
    );
  
  return (
    <StandaloneSection>

      <div className="center-500-width-cap">

        <h1 className="heading heading--no-margin heading--medium">Login</h1>

        <LoginForm/>

      </div>
      
    </StandaloneSection>
  );
}

export default Login;