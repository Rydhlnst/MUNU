// app/thanks/page.tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import gsap from "gsap";

export default function ThanksPage() {
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Bounce effect untuk gambar
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "bounce.out",
        }
      );
    }

    // Slide-in effect untuk konten lainnya (heading, text, button)
    if (contentRef.current) {
      const children = contentRef.current.querySelectorAll(".animate-slide");

      gsap.from(children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
        delay: 0.3,
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        <div ref={imageRef} className="w-full flex justify-center items-center">
          <Image src={"/success.svg"} alt="Success" width={450} height={450} />
        </div>
        <div ref={contentRef} className="space-y-6">
          <h1 className="text-3xl font-bold text-foreground animate-slide">
            You’ve Successfully Joined the Waitlist!
          </h1>
          <p className="text-muted-foreground animate-slide">
            Thank you for signing up. We’ll reach out to you once the beta version of{" "}
            <span className="font-semibold text-primary">MUNU</span> is ready to launch.
          </p>
          <div className="animate-slide">
            <Button asChild className="mt-4">
              <Link href="/">Back to Homepage</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
