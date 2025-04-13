import { useEffect, useRef } from 'react';
import anime from 'animejs';

export const useAnime = (animation, dependencies = []) => {
  const animationRef = useRef(null);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.pause();
    }

    animationRef.current = animation();

    return () => {
      if (animationRef.current) {
        animationRef.current.pause();
      }
    };
  }, dependencies);

  return animationRef;
}; 