import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function usePopUp({ isOpen, close, closeOnPathChange = true, closeOnClickOutside = false, popUpID }) {
  if(typeof isOpen === 'undefined')
    throw new Error('isOpen has to be set');
  if(typeof close !== 'function')
    throw new Error('close has to be a function');
  if(closeOnClickOutside && typeof popUpID === 'undefined')
    throw new Error('popUpID has to be provided when closeOnClickOutside = true');

  const { pathname } = useLocation();
  const [path, setPath] = useState(pathname);

  if(closeOnPathChange && pathname !== path) {
    setPath(pathname);

    if(isOpen)
      close();
  }

  useEffect(() => {
    function tryToClose(event) {
      console.log(event.target);

      // if its descendant of element with popUpID dont call close, else call close
      if(event.target.id === popUpID) {
        console.log('hi');
        return;
      }
    }
    
    if(closeOnClickOutside)
      window.addEventListener('click', tryToClose);
      
    return () => window.removeEventListener('click', tryToClose);
  }, [closeOnClickOutside, popUpID]);
}

export default usePopUp;