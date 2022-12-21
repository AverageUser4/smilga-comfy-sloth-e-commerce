import React, { useState } from 'react';
import Notification from '../components/Notification/Notification.js';

function useNotification() {
  const [message, setMessage] = useState('');
  const [date, setDate] = useState(Date.now());

  const NotificationElement = 
    message ? 
      <Notification message={message} dateNow={date}/>
    :
      null;

  function notifyUser(message = '') {
    setMessage(message);
    setDate(Date.now());
  }

  return { notifyUser, NotificationElement };
}

export default useNotification;