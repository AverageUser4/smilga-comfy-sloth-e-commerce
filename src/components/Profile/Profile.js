import React, { useState } from 'react';
import css from './Profile.module.css';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../utils/AuthContext';
import { useCartContext } from '../../utils/CartContext';
import Dialog from '../Dialog/Dialog';
import { ReactComponent as ProfileIcon } from '../../assets/profile.svg';
import { ReactComponent as RemovePerson } from '../../assets/remove-person.svg';
import { ReactComponent as ShoppingCart } from '../../assets/shopping-cart.svg';
import { ReactComponent as AddPerson } from '../../assets/add-person.svg';
import { ReactComponent as ChangeLog } from '../../assets/changelog.svg';
import usePopUp from '../../hooks/usePopUp';

function ProfileComponent(props, ref) {
  const [ID] = useState(Math.random().toString());
  const [showProfile, setShowProfile] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { cartProductsData, mergeNotificationData } = useCartContext();
  const { isLoggedIn, logout, username } = useAuthContext();
  const popUpID = `popup-${ID}`;
  const openButtonID = `open-${ID}`;
  usePopUp({ 
    isOpen: showProfile, close: () => setShowProfile(false),
    popUpID, openButtonID, closeOnClickOutside: true
  });

  return (
    <>
    
      <Dialog
        isShown={showLogoutDialog}
        heading="Are you sure?"
        message="Do you really want to log out?"
        onConfirm={() => { setShowLogoutDialog(false); logout(); }}
        onReject={() => setShowLogoutDialog(false)}
      />

      <div className={css['container']}>

        <button
          id={openButtonID}
          aria-controls={ID}
          className={`${css['button']} ${css['button--main']}`}
          onClick={() => setShowProfile(prev => !prev)}
        >
          {username ? username : 'Guest'} <ProfileIcon/>
        </button>

          <div 
            id={popUpID}
            className={`${css['profile']} ${showProfile ? css['profile--visible'] : ''}`}
          >
            <NavLink 
              to="/cart"
              className={`${css['button']} ${css['button--profile']}`}
              activeClassName={css["button--profile--active"]}
            >
              Cart 
              <ShoppingCart aria-hidden="true"/>
              {
                cartProductsData.length ? 
                  <span aria-description="Products in cart." className={css['cart-count']}>{cartProductsData.length}</span> 
                : 
                  null
              }
            </NavLink>

            {
              isLoggedIn && mergeNotificationData.data &&
                <NavLink 
                  to="/cart-changelog"
                  className={`${css['button']} ${css['button--profile']}`}
                  activeClassName={css["button--profile--active"]}
                >
                  Cart Changelog <ChangeLog aria-hidden="true"/>
                </NavLink>
            }
            
            {
              isLoggedIn ?
                <button 
                  className={`${css['button']} ${css['button--profile']}`}
                  ref={ref}
                  onClick={() => { setShowLogoutDialog(prev => !prev); setShowProfile(false); }}
                >
                  Logout <RemovePerson aria-hidden="true"/>
                </button>
              :
                <NavLink
                  to="/login"
                  className={`${css['button']} ${css['button--profile']}`} 
                  activeClassName={css["button--profile--active"]} 
                  ref={ref}
                >
                  Login <AddPerson aria-hidden="true"/>
                </NavLink>
            }
          </div>

      </div>

    </>
  );
}

const Profile = React.forwardRef(ProfileComponent);

export default Profile;