import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Notification.module.css';
import { ReactComponent as Close } from '../../assets/menu-close.svg';

function Notification({ content = '', type = '', timeout = 3000, dateNow = 0 }) {
  const lastDate = useRef(0);
  const [notifications, setNotifications] = useState([]);
  const areThereVisible = notifications.findIndex(not => not !== null) !== -1;
  
  useEffect(() => {
    if(dateNow === lastDate.current)
      return;

    const lastIndex = notifications.length;
    lastDate.current = dateNow;
    setNotifications(prev => [...prev, { content, type }]);

    // setTimeout(() => hideNotification(lastIndex), timeout);
  });

  function hideAll() {
    setNotifications(notifications.map(x => null && x));
  }
  
  function hideNotification(index) {
    setNotifications(prev => {
      const copy = [...prev];
      copy[index] = null;
      return copy;
    });
  }

  const elements = notifications.map((item, i) =>
    item &&
      <div 
        key={i}
        className={`${css['notification']} ${item.type ? css[`notification--${type}`] : ''}`}
        role="alert"
      >
        <button 
          onClick={() => hideNotification(i)}
          className={`icon-button icon-button--small icon-button--danger ${css['close-button']}`}
        >
          <Close/>
        </button>
        {item.content}
      </div>
  );

  return (
    <div className={css['container']}>
      {
        areThereVisible &&
          <>
            <button  
              className={`button button--uppercase ${css['button']}`}
              onClick={hideAll}
            >
              Hide all
            </button>
            {elements}
          </>
      }
    </div>
  );
}

Notification.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  dateNow: PropTypes.number.isRequired,
  type: PropTypes.string,
  timeout: PropTypes.number
}

export default Notification;