"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function MunuScrollPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"], // 0% to 100% scroll range
  });

  const headingY = useTransform(scrollYProgress, [0, 0.4], ["150%", "0%"]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const subTextY = useTransform(scrollYProgress, [0.2, 0.6], [80, 0]);
  const subTextOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);

  return (
    <>
      <section
        ref={containerRef}
        className="relative h-[200vh] bg-primary text-white dark:bg-primary dark:text-white"
      >
        {/* Simulasi pinning manual: konten yang fixed dalam frame scroll */}
        <div className="sticky top-[80px] h-[calc(100vh-80px)] flex items-center justify-center px-6 text-center">
          <div className="transform -translate-y-6 max-w-4xl">
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-1 leading-tight"
              style={{ y: headingY, opacity: headingOpacity }}
            >
              Meet MUNU
            </motion.h1>
            <motion.p
              className="max-w-[360px] md:max-w-2xl mx-auto text-lg md:text-xl text-white/80 dark:text-white/70"
              style={{ y: subTextY, opacity: subTextOpacity }}
            >
              Your all-in-one finance platform to track, save, invest, and grow — globally.
            </motion.p>
          </div>
        </div>
      </section>
      <section className="h-screen bg-primary dark:bg-primary flex items-center justify-center overflow-clip">
        <div className="w-full max-w-6xl mx-auto px-8 isolate">
          <Skeleton className="w-full aspect-[16/9] rounded-xl shadow-lg border-none bg-muted/20 backface-hidden will-change-transform" />
        </div>
      </section>

    </>
  );
}
