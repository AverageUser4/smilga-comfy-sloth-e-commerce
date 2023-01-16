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
) {
  useEffect(() => {
    let timeoutA, timeoutB;

    function makeVisible() {
      setClasses(phases[1]);
      
      timeoutA = setTimeout(() => {
        setClasses(phases[2]);
        defaultFocusable?.focus();
      }, 50);
    }

    function makeHidden() {
      setClasses(phases[1]);

      timeoutB = setTimeout(() => setClasses(phases[0]), transitionDuration);
    }

    if(shouldBeVisible)
      makeVisible();
    else
      makeHidden();

    return () => {
      clearTimeout(timeoutA);
      clearTimeout(timeoutB);
    };
  }, [shouldBeVisible, defaultFocusable, phases, setClasses, transitionDuration]);
}