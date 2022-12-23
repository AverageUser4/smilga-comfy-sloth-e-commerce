import React, { useState } from 'react';
import Notification from '../components/Notification/Notification.js';

function useNotification() {
  const [data, setData] = useState({
    content: '',
    type: '',
    timeout: 3000,
    date: 0
  });

  const NotificationElement = 
    data.content ? 
      <Notification 
        content={data.content} 
        type={data.type}
        timeout={data.timeout}
        dateNow={data.date}
      />
    :
      null;

  function notifyUser(content, type = '', timeout = 3000) {
    if(!content)
      throw new Error(`You have to provide a message or JSX to notifyUser function, provided: '${content}'.`);

    setData({ content, type, timeout, date: Date.now() });
  }

  return { notifyUser, NotificationElement };
}

export default useNotification;