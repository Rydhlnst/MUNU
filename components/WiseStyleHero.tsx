"use client";

import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";

const FONT_LIST = [
  "var(--font-alt)",
  "var(--font-mono)",
  "var(--font-sans)",
  "var(--font-heading)",
];

const ORIGINAL_FONT = "var(--font-heading)";

const SplitText = React.memo(({ children }: { children: string }) => {
  return (
    <>
      {children.split(" ").map((word, index) => (
        <span
          key={index}
          className="inline-block word mr-[0.25em]"
          style={{ whiteSpace: "pre" }}
        >
          {word}
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
    if (!subheadline) return;

    let cycleIndex = 0;
    let isResetting = false;

    const ctx = gsap.context(() => {
      // 🔹 Fade-in awal
      gsap.from(".fade-in", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });

      // 🔁 Animasi siklus font
      const animateFontCycle = () => {
        if (isResetting) return;

        const words = gsap.utils.toArray(".headline-text .word") as Element[];
        const currentFont = FONT_LIST[cycleIndex];

        // Langkah 1: Apply font secara stagger
        gsap.to(words, {
          fontFamily: currentFont,
          color: "#115c39",
          scale: 1.05,
          duration: 0.4,
          stagger: 0.1,
          ease: "power3.out",
          onComplete: () => {
            isResetting = true;

            // Langkah 2: Reset setelah delay
            setTimeout(() => {
              gsap.to(words, {
                fontFamily: ORIGINAL_FONT,
                color: "inherit",
                scale: 1,
                duration: 0.4,
                stagger: 0.1,
                ease: "power2.out",
                onComplete: () => {
                  isResetting = false;
                  cycleIndex = (cycleIndex + 1) % FONT_LIST.length;
                },
              });
            }, 1500);
          },
        });
      };

      // Hover effect subheadline
      const handleHover = (hovered: boolean) => (e: MouseEvent) => {
        const target = e.target as Element;
        if (target && target.classList.contains("word")) {
          gsap.to(target, {
            y: hovered ? -8 : 0,
            color: hovered ? "#1e293b" : "#334155",
            duration: 0.4,
            ease: "elastic.out(1, 0.5)",
          });
        }
      };

      subheadline.addEventListener("mouseover", handleHover(true));
      subheadline.addEventListener("mouseout", handleHover(false));

      const interval = setInterval(animateFontCycle, 4000);
      animateFontCycle(); // trigger langsung pertama

      return () => {
        clearInterval(interval);
        subheadline.removeEventListener("mouseover", handleHover(true));
        subheadline.removeEventListener("mouseout", handleHover(false));
      };
    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
    suppressHydrationWarning
      ref={componentRef}
      className="flex flex-col items-center justify-center w-full min-h-screen bg-white dark:bg-background text-black dark:text-white px-4 py-16"
      style={{ fontFamily: ORIGINAL_FONT }}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        <div className="mb-8 headline-text max-w-[90vw] px-4 sm:px-6">
          <h1
            className="text-balance text-center font-black uppercase tracking-tight break-normal leading-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
              lineHeight: "1.25",
            }}
          >
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
          className="fade-in max-w-[330px] md:max-w-xl text-md md:text-xl text-slate-700 dark:text-slate-300 mb-10 cursor-pointer"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <SplitText>
            Your global financial partner — track your money, invest with ease,
            and unlock smarter savings in every currency.
          </SplitText>
        </p>

        <div className="fade-in flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="bg-primary font-bold hover:bg-primary/90 text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-6 text-white dark:text-white"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Open an account
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-slate-300 dark:border-slate-600 text-black dark:text-white font-bold hover:bg-slate-100 dark:hover:bg-slate-800 text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-6"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Send money now
          </Button>
        </div>
      </div>
    </section>
  );
}
