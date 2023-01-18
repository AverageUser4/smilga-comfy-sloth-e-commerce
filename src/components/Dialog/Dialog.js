import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Dialog.module.css';
import useFocusTrap from '../../hooks/useFocusTrap';

function Dialog({ heading, message, onConfirm, onReject, type = '', confirmText = 'Yes', rejectText = 'No', isShown }) {
  const [ID] = useState(Math.random());
  const setForceRerender = useState(false)[1];
  const firstFocusableRef = useRef();
  const lastFocusableRef = useRef();
  useFocusTrap(onReject || (()=>0), firstFocusableRef.current, lastFocusableRef.current, isShown, firstFocusableRef.current);

  useEffect(() => {
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
      className={`${css['container']} ${css[`container--${type}`]}`}
    >
      {heading && <h3 className="heading heading--small heading--no-margin" id={`heading-${ID}`}>{heading}</h3>}
      {message && <p className="paragraph" id={`message-${ID}`}>{message}</p>}
      <div className={css['buttons']}>
        {onConfirm && <button ref={firstFocusableRef} className="button" onClick={onConfirm}>{confirmText}</button>}
        {onReject && <button ref={lastFocusableRef} className="button" onClick={onReject}>{rejectText}</button>}
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