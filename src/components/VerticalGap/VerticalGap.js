import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

function VerticalGap({ data }) {
  const [height, setHeight] = useState(0);
  const checkTimeoutID = useRef();

  useEffect(() => {
    function checkMedia() {
      let h = 0;
  
      for(let val of data) {
        if(!val.mediaQuery || matchMedia(val.mediaQuery).matches) {
          h = val.height;
          break;
        }
      }
  
      if(h !== height)
        setHeight(h);
    }

    function onResize() {
      clearTimeout(checkTimeoutID.current);
      checkTimeoutID.current = setTimeout(checkMedia, 100);
    }

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [height]);
  
  if(!height)
    return null;

  return (
    <div style={{ width: '100%', height }}></div>
  );
}

VerticalGap.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    mediaQuery: PropTypes.string,
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  }))
};

export default VerticalGap;