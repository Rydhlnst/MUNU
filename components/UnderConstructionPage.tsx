"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const UnderConstructionPage = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imageEl = imageRef.current;
    const contentEls = contentRef.current?.querySelectorAll(".slide-in") || [];

    // Bounce in untuk gambar
    if (imageEl) {
      gsap.fromTo(
        imageEl,
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "bounce.out",
        }
      );
    }

    // Slide in untuk teks
    gsap.from(contentEls, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.2,
      delay: 0.2,
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 bg-background text-foreground">
      <div ref={imageRef}>
        <Image
          src="/onBuild.svg"
          alt="Page Under Construction"
          height={400}
          width={400}
          className="mb-8"
        />
      </div>

      <div ref={contentRef}>
        <h1 className="slide-in text-3xl md:text-4xl font-bold mb-4">
          This Page is Still Under Construction
        </h1>
        <p className="slide-in text-muted-foreground max-w-xl text-base md:text-lg">
          We&apos;re currently working hard to build something amazing for you.
          <br />
          Stay tuned — this section will be available very soon as part of the full{" "}
          <span className="text-primary">MUNU</span> experience.
        </p>
      </div>
    </div>
  );
};

export default UnderConstructionPage;
