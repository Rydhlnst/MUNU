import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const CyclingWord = ({
  words,
  interval = 3000,
  className = "",
}: {
  words: string[];
  interval?: number;
  className?: string;
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span
      className={`inline-flex justify-center items-center relative w-[8ch] h-[1em] overflow-hidden ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.4 }}
          className="absolute"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
