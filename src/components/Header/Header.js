import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import Logo from '../Logo/Logo.js';
import { ReactComponent as ShoppingCart } from '../../assets/shopping-cart.svg';
import { ReactComponent as AddPerson } from '../../assets/add-person.svg';
import { ReactComponent as MenuBars } from '../../assets/menu-bars.svg';
import { ReactComponent as MenuClose } from '../../assets/menu-close.svg';

import './header.css';

export default function Header() {
  const [isNavVisible, setIsNavVisible] = useState(false);

  return (
    <header className="header">

      <div className="header-content">

        <Logo width={175}/>

        <Nav
          shouldBeVisible={isNavVisible}
          close={setIsNavVisible.bind(null, false)}
        />

        <button 
          className="header__menu-button header__menu-button--open"
          onClick={() => setIsNavVisible(true)}
        >
          <MenuBars/>
        </button>

      </div>

    </header>
  );
}

const PHASE_ONE = 'header__nav';
const PHASE_TWO = 'header__nav header__nav--available';
const PHASE_THREE = 'header__nav header__nav--available header__nav--visible';

function Nav({ shouldBeVisible, close }) {
  const [navClasses, setNavClasses] = useState(PHASE_ONE);

  const firstFocusableRef = useRef();
  const defaultFocusableRef = useRef();
  const lastFocusableRef = useRef();

  useEffect(() => {
    if(shouldBeVisible) {
      setNavClasses(PHASE_TWO);
      var timeoutA = setTimeout(() => {
        setNavClasses(PHASE_THREE);
        defaultFocusableRef.current.focus();
      }, 50);
    }
    else {
      setNavClasses(PHASE_TWO);
      var timeoutB = setTimeout(() => setNavClasses(PHASE_ONE), 300);
    }

    return () => {
      clearTimeout(timeoutA);
      clearTimeout(timeoutB);
    };
  }, [shouldBeVisible]);

  useEffect(() => {
    function onKeyDown(event) {
      const { key, shiftKey } = event;

      switch(key) {
        case 'Esc':
        case 'Escape':
          close();
          break;

        case 'Tab':
          if(!shiftKey && document.activeElement === lastFocusableRef.current) {
            event.preventDefault();
            firstFocusableRef.current.focus();
          } else if(shiftKey && document.activeElement === firstFocusableRef.current) {
            event.preventDefault();
            lastFocusableRef.current.focus();
          }
          break;
      }
    }

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
  
  return (
    <nav className={navClasses}>

      <div className="header__nav-top">
        <Logo 
          width={175}
          ref={firstFocusableRef}
        />
        <button 
          className="header__menu-button header__menu-button--red"
          onClick={close}
          ref={defaultFocusableRef}
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
        <li>
          <a 
            className="header__profile-link" 
            href="#"
            ref={lastFocusableRef}
          >
            Login <AddPerson/>
          </a>
        </li>
      </ul>
      
    </nav>
  );
}

Nav.propTypes = {
  shouldBeVisible: PropTypes.bool,
  close: PropTypes.func
};