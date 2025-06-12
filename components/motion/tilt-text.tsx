"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface TiltTextProps {
  children: ReactNode;
  className?: string;
}

export function TiltText({ children, className }: TiltTextProps) {
  return (
    <motion.span
      className={className}
      whileHover={{
        y: -6,
        scale: 1.05,
        transition: {
          duration: 0.12,
          ease: [0.19, 1, 0.22, 1], // mirip expo.out
        },
      }}
      whileTap={{
        scale: 0.98,
      }}
    >
      {children}
    </motion.span>
  );
}
