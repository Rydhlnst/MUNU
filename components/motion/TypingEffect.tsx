"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
  words: string[];
  speed?: number; // kecepatan ngetik per huruf (ms)
  pause?: number; // jeda sebelum hapus kata (ms)
  className?: string;
}

export const TypingText = ({
  words,
  speed = 300,
  pause = 3000,
  className = "",
}: TypingTextProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let typingInterval: NodeJS.Timeout;

    if (isDeleting) {
      typingInterval = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, speed / 2);
    } else {
      typingInterval = setTimeout(() => {
        setDisplayText((prev) => currentWord.slice(0, prev.length + 1));
      }, speed);
    }

    if (!isDeleting && displayText === currentWord) {
      setTimeout(() => setIsDeleting(true), pause);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(typingInterval);
  }, [displayText, isDeleting, currentWordIndex, words, speed, pause]);

  return (
    <span className={`inline-block ${className}`}>
      {displayText}
      <span className="blinking-cursor">|</span>
    </span>
  );
};
