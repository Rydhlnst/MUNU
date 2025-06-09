// components/WiseStyleHero.tsx
"use client";

import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";

const FONT_LIST = ["var(--font-alt)", "var(--font-mono)"];
const ORIGINAL_FONT = "var(--font-heading)";

const SplitText = React.memo(({ children }: { children: string }) => {
  return (
    <>
      {children.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block letter"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </span>
      ))}
    </>
  );
});
SplitText.displayName = "SplitText";

export function WiseStyleHero() {
  const componentRef = useRef(null);
  const subheadlineRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const subheadline = subheadlineRef.current;

    const ctx = gsap.context(() => {
      gsap.from(".fade-in", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });

      const animateRandomLetter = () => {
        const letters = gsap.utils.toArray(".headline-text .letter");
        if (letters.length === 0) return;

        const randomLetter = gsap.utils.random(letters) as Element;
        const randomFont = gsap.utils.random(FONT_LIST);

        gsap.timeline()
          .to(randomLetter, {
            fontFamily: randomFont,
            color: "#115c39",
            scale: 1.1,
            duration: 0.1,
            ease: "power2.inOut",
          })
          .to(randomLetter, {
            fontFamily: ORIGINAL_FONT,
            color: "inherit",
            scale: 1.0,
            duration: 0.4,
            ease: "elastic.out(1, 0.5)",
            delay: 0.1,
          });
      };

      const interval = setInterval(animateRandomLetter, 400);

      if (!subheadline) return;

      const onEnter = (e: MouseEvent) => {
        const target = e.target as Element;
        if (target && target.classList.contains("letter")) {
          gsap.to(target, {
            y: -8,
            color: "#1e293b",
            duration: 0.4,
            ease: "elastic.out(1, 0.5)",
          });
        }
      };

      const onLeave = (e: MouseEvent) => {
        const target = e.target as Element;
        if (target && target.classList.contains("letter")) {
          gsap.to(target, {
            y: 0,
            color: "#334155",
            duration: 0.4,
            ease: "elastic.out(1, 0.5)",
          });
        }
      };

      subheadline.addEventListener("mouseover", onEnter);
      subheadline.addEventListener("mouseout", onLeave);

      return () => {
        clearInterval(interval);
        subheadline.removeEventListener("mouseover", onEnter);
        subheadline.removeEventListener("mouseout", onLeave);
      };
    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={componentRef}
      className="flex flex-col items-center justify-center w-full min-h-screen bg-white dark:bg-background text-black dark:text-white px-4 py-16"
      style={{ fontFamily: ORIGINAL_FONT }}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        <div className="mb-8 headline-text">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none">
            <div className="fade-in">
              <SplitText>FINANCE, SIMPLIFIED.</SplitText>
            </div>
            <div className="fade-in">
              <SplitText>ANYWHERE. ANYTIME.</SplitText>
            </div>
            <div className="fade-in">
              <SplitText>MUNU</SplitText>
            </div>
          </h1>
        </div>

        <p
          ref={subheadlineRef as React.RefObject<HTMLParagraphElement>}
          className="fade-in max-w-xl text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-10 cursor-pointer"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <SplitText>
            Your global financial partner — track your money, invest with ease, and unlock smarter savings in every currency.
          </SplitText>
        </p>

        <div className="fade-in flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="bg-primary font-bold hover:bg-primary/90 text-base px-8 py-6 text-white dark:text-white"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Open an account
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-slate-300 dark:border-slate-600 text-black dark:text-white font-bold hover:bg-slate-100 dark:hover:bg-slate-800 text-base px-8 py-6"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Send money now
          </Button>
        </div>
      </div>
    </section>
  );
}