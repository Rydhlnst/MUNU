"use client";

import { motion } from "framer-motion";
import React from "react";

interface HeadingRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export const HeadingReveal: React.FC<HeadingRevealProps> = ({
  text,
  className = "",
  delay = 0,
}) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.h1
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{
          duration: 0.8,
          ease: [0.33, 1, 0.68, 1],
          delay,
        }}
        className="inline-block text-balance font-bold leading-tight"
      >
        {text}
      </motion.h1>
    </div>
  );
};
