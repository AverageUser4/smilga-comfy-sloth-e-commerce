import React, { useState } from 'react';
import Notification from '../components/Notification/Notification.js';

function useNotification() {
  const [content, setContent] = useState('');
  const [date, setDate] = useState(Date.now());

  const NotificationElement = 
    content ? 
      <Notification content={content} dateNow={date}/>
    :
      null;

  function notifyUser(cont = '') {
    setContent(cont);
    setDate(Date.now());
  }

  return { notifyUser, NotificationElement };
}

export default useNotification;