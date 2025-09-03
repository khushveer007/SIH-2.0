// Centralized Framer Motion animation variants for reuse across landing sections.
// Provide reduced-motion friendly fallbacks by exporting base style objects.
import type { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } }
};

export const staggerContainer = (stagger = 0.15, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren
    }
  }
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
};

export const marqueeContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } }
};
