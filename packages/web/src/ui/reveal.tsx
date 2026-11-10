"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "../beui/lib/hooks/use-reduced-motion.js";
import type { ReactNode } from "react";
import { EASE_OUT } from "../lib/ease.js";

export interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait after the element enters the viewport. */
  delay?: number;
}

/**
 * One-shot entrance for section content: a short rise and fade the first time
 * it scrolls into view. Reduced motion renders the content in place.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}
