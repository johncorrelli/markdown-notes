import {useEffect} from 'react';
import {KEY_LEFT, KEY_RIGHT} from 'keycode-js';

const scrollAmount = 40;

export const useWindowEvent = (event, callback) => {
  useEffect(() => {
    window.addEventListener(event, callback);
    return () => {
      window.removeEventListener(event, callback);
    };
  }, [event, callback]);
};

export const handlePresenterKeyPress = (keyboardEvent, leftRef, rightRef) => {
  const {keyCode} = keyboardEvent;

  if (keyCode === KEY_LEFT) {
    leftRef.current.scrollTop += scrollAmount;
  }
  if (keyCode === KEY_RIGHT) {
    rightRef.current.scrollTop += scrollAmount;
  }
};
