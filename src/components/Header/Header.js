import React, { useState } from 'react';
import Logo from '../Logo/Logo.js';
import { ReactComponent as MenuBars } from '../../assets/menu-bars.svg';
import HeaderNav from '../HeaderNav/HeaderNav.js';
import css from './Header.module.css';

export default function Header() {
  const [isNavVisible, setIsNavVisible] = useState(false);

  return (
    <header className={css['header']}>

      <div className={css['header-content']}>

        <Logo width={175}/>

        <HeaderNav
          shouldBeVisible={isNavVisible}
          close={setIsNavVisible.bind(null, false)}
        />

        <button 
          className={'icon-button' + ` ${css['open-button']}`}
          onClick={() => setIsNavVisible(true)}
        >
          <MenuBars/>
        </button>

      </div>

    </header>
  );
}