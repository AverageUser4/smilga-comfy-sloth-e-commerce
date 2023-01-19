import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [name, setName] = useState('');
  const channelRef = useRef();
  const isLoggedIn = name ? true : false;

  const login = useCallback((username) => {
    if(typeof username !== 'string' || username.length < 3)
      throw new Error('Invalid username provided to login function.');

    setName(username);
    channelRef.current.postMessage({ action: 'login', info: { username } });
  }, []);

  const logout = useCallback(() => {
    if(!isLoggedIn)
      console.error('logout() function called although it appears user is not logged in.');

    setName('');
    channelRef.current.postMessage({ action: 'logout' });
  }, [isLoggedIn]);

  useEffect(() => {
    const name = sessionStorage.getItem('user');
    if(name)
      setName(name);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('user', name);
  }, [name]);
  
  useEffect(() => {
    channelRef.current = new BroadcastChannel('auth');

    channelRef.current.addEventListener('message', (event) => {
      const { action, info } = event.data;

      switch(action) {
        case 'logout':
          logout();
          break;

        case 'login':
          login(info.username);
          break;
          
        default:
          throw new Error(`Unrecognized message data: ${action}`);
      }
    });

    channelRef.current.addEventListener('messageerror', (event) => {
      console.error('messageerror in AuthProvider', event);
    });
    
    return () => channelRef.current.close();
  }, [login, logout]);
  
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