import { useEffect, useRef } from 'react';
// @ts-ignore - Ignoring the type checking for anime import
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

// Export the anime instance directly
export const animeInstance = anime; 