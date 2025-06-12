"use client";

import { motion } from "framer-motion";
import Image, { ImageProps } from "next/image";

interface TiltIconProps extends ImageProps {
  className?: string;
}

export function TiltIcon({ className = "", ...props }: TiltIconProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.05,
        transition: { duration: 0.12, ease: "easeOut" },
      }}
      className={`inline-block ${className}`}
    >
      <Image {...props} alt="Icon"/>
    </motion.div>
  );
}
