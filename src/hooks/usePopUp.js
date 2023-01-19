import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function usePopUp({ isOpen, close, closeOnPathChange = true, closeOnClickOutside = false, popUpID, openButtonID }) {
  if(typeof isOpen === 'undefined')
    throw new Error('isOpen has to be set');
  if(typeof close !== 'function')
    throw new Error('close has to be a function');
  if(closeOnClickOutside && (typeof popUpID === 'undefined' || typeof openButtonID === 'undefined'))
    throw new Error('popUpID and openButtonID have to be provided when closeOnClickOutside = true');

  const { pathname } = useLocation();
  const [path, setPath] = useState(pathname);
  const closePopUp = useCallback(close, []);

  if(closeOnPathChange && pathname !== path) {
    setPath(pathname);

    if(isOpen)
      close();
  }

  useEffect(() => {
    function tryToClose(event) {
      const { id } = event.target;
      const checkedIDs = [popUpID, openButtonID];

      for(let checkedID of checkedIDs)
        if(checkedID && (id === checkedID || [...document.querySelectorAll(`[id="${checkedID}"] *`)].includes(event.target)))
          return;

      closePopUp();
    }
    
    if(closeOnClickOutside)
      window.addEventListener('click', tryToClose);
      
    return () => window.removeEventListener('click', tryToClose);
  }, [closeOnClickOutside, popUpID, openButtonID, closePopUp]);
}

export default usePopUp;