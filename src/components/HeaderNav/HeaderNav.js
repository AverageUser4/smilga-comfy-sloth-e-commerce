import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ReactComponent as ShoppingCart } from '../../assets/shopping-cart.svg';
import { ReactComponent as AddPerson } from '../../assets/add-person.svg';
import { ReactComponent as MenuClose } from '../../assets/menu-close.svg';
import Logo from '../Logo/Logo.js';
import css from './HeaderNav.module.css';
import useFocusTrap from '../../hooks/useFocusTrap';
import useAppearanceTransition from '../../hooks/useAppearanceTransition';

const phases = [
  css['nav'],
  css['nav--available'],
  css['nav--visible']
];

function HeaderNav({ shouldBeVisible, close }) {
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
        <li><Link to="/" className={css["pages-link"]}>Home</Link></li>
        <li><Link to="/about" className={css["pages-link"]}>About</Link></li>
        <li><Link to="/products" className={css["pages-link"]}>Products</Link></li>
      </ul>

      <ul className={css["profile-list"]}>
        <li><Link to="/cart" className={css["profile-link"]}>Cart <ShoppingCart/></Link></li>
        <li>
          <Link 
            to="/login"
            className={css["profile-link"]} 
            ref={lastFocusableRef}
          >
            Login <AddPerson/>
          </Link>
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