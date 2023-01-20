import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Dialog.module.css';
import useFocusTrap from '../../hooks/useFocusTrap';

function Dialog({ heading, message, onConfirm, onReject, type = '', confirmText = 'Yes', rejectText = 'No', isShown }) {
  useEffect(() => {
    if(typeof onConfirm !== 'function' && typeof onReject !== 'function')
      console.error('You have to provide at least one callback (onConfirm or onReject)');
  }, [onConfirm, onReject])

  const [ID] = useState(Math.random());
  const setForceRerender = useState(false)[1];
  const firstFocusableRef = useRef();
  const lastFocusableRef = useRef();
  useFocusTrap(onReject || (()=>0), isShown, firstFocusableRef.current, lastFocusableRef.current, firstFocusableRef.current);

  useEffect(() => {
    // so refs are set to elements and useFocusTrap works
    if(isShown)
      setForceRerender(prev => !prev);
  }, [isShown, setForceRerender]);
  
  if(!isShown)
    return null;
  
  return (
    <div 
      role="dialog"
      aria-labelledby={`heading-${ID}`}
      aria-describedby={`message-${ID}`}
      aria-modal="true"
      className={`${css['container']} ${css[`container--${type}`]}`}
    >
      {heading && <h3 className="heading heading--small heading--no-margin" id={`heading-${ID}`}>{heading}</h3>}
      {message && <p className="paragraph" id={`message-${ID}`}>{message}</p>}
      <div className={css['buttons']}>
        {
          onConfirm && 
            <button 
              ref={(el) => { firstFocusableRef.current = el; if(!onReject) lastFocusableRef.current = el }}
              className="button"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
        }
        {
          onReject &&
            <button 
              ref={(el) => { lastFocusableRef.current = el; if(!onConfirm) firstFocusableRef.current = el }}
              className="button"
              onClick={onReject}
            >
              {rejectText}
            </button>
        }
      </div>
    </div>
  );  
}

Dialog.propTypes = {
  heading: PropTypes.string,
  message: PropTypes.string,
  onConfirm: PropTypes.func,
  onReject: PropTypes.func,
  type: PropTypes.string,
  confirmText: PropTypes.string,
  rejectText: PropTypes.string,
  isShown: PropTypes.bool.isRequired,
};

export default Dialog;