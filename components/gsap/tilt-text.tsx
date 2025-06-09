"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";

interface TiltTextProps {
  children: ReactNode;
  className?: string;
}

export function TiltText({ children, className }: TiltTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const handleHover = (hovered: boolean) => {
      gsap.to(el, {
        y: hovered ? -6 : 0,
        scale: hovered ? 1.05 : 1,
        duration: 0.12,
        ease: hovered ? "expo.out" : "expo.inOut",
      });
    };

    const onEnter = () => handleHover(true);
    const onLeave = () => handleHover(false);

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <span ref={textRef} className={className}>
      {children}
    </span>
  );
}
