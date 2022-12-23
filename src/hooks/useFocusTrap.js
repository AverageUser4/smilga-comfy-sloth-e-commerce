import { useEffect } from 'react';

/*
  - close: function to close modal
  - firstFocusable: first element inside modal that can receive focus
  - lastFocusable: last element inside modal that can receive focus
  - shouldTrap: should be equal to something like isModalVisible (bool)
*/
export default function useFocusTrap(close, firstFocusable, lastFocusable, shouldTrap) {
  useEffect(() => {
    function onKeyDown(event) {
      const { key, shiftKey } = event;

      switch(key) {
        case 'Esc':
        case 'Escape':
          close();
          break;

        case 'Tab':
          if(!shiftKey && document.activeElement === lastFocusable) {
            event.preventDefault();
            firstFocusable?.focus();
          } else if(shiftKey && document.activeElement === firstFocusable) {
            event.preventDefault();
            lastFocusable?.focus();
          }
          break;
      }
    }

    if(shouldTrap)
      window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [shouldTrap]);
}