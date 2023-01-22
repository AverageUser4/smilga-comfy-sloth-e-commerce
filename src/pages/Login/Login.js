import React from 'react';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection';
import LoginForm from '../../components/LoginForm/LoginForm';
import CurrentPath from '../../components/CurrentPath/CurrentPath';
import { useAuthContext } from '../../utils/AuthContext.js';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import useDocumentTitle from '../../hooks/useDocumentTitle';

function Login() {
  const { isLoggedIn, username } = useAuthContext();
  useDocumentTitle('Login');

  if(isLoggedIn)
    return (
      <div>

        <CurrentPath/>

        <StandaloneSection isCentered={true}>
          <h1 className="heading heading--only-bottom-margin heading--medium">You are logged in, {username}!</h1>
          <Link to="/products" className="button button--uppercase">See what&apos;s in stock</Link>
        </StandaloneSection>
        
      </div>
    );
  
  return (
    <div>

      <CurrentPath/>

      <StandaloneSection>

        <div className="center-500-width-cap">

          <h1 className="heading heading--no-margin heading--medium">Login</h1>

          <LoginForm/>

        </div>
        
      </StandaloneSection>
      
    </div>
  );
}

export default Login;