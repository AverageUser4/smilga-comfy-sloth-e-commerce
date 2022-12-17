import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function getCart(username) {
  return JSON.parse(localStorage.getItem(`${username}-cart`) || '[]');
}

const AuthContext = createContext();

function AuthProvider({ children }) {
  // note usage of both sessionStorage and localStorage in this component

  const [user, setUser] = useState({
    name: '',
    isLoggedIn: false,
    cart: []
  });

  useEffect(() => {
    const name = sessionStorage.getItem('user') || '';
    const isLoggedIn = name ? true : false;
    const cart = getCart(name);

    setUser({ name, isLoggedIn, cart });
  }, []);

  useEffect(() => {
    setUser(prev => ({ 
      ...prev, 
      cart: getCart(user.name),
      isLoggedIn: user.name ? true : false
    }));

    sessionStorage.setItem('user', user.name);
  }, [user.name]);

  function login(username, password) {
    if(typeof username !== 'string' || username.length < 3)
      throw new Error('Invalid username provided to login function.');

    // silence unused vars warning
    password;

    setUser(prev => ({ ...prev, name: username }));
  }

  function logout() {
    if(!user.isLoggedIn)
      console.error('logout() function called although it appears user is not logged in.');

    setUser(prev => ({ ...prev, name: '' }));
  }
  
  return (
    <AuthContext.Provider 
      value={{
        username: user.name,
        isLoggedIn: user.isLoggedIn,
        cart: user.cart,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.element
};


function useAuthContext() {
  return useContext(AuthContext);
}

export {
  AuthProvider,
  useAuthContext
};