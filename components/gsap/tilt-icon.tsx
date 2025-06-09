/* eslint-disable jsx-a11y/alt-text */
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image, { ImageProps } from "next/image";

interface TiltIconProps extends ImageProps {
  className?: string;
}

export function TiltIcon({ className, ...props }: TiltIconProps) {
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = iconRef.current;
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
    <div ref={iconRef} className={`inline-block ${className || ""}`}>
      <Image {...props} />
    </div>
  );
}
