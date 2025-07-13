// DEPRECATED: Use framer-motion based animation objects/utilities instead.

// @ts-ignore - Ignoring the type checking for anime import
import anime from 'animejs';

export const animateTitle = (element) => {
  if (element) {
    anime({
      targets: element,
      translateY: [-50, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutExpo',
    });
  }
};

export const animateSubtitle = (element) => {
  if (element) {
    anime({
      targets: element,
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: 500,
      easing: 'easeOutExpo',
    });
  }
};

export const animateProfileImage = (element) => {
  if (element) {
    anime({
      targets: element,
      scale: [0, 1],
      opacity: [0, 1],
      duration: 1000,
      delay: 1000,
      easing: 'easeOutExpo',
    });
  }
};

export const animateButtons = (elements) => {
  if (elements) {
    anime({
      targets: elements,
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 800,
      delay: anime.stagger(200),
      easing: 'easeOutExpo',
    });
  }
}; 