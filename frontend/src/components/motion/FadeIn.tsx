import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

export const FadeIn: React.FC<PropsWithChildren<{ delay?: number; y?: number; className?: string }>> = ({
  children,
  delay = 0,
  y = 8,
  className,
}) => (
  <motion.div
    initial={{ opacity: 0, y }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);
