// app/munu-scroll/page.tsx (Perbaikan Final untuk Posisi Tengah dan Dark Mode)

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Skeleton } from "@/components/ui/skeleton";

gsap.registerPlugin(ScrollTrigger);

export default function MunuScrollPage() {
  const containerRef = useRef(null);
  const pinTargetRef = useRef(null);
  const headingRef = useRef(null);
  const subTextRef = useRef(null);

  const navbarHeight = 80;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: `top ${navbarHeight}px`,
          end: "+=150%",
          scrub: 1,
          pin: pinTargetRef.current,
          pinSpacing: true,
        },
      });

      tl.from(headingRef.current, {
        yPercent: 150,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      }).from(subTextRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      }, "-=1");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        className="relative h-[200vh] bg-primary text-white dark:bg-primary dark:text-white"
      >
        <div
            ref={pinTargetRef}
            className="w-full min-h-[calc(100dvh-80px)] relative flex items-center justify-center px-6 text-center"
          >
          <div className="transform -translate-y-6 max-w-4xl">
            <h1
              ref={headingRef}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white dark:text-white mb-6 leading-tight"
            >
              Meet MUNU
            </h1>
            <p
              ref={subTextRef}
              className="max-w-[360px] md:max-w-2xl mx-auto text-lg md:text-xl text-white/80 dark:text-white/70"
            >
              Your all-in-one finance platform to track, save, invest, and grow — globally.
            </p>
          </div>
        </div>
      </section>

      <section className="h-screen  bg-primary dark:bg-primary flex items-center justify-center overflow-clip">
        <div className="w-full max-w-6xl mx-auto px-8 isolate">
          <Skeleton className="w-full aspect-[16/9] rounded-xl shadow-lg border-none bg-muted/20 backface-hidden will-change-transform" />
        </div>
      </section>
    </>
  );
}
