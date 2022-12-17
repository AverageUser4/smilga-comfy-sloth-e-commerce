import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.js';
import './index.css';
import { AuthProvider } from './utils/AuthContext.js';

const root = ReactDOM.createRoot(window.root);
root.render(
  <StrictMode>
    <AuthProvider>
      <App/>
    </AuthProvider>
  </StrictMode>
);