import React, { ReactNode } from "react";
import * as motion from "motion/react-client";

interface SlideFadeProps {
  children: ReactNode;
  delay?: number;
}

export default function SlideFade({ children, delay = 0 }: SlideFadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      //   animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: delay }}
      whileInView={{ opacity: 1, y: 0 }} // Animate to visible when in view
      viewport={{ once: true, amount: 0.2 }} // Play once, trigger when 50% visible
    >
      {children}
    </motion.div>
  );
}
