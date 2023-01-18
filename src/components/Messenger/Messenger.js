import React, { useCallback, useEffect } from 'react';
import { useCartContext } from '../../utils/CartContext';
import useNotification from '../../hooks/useNotification';

function Messenger() {
  const { mergeNotificationData: data } = useCartContext();
  const { NotificationElement, notifyUser } = useNotification();

  // eslint-disable-next-line
  const notify = useCallback(notifyUser, []);
  
  useEffect(() => {
    if(data.content)
      notify(data.content, data.type, data.timeout);
  }, [data, notify]);
  
  return (
    <>
      {NotificationElement}
    </>
  );
}

export default Messenger;
