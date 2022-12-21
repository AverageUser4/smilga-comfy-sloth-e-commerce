import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ReactComponent as ShoppingCart } from '../../assets/shopping-cart.svg';
import { ReactComponent as AddPerson } from '../../assets/add-person.svg';
import { ReactComponent as RemovePerson } from '../../assets/remove-person.svg';
import { ReactComponent as MenuClose } from '../../assets/menu-close.svg';
import Logo from '../Logo/Logo.js';
import css from './HeaderNav.module.css';
import useFocusTrap from '../../hooks/useFocusTrap';
import useAppearanceTransition from '../../hooks/useAppearanceTransition';
import { useAuthContext } from '../../utils/AuthContext';
import { useCartContext } from '../../utils/CartContext';

const phases = [
  css['nav'],
  css['nav--available'],
  css['nav--visible']
];

function HeaderNav({ shouldBeVisible, close }) {
  const { isLoggedIn, logout } = useAuthContext();
  const { cart } = useCartContext();
  const [navClasses, setNavClasses] = useState(phases[0]);

  const firstFocusableRef = useRef();
  const defaultFocusableRef = useRef();
  const lastFocusableRef = useRef();

  useFocusTrap(close, firstFocusableRef.current, lastFocusableRef.current);
  useAppearanceTransition(shouldBeVisible, setNavClasses, phases, 300, defaultFocusableRef.current);
  
  return (
    <nav className={navClasses}>

      <div className={css['nav-top']}>
        <Logo 
          width={175}
          ref={firstFocusableRef}
        />
        <button 
          className="icon-button icon-button--color-1"
          onClick={close}
          ref={defaultFocusableRef}
        >
          <MenuClose/>
        </button>
      </div>

      <ul className={css["pages-list"]}>
        <li><NavLink exact to="/" className={css["pages-link"]} activeClassName={css["pages-link--active"]}>Home</NavLink></li>
        <li><NavLink to="/about" className={css["pages-link"]} activeClassName={css["pages-link--active"]}>About</NavLink></li>
        <li><NavLink to="/products" className={css["pages-link"]} activeClassName={css["pages-link--active"]}>Products</NavLink></li>
      </ul>

      <ul className={css["profile-list"]}>
        <li>
          <NavLink 
            to="/cart"
            className={css["profile-link"]}
            activeClassName={css["profile-link--active"]}
          >
            Cart 
            <ShoppingCart/>
            {cart.length ? <span className={css['cart-count']}>{cart.length}</span> : null}
          </NavLink>
        </li>
        <li>
          {
            isLoggedIn ?
              <button 
                className={css["profile-link"]} ref={lastFocusableRef}
                onClick={logout}
              >
                Logout <RemovePerson/>
              </button>
            :
              <NavLink 
                to="/login"
                className={css["profile-link"]} 
                activeClassName={css["profile-link--active"]} 
                ref={lastFocusableRef}
              >
                Login <AddPerson/>
              </NavLink>
          }
        </li>
      </ul>
      
    </nav>
  );
}

HeaderNav.propTypes = {
  shouldBeVisible: PropTypes.bool,
  close: PropTypes.func
};

export default HeaderNav;