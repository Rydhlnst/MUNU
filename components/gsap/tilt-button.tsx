"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

type Variant = "default" | "outline" | "ghost" | "link" | "destructive" | "secondary";
type Size = "default" | "sm" | "lg" | "icon";

export interface TiltButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

export function TiltButton({ children, className, ...props }: TiltButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const handleHover = (hovered: boolean) => {
      gsap.to(btn, {
        y: hovered ? -6 : 0,
        scale: hovered ? 1.05 : 1,
        duration: 0.12,
        ease: "expo.out",
      });
    };

    btn.addEventListener("mouseenter", () => handleHover(true));
    btn.addEventListener("mouseleave", () => handleHover(false));

    return () => {
      btn.removeEventListener("mouseenter", () => handleHover(true));
      btn.removeEventListener("mouseleave", () => handleHover(false));
    };
  }, []);

  return (
    <Button
      ref={btnRef}
      className={`cta-button ${className || ""}`}
      {...props}
    >
      {children}
    </Button>
  );
}
