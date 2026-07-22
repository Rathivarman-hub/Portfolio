import { motion, useReducedMotion } from 'framer-motion';

/** Stagger delay for list items — capped at 0.4s total */
export function staggerDelay(index) {
  return Math.min(index * 0.06, 0.4);
}

export default function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
}) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      initial={{
        opacity: 0,
        y: prefersReducedMotion ? 0 : 10,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.45,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Component>
  );
}
