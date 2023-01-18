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

function ProfileComponent(props, lastFocusableRef) {
  const [ID] = useState(Math.random());
  const [showProfile, setShowProfile] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { cartProductsData } = useCartContext();
  const { isLoggedIn, logout } = useAuthContext();

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
          aria-controls={ID}
          className={css['main-button']}
          onClick={() => setShowProfile(prev => !prev)}
        >
          Profile <ProfileIcon/>
        </button>

        {
          showProfile &&
            <div id={ID} className={css['profile']}>
              {
                isLoggedIn ?
                  <button 
                    className={css['main-button']}
                    ref={lastFocusableRef}
                    onClick={() => setShowLogoutDialog(prev => !prev)}
                  >
                    Logout <RemovePerson aria-hidden="true"/>
                  </button>
                :
                  <NavLink 
                    to="/login"
                    className={css["main-button"]} 
                    activeClassName={css["main-button--active"]} 
                    ref={lastFocusableRef}
                  >
                    Login <AddPerson aria-hidden="true"/>
                  </NavLink>
              }

              <NavLink 
                to="/cart"
                className={css["main-button"]}
                activeClassName={css["main-button--active"]}
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
            </div>
        }

      </div>

    </>
  );
}

const Profile = React.forwardRef(ProfileComponent);

export default Profile;