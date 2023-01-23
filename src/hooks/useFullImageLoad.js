import { useState, useEffect } from 'react';

function useFullImageLoad(src) {
  const [imageElement] = useState(new Image());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    let ignore = false;
    const setToTrue = () => ignore || setReady(true);

    imageElement.src = src;
    imageElement.decode().then(setToTrue).catch(setToTrue);

    return () => ignore = true;
  }, [imageElement, src]);

  return ready;
}

export default useFullImageLoad;