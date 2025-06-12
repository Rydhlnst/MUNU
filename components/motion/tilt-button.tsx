"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // pastikan punya className merge helper

type Variant = "default" | "outline" | "ghost" | "link" | "destructive" | "secondary";
type Size = "default" | "sm" | "lg" | "icon";

export interface TiltButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

export function TiltButton({ children, className, ...props }: TiltButtonProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Button
        className={cn("cta-button", className)}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}
