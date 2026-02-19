import { ReactNode } from "react";
import * as motion from "motion/react-client";

interface SlideFadeProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
}

export default function SlideFade({
  children,
  delay = 0,
  duration = 1,
  x = 0,
  y = 0,
}: SlideFadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: y, x: x }}
      //   animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: duration, delay: delay }}
      whileInView={{ opacity: 1, y: 0, x: 0 }} // Animate to visible when in view
      viewport={{ once: true, amount: 1 }} // Play once, trigger when 50% visible
    >
      {children}
    </motion.div>
  );
}
