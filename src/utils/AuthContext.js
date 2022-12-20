import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [name, setName] = useState('');
  const isLoggedIn = name ? true : false;

  useEffect(() => {
    const name = sessionStorage.getItem('user');
    if(name)
      setName(name);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('user', name);
  }, [name]);

  function login(username) {
    if(typeof username !== 'string' || username.length < 3)
      throw new Error('Invalid username provided to login function.');

    setName(username);
  }

  function logout() {
    if(!isLoggedIn)
      console.error('logout() function called although it appears user is not logged in.');

    setName('');
  }
  
  return (
    <AuthContext.Provider 
      value={{
        username: name,
        isLoggedIn,
        login,
        logout,
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