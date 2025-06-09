// components/TiltCard.tsx
"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function TiltCard({ children, className = "", ...props }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleHover = (hovered: boolean) => {
      gsap.to(card, {
        y: hovered ? -6 : 0,
        scale: hovered ? 1.05 : 1,
        duration: 0.12,
        ease: hovered ? "expo.out" : "expo.inOut",
      });
    };

    const onEnter = () => handleHover(true);
    const onLeave = () => handleHover(false);

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
