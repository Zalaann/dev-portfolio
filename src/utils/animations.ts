import anime from 'animejs/lib/anime.es.js';

// Hero section animations
export const heroAnimations = {
  title: (targets: string) => {
    return anime({
      targets,
      translateY: [-50, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutExpo',
      delay: 200
    });
  },
  subtitle: (targets: string) => {
    return anime({
      targets,
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutExpo',
      delay: 400
    });
  },
  profileImage: (targets: string) => {
    return anime({
      targets,
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutElastic(1, .8)',
      delay: 600
    });
  }
};

// Skills constellation animations
export const skillsAnimations = {
  constellation: (targets: string) => {
    return anime({
      targets,
      scale: [0, 1],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutElastic(1, .8)',
      delay: anime.stagger(100)
    });
  },
  connections: (targets: string) => {
    return anime({
      targets,
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 1500,
      easing: 'easeInOutSine',
      delay: anime.stagger(100)
    });
  }
};

// Project card animations
export const projectAnimations = {
  card: (targets: string) => {
    return anime({
      targets,
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo',
      delay: anime.stagger(100)
    });
  },
  techStack: (targets: string) => {
    return anime({
      targets,
      scale: [0, 1],
      opacity: [0, 1],
      duration: 500,
      easing: 'easeOutElastic(1, .8)',
      delay: anime.stagger(50)
    });
  }
};

// Scroll-triggered animations
export const scrollAnimations = {
  fadeIn: (targets: string) => {
    return anime({
      targets,
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutExpo',
      autoplay: false
    });
  },
  slideIn: (targets: string) => {
    return anime({
      targets,
      translateX: [-100, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutExpo',
      autoplay: false
    });
  }
};

// Contact form animations
export const contactAnimations = {
  form: (targets: string) => {
    return anime({
      targets,
      scale: [0.95, 1],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo'
    });
  },
  success: (targets: string) => {
    return anime({
      targets,
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutElastic(1, .8)'
    });
  }
}; 