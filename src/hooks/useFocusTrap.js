import { useEffect } from 'react';

export default function useFocusTrap(close, firstFocusable, lastFocusable) {
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

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
}