import React from 'react';

import Logo from '../Logo/Logo.js';
import shoppingCart from '../../assets/shopping-cart.svg';
import addPerson from '../../assets/add-person.svg';
import menuBars from '../../assets/menu-bars.svg';
import menuClose from '../../assets/menu-close.svg';

import './header.css';

export default function Header() {
  return (
    <header className="header">

      <div className="header-content">

        <Logo width={175}/>

        <nav className="header__nav">

          <div>
            <Logo width={175}/>
            <button className="text-button">
              <img 
                src={menuClose} 
                alt="Icon representing cross sign."
              />
            </button>
          </div>

          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Products</a></li>
          </ul>

          <ul>
            <li><a href="#">Cart <img src={shoppingCart} alt="Icon representing shopping cart."/></a></li>
            <li><a href="#">Login <img src={addPerson} alt="Icon representing person with plus sign next to their head."/></a></li>
          </ul>
          
        </nav>

        <button className="menu-button header__menu-button">
          <img
            src={menuBars} 
            alt="Icon representing three horizontal bars."
          />
        </button>

      </div>

    </header>
  );
}