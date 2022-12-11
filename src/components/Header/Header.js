import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Logo from '../Logo/Logo.js';
import { ReactComponent as ShoppingCart } from '../../assets/shopping-cart.svg';
import { ReactComponent as AddPerson } from '../../assets/add-person.svg';
import { ReactComponent as MenuBars } from '../../assets/menu-bars.svg';
import { ReactComponent as MenuClose } from '../../assets/menu-close.svg';

import './header.css';

export default function Header() {
  const [navVisible, setNavVisible] = useState(true);

  return (
    <header className="header">

      <div className="header-content">

        <Logo width={175}/>

        {navVisible && <Nav setNavVisible={setNavVisible}/>}

        <button 
          className="header__menu-button"
          onClick={() => setNavVisible(true)}
        >
          <MenuBars/>
        </button>

      </div>

    </header>
  );
}

function Nav({ setNavVisible }) {
  return (
    <nav className="header__nav">

      <div className="header__nav-top">
        <Logo width={175}/>
        <button 
          className="header__menu-button header__menu-button--red"
          onClick={() => setNavVisible(false)}
        >
          <MenuClose/>
        </button>
      </div>

      <ul className="header__pages-list">
        <li><a className="header__pages-link" href="#">Home</a></li>
        <li><a className="header__pages-link" href="#">About</a></li>
        <li><a className="header__pages-link" href="#">Products</a></li>
      </ul>

      <ul className="header__profile-list">
        <li><a className="header__profile-link" href="#">Cart <ShoppingCart/></a></li>
        <li><a className="header__profile-link" href="#">Login <AddPerson/></a></li>
      </ul>
      
    </nav>
  );
}

Nav.propTypes = {
  setNavVisible: PropTypes.func
};