import { useEffect, useState } from 'react';

/*
  - close: function to close modal
  - firstFocusable: first element inside modal that can receive focus
  - lastFocusable: last element inside modal that can receive focus
  - shouldTrap: should be equal to something like isModalVisible (bool)
  - defaultFocusable: DOM node that should be focused when element appears on screen
  - autoFocusDelay: add delay to autofocus if element is transitioned and eg. has display: none for some time
*/
export default function useFocusTrap(close, firstFocusable, lastFocusable, shouldTrap, defaultFocusable, autoFocusDelay = 0) {
  const [autoFocusHappened, setAutoFocusHappened] = useState(false);

  useEffect(() => {
    if(!shouldTrap && autoFocusHappened)
      setAutoFocusHappened(false);
  }, [shouldTrap, autoFocusHappened]);
  
  useEffect(() => {
    let timeoutID;

    if(defaultFocusable && shouldTrap && !autoFocusHappened) {
      setTimeout(() => {
        defaultFocusable.focus();
        setAutoFocusHappened(true);
      }, autoFocusDelay);
    }

    return () => clearTimeout(timeoutID);
  }, [defaultFocusable, shouldTrap, autoFocusHappened, autoFocusDelay]);
  
  useEffect(() => {
    function onKeyDown(event) {
      const { key, shiftKey } = event;

      if(key === 'Esc' || key === 'Escape')
        close();

      if(shouldTrap && key === 'Tab') {
        if(!shiftKey && document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable?.focus();
        } else if(shiftKey && document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable?.focus();
        }
      }
    }

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [shouldTrap, close, firstFocusable, lastFocusable]);
}