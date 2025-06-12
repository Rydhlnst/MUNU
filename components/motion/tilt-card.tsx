"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

type TiltCardProps = HTMLMotionProps<"div">;

export const TiltCard = ({ children, className = "", ...props }: TiltCardProps) => {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.05,
        transition: { duration: 0.12, ease: "easeOut" },
      }}
      className={`transition-transform duration-200 ${className}`}
      {...props} // now type-safe for motion.div
    >
      {children}
    </motion.div>
  );
};
