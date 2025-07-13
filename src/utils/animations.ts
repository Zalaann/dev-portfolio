// Hero section animations
export const heroAnimations = {
  title: {
    initial: { y: -50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 1, ease: 'easeOut', delay: 0.2 } }
  },
  subtitle: {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 1, ease: 'easeOut', delay: 0.4 } }
  },
  profileImage: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 1, ease: 'easeOut', delay: 0.6 } }
  }
};

// Skills constellation animations
export const skillsAnimations = {
  constellation: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: 'easeOut', delay: 0 } }
  },
  connections: {
    initial: { strokeDashoffset: 100 },
    animate: { strokeDashoffset: 0, transition: { duration: 1.5, ease: 'easeInOut' } }
  }
};

// Project card animations
export const projectAnimations = {
  card: {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } }
  },
  techStack: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  }
};

// Scroll-triggered animations
export const scrollAnimations = {
  fadeIn: {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 1, ease: 'easeOut' } }
  },
  slideIn: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 1, ease: 'easeOut' } }
  }
};

// Contact form animations
export const contactAnimations = {
  form: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } }
  },
  success: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  }
};

// Utility fadeIn/fadeOut for framer-motion
export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

export const fadeOut = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 0, y: -20, transition: { duration: 0.8, ease: 'easeOut' } }
}; 