import { motion, type HTMLMotionProps } from "framer-motion";
import type { RefObject } from "react";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  y?: number;
  viewportRoot?: RefObject<Element | null>;
  amount?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 36,
  viewportRoot,
  amount = 0.2,
  ...props
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount,
        margin: "0px 0px -12% 0px",
        root: viewportRoot,
      }}
      transition={{
        duration: 1.15,
        delay,
        ease: PREMIUM_EASE,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export const scrollRevealMotion = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: PREMIUM_EASE },
} as const;

export function getScrollRevealViewport(
  root?: RefObject<Element | null>
) {
  return {
    once: true,
    amount: 0.15 as const,
    margin: "0px 0px -10% 0px",
    root,
  };
}
