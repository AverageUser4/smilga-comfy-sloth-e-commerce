import React from 'react';
import { Link } from 'react-router-dom';
import CurrentPath from '../../components/CurrentPath/CurrentPath.js';

function Cart() {
  return (
    <div>

      <CurrentPath/>

      <h1 className="heading">Your cart is empty</h1>
      <Link className="button button-uppercase" to="/products">Fill it</Link>

      
    </div>
  );
}

export default Cart;