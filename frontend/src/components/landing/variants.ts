// Centralized Framer Motion animation variants for reuse across landing sections.
// Provide reduced-motion friendly fallbacks by exporting base style objects.
import type { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
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
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } }
};

export const marqueeContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } }
};

// New blur + reveal effect (brief blur that resolves quickly)
export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: 'blur(8px)' },
  show: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: 'easeOut' } }
};

/*
Pulse animation is implemented via Tailwind arbitrary keyframes in component:
@keyframes cta-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
*/
