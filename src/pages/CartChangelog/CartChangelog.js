import React from 'react';
import CurrentPath from '../../components/CurrentPath/CurrentPath';
import { useCartContext } from '../../utils/CartContext';

function CartChangelog() {
  const { mergeNotificationData } = useCartContext();

  if(!mergeNotificationData.data?.length)
    return (
      <div>Nothing to see here...</div>
    );
  
  return (
    <div>

      <CurrentPath lastPathName="Cart Changelog"/>

      <ul>
        {mergeNotificationData.data}
      </ul>

    </div>
  );
}

export default CartChangelog;