import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function getCart(username) {
  if(typeof username !== 'string')
    throw new Error('First argument provided to "getCart" has to be a string.');

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

  // function cartAdd(product, count) {
  //  const existingIndex = user.cart.findIndex(p => p.id === product.id)
  // }

  // function cartSubtract(id, color) {

  // }

  function login(username, password) {
    if(typeof username !== 'string' || username.length < 3)
      throw new Error('Invalid username provided to login function.');

    // silence unused vars warning
    password;

    setUser({ name: username, isLoggedIn: true, cart: getCart(username) });
    sessionStorage.setItem('user', username);
  }

  function logout() {
    if(!user.isLoggedIn)
      console.error('logout() function called although it appears user is not logged in.');

    setUser({ name: '', isLoggedIn: true, cart: getCart('') });
    sessionStorage.setItem('user', '');
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