import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo.js';
import { ReactComponent as MenuBars } from '../../assets/menu-bars.svg';
import HeaderNav from '../HeaderNav/HeaderNav.js';
import css from './Header.module.css';
import SkipToContent from '../SkipToContent/SkipToContent.js';

export default function Header() {
  const { pathname } = useLocation();
  const [path, setPath] = useState(pathname);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const lastFocusableRef = useRef();
  
  // close nav when user navigates to different page
  if(pathname !== path) {
    setPath(pathname);

    if(isNavVisible) {
      setIsNavVisible(false);
    }
  }

  useEffect(() => {
    function hide() {
      if(isNavVisible)
        setIsNavVisible(false);
    }

    window.addEventListener('resize', hide);

    return () => window.removeEventListener('resize', hide);
  }, [isNavVisible]);
  
  return (
    <header className={css['header']}>

      <SkipToContent/>
      
      <div className={css['header-content']}>

        <Logo width={175}/>

        <HeaderNav
          shouldBeVisible={isNavVisible}
          close={setIsNavVisible.bind(null, false)}
          shouldTrap={isNavVisible}
        />

        <button 
          className={'icon-button' + ` ${css['open-button']}`}
          onClick={() => setIsNavVisible(true)}
          ref={lastFocusableRef}
          aria-label="Open nav."
          aria-controls="header-nav"
        >
          <MenuBars aria-hidden="true"/>
        </button>

      </div>

    </header>
  );
}