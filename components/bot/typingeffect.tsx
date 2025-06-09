"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Skeleton } from "../ui/skeleton";

export function TypingIndicator() {
  const dotsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    dotsRef.current.forEach((el, i) => {
      gsap.to(el, {
        y: -4,
        scale: 1.2,
        repeat: -1,
        yoyo: true,
        duration: 0.4,
        ease: "power1.inOut",
        delay: i * 0.15,
      });
    });
  }, []);

  return (
    <Skeleton className="h-10 w-fit rounded-xl bg-muted flex items-center px-4">
      <div className="flex gap-1">
        {[0, 1, 2].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) dotsRef.current[i] = el;
            }}
            className="w-2 h-2 bg-gray-500 rounded-full"
          />
        ))}
      </div>
    </Skeleton>
  );
}
