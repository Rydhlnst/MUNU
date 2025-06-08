// components/MunuLandingPage.tsx (Versi Final yang Lebih Interaktif)

"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // 1. Import ScrollTrigger
import { ServicesSection } from "./ServicesSection";
import { WiseStyleHero } from "./WiseStyleHero";
import MunuScrollPage from "./scroll/aboutMunu";
import { MunuCommunity } from "./MunuCommunity";
import { MunuTestimonials } from "./MunuTestimonial";

// 2. Daftarkan plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export function MunuLandingPage() {
  const component = useRef(null);
  const dashboardMockupRef = useRef(null); // Ref untuk mockup dashboard

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // === Animasi Hero Section (Stagger) - Tetap sama ===
      gsap.from(".hero-item", {
        y: 50, // Sedikit lebih jauh untuk efek lebih dramatis
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power4.out',
        delay: 0.2,
      });

      // === 3. Animasi Parallax untuk Mockup Dashboard ===
      gsap.to(dashboardMockupRef.current, {
        y: -100, // Bergerak ke atas saat scroll ke bawah
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section", // Trigger dimulai saat hero section masuk viewport
          start: "top top", // Mulai saat bagian atas trigger bertemu bagian atas viewport
          end: "bottom top", // Selesai saat bagian bawah trigger bertemu bagian atas viewport
          scrub: true, // Animasi terikat langsung dengan posisi scroll
        },
      });
      
      // === 4. Animasi Mikro saat Hover pada Tombol Utama ===
      const mainButton = document.querySelector(".main-cta-button");
      mainButton?.addEventListener("mouseenter", () => {
        gsap.to(".main-cta-arrow", { x: 5, duration: 0.3, ease: "power2.inOut" });
      });
      mainButton?.addEventListener("mouseleave", () => {
        gsap.to(".main-cta-arrow", { x: 0, duration: 0.3, ease: "power2.inOut" });
      });
      
      // === 5. Animasi untuk ServicesSection saat discroll ===
      // Kita asumsikan di dalam ServicesSection ada elemen dengan kelas .service-card
      gsap.from(".service-card", {
          y: 100,
          opacity: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
              trigger: ".services-section-trigger", // Sebuah elemen trigger sebelum section
              start: "top 80%", // Mulai animasi saat trigger 80% masuk viewport
              toggleActions: "play none none none", // Mainkan sekali saat masuk
          }
      });

    }, component);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={component} className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <WiseStyleHero/>

        <MunuScrollPage/>

        <MunuTestimonials/>

        <MunuCommunity/>

        {/* Tambahkan div ini sebagai trigger untuk ServicesSection */}
        <div className="services-section-trigger h-1"></div>
        <ServicesSection />
      </main>
    </div>
  );
}