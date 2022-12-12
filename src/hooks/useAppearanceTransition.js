import { useEffect } from 'react';

export default function useAppearanceTransition(
  // boolean indicating wheter it should start transition
  shouldBeVisible,
  // state setter function, the outermost element of transitioned element
  // should use given state as it's class 
  setClasses,
  // array of 3 class names used for different display phases
  // first phase should have display: none along some other styles
  // second phase should set display: block/flex, etc.
  // third phase should set property that is transitioned, eg. opacity: 1
  phases,
  // duration of transition in milliseconds
  transitionDuration,
  // DOM node that should be focused when element appears on screen
  defaultFocusable = null,
  // indicates whether html element's overflow property should be set to hidden
  // when the modal is visible
  lockScroll = true
) {
  useEffect(() => {
    if(shouldBeVisible) {
      setClasses(phases[1]);
      var timeoutA = setTimeout(() => {
        setClasses(phases[2]);
        defaultFocusable?.focus();
        if(lockScroll)
          document.documentElement.style.overflow = 'hidden';
      }, 50);
    }
    else {
      setClasses(phases[1]);
      var timeoutB = setTimeout(() => setClasses(phases[0]), transitionDuration);
      if(lockScroll)
        document.documentElement.style.overflow = 'visible';
    }

    return () => {
      clearTimeout(timeoutA);
      clearTimeout(timeoutB);
      if(lockScroll)
        document.documentElement.style.overflow = 'visible';
    };
  }, [shouldBeVisible]);
}