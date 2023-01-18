import { useEffect, useState } from 'react';

/*
  - close: function to close modal
  - isActive: should be equal to something like isModalVisible (bool)
  - firstFocusable: first element inside modal that can receive focus
  - lastFocusable: last element inside modal that can receive focus
  - defaultFocusable: DOM node that should be focused when element appears on screen
  - autoFocusDelay: add delay to autofocus if element is transitioned and eg. has display: none for some time
*/
export default function useFocusTrap(close, isActive, firstFocusable, lastFocusable, defaultFocusable, autoFocusDelay = 0) {
  const [autoFocusHappened, setAutoFocusHappened] = useState(false);

  useEffect(() => {
    if(!isActive && autoFocusHappened)
      setAutoFocusHappened(false);
  }, [isActive, autoFocusHappened]);
  
  useEffect(() => {
    let timeoutID;

    function autoFocus() {
      defaultFocusable.focus();
      setAutoFocusHappened(true);
    }

    if(defaultFocusable && isActive && !autoFocusHappened)
      autoFocusDelay ? setTimeout(autoFocus, autoFocusDelay) : autoFocus();

    return () => clearTimeout(timeoutID);
  }, [defaultFocusable, isActive, autoFocusHappened, autoFocusDelay]);
  
  useEffect(() => {
    function onKeyDown(event) {
      const { key, shiftKey } = event;

      if(key === 'Esc' || key === 'Escape')
        close();

      if(isActive && key === 'Tab') {
        if(!shiftKey && document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable?.focus();
        } else if(shiftKey && document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable?.focus();
        }
      }
    }

    if(isActive)
      window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isActive, close, firstFocusable, lastFocusable]);
}