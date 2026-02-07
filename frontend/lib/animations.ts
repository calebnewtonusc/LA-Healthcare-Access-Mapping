import { Variants } from 'framer-motion';

// Fade in animation
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

// Slide up fade in
export const slideUpFadeIn: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

// Stagger children animation
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Fast stagger for quicker reveals
export const fastStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

// Card hover animation with spring physics
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.03,
    y: -4,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 17
    }
  }
};

// Button hover with bounce
export const buttonHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring' as const,
      stiffness: 500,
      damping: 15
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      type: 'spring' as const,
      stiffness: 600,
      damping: 20
    }
  }
};

// Icon rotation on hover
export const iconRotate = {
  rest: { rotate: 0 },
  hover: {
    rotate: 360,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 15
    }
  }
};

// Icon pulse
export const iconPulse = {
  rest: { scale: 1 },
  hover: {
    scale: [1, 1.2, 1],
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 10
    }
  }
};

// Expand/collapse animation
export const expandCollapse: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' }
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeInOut' }
  }
};

// Scale in animation with spring
export const scaleIn: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  }
};

// Pop in with bounce
export const popIn: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 25
    }
  }
};

// Flip card animation
export const flipCard: Variants = {
  front: {
    rotateY: 0,
    transition: { duration: 0.6, ease: 'easeInOut' }
  },
  back: {
    rotateY: 180,
    transition: { duration: 0.6, ease: 'easeInOut' }
  }
};

// Glow pulse animation
export const glowPulse = {
  initial: { boxShadow: '0 0 10px rgba(0, 245, 255, 0.3)' },
  animate: {
    boxShadow: [
      '0 0 10px rgba(0, 245, 255, 0.3)',
      '0 0 20px rgba(0, 245, 255, 0.6)',
      '0 0 10px rgba(0, 245, 255, 0.3)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Page transition variants
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};

// Scroll-triggered reveal
export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

// Skeleton shimmer effect (for loading states)
export const shimmer = {
  initial: {
    backgroundPosition: '-1000px 0'
  },
  animate: {
    backgroundPosition: '1000px 0',
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear' as const
    }
  }
};
