import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Notification.module.css';
import { ReactComponent as Close } from '../../assets/menu-close.svg';

const TRANSITION_DURATION = 300;

function Notification({ content = '', type = '', timeout = 3000, dateNow = 0 }) {
  const lastDateRef = useRef(0);
  const pointerDataRef = useRef({});
  const [notifications, setNotifications] = useState([]);
  const areThereVisible = notifications.findIndex(not => not !== null) !== -1;
  
  useEffect(() => {
    if(dateNow === lastDateRef.current)
      return;

    const lastIndex = notifications.length;
    lastDateRef.current = dateNow;
    setNotifications(prev => [...prev, { content, type, isVisible: false }]);

    setTimeout(() => changeVisibility(lastIndex, true), 50);
    setTimeout(() => changeVisibility(lastIndex, false, true), timeout);
  });

  useEffect(() => {
    function onPointerMove(event) {
      if(!pointerDataRef.current.index)
        return;

      if(event.clientX - pointerDataRef.current.initialX > 50)
        changeVisibility(pointerDataRef.current.index, false, true);
    }
    function onPointerUp() {
      pointerDataRef.current = {};
    }

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    }
  }, []);
  
  function removeAll() {
    setNotifications(notifications.map(() => null));
  }
  
  function changeVisibility(index, isVisible = true, remove = false) {
    if(!Number.isInteger(Number(index)))
      throw new Error('Provided index is not an integer.');

    setNotifications(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], isVisible }
      return copy;      
    });

    if(remove)
      setTimeout(() => {
        setNotifications(prev => {
          const copy = [...prev];
          copy[index] = null;
          return copy;
        });
      }, TRANSITION_DURATION * 2);
  }

  function onPointerDown(event) {
    const { dataset } = event.target;

    if(typeof dataset.index === 'undefined')
      return;

    pointerDataRef.current = { initialX: event.clientX, index: dataset.index };
  }

  const elements = notifications.map((item, i) => {
    if(!item)
      return null;

    let classes = `${css['notification']} ${css[`notification--type`]}`;
    classes += item.isVisible ? ` ${css['notification--visible']}` : '';

    return (
      <div 
        key={i}
        className={classes}
        role="alert"
        data-index={i}
      >
        <button 
          onClick={() => changeVisibility(i, false, true)}
          className={`icon-button icon-button--small icon-button--danger ${css['close-button']}`}
        >
          <Close/>
        </button>
        {item.content}
      </div>
    );
  });

  return (
    <div tabIndex="-1" className={css['container']} onPointerDown={onPointerDown}>
      {
        <>
          <button  
            className={`button button--uppercase ${css['hide-button']} ${areThereVisible ? css['hide-button--visible'] : ''}`}
            tabIndex={areThereVisible ? 0 : -1}
            onClick={removeAll}
            aria-label="Hide all notifications."
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
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  dateNow: PropTypes.number.isRequired,
  type: PropTypes.string,
  timeout: PropTypes.number
}

export default Notification;