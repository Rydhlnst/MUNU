"use client";

import { motion } from "framer-motion";
import { Skeleton } from "../ui/skeleton";

const bounceTransition = {
  y: {
    duration: 0.4,
    yoyo: Infinity,
    ease: "easeInOut",
  },
  scale: {
    duration: 0.4,
    yoyo: Infinity,
    ease: "easeInOut",
  },
};

export function TypingIndicator() {
  return (
    <Skeleton className="h-10 w-fit rounded-xl bg-muted flex items-center px-4">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-gray-500 rounded-full"
            animate={{
              y: [0, -4, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              ...bounceTransition,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </Skeleton>
  );
}
