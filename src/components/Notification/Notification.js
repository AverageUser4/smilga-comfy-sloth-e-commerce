import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Notification.module.css';

function Notification({ content = '', dateNow = 0, style = "normal", timeout = 3000 }) {
  const lastDate = useRef(0);
  const [notifications, setNotifications] = useState([]);
  const areThereVisible = notifications.findIndex(not => not !== null) !== -1;
  
  useEffect(() => {
    if(dateNow === lastDate.current)
      return;

    setNotifications(prev => [...prev, content]);
    const lastIndex = notifications.length;
    lastDate.current = dateNow;

    setTimeout(() => hideNotification(lastIndex), timeout);
  });

  function hideAll() {
    setNotifications(notifications.map((x = null) => x));
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
        className={css['notification']}
        role="alert"
        onClick={() => hideNotification(i)}
      >
        {item}
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
  style: PropTypes.string,
  timeout: PropTypes.number
}

export default Notification;