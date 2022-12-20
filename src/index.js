import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.js';
import './index.css';
import { AuthProvider } from './utils/AuthContext.js';
import { CartProvider } from './utils/CartContext.js';

const root = ReactDOM.createRoot(window.root);
root.render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <App/>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);