// components/MunuLandingPage.tsx (versi final yang interaktif dengan GSAP)

"use client";

import { useLayoutEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight} from "lucide-react";
import { gsap } from "gsap";
import { InteractiveDashboardMockup } from "./interactive-dashboard"; // Pastikan path benar
import { ServicesSection } from "./ServicesSection"; // Pastikan path benar

export function MunuLandingPage() {
  const component = useRef(null);

  // Gunakan useLayoutEffect untuk menjalankan animasi GSAP saat komponen dimuat
  useLayoutEffect(() => {
    // Buat context GSAP untuk cleanup otomatis
    const ctx = gsap.context(() => {
      // Animasikan semua elemen dengan kelas .hero-item secara berurutan (stagger)
      gsap.from(".hero-item", {
        y: 30,
        opacity: 0,
        stagger: 0.2, // Jeda 0.2 detik antar animasi elemen
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, component); // Scope animasi ke komponen ini

    // Fungsi cleanup saat komponen unmount
    return () => ctx.revert();
  }, []);

  return (
    // Kaitkan ref ke elemen terluar dari seksi yang akan dianimasikan
    <div ref={component} className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 max-w-7xl mx-auto min-h-screen items-center flex px-8 md:px-0">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
              
              {/* Kolom Kiri: Teks & CTA */}
              <div className="flex flex-col items-center justify-center space-y-6 text-center md:items-start md:text-left">
                <div className="space-y-4">
                  {/* Tambahkan kelas .hero-item untuk ditarget oleh GSAP */}
                  <h1 className="hero-item text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Kendalikan Keuangan Pribadi Anda dengan Mudah
                  </h1>
                  <p className="hero-item max-w-[600px] text-muted-foreground md:text-xl">
                    Munu adalah dasbor finansial all-in-one yang membantu Anda melacak pengeluaran, membuat anggaran, dan mencapai tujuan finansial Anda lebih cepat.
                  </p>
                </div>
                <div className="hero-item flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Mulai Gratis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
                <div className="hero-item flex items-center gap-4 pt-4">
                  <div className="flex -space-x-2">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="User 1" />
                      <AvatarFallback>U1</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarImage src="https://github.com/vercel.png" alt="User 2" />
                      <AvatarFallback>U2</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarImage src="https://github.com/styfle.png" alt="User 3" />
                      <AvatarFallback>U3</AvatarFallback>
                    </Avatar>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Dipercaya oleh 2,000+ pengguna di seluruh dunia.
                  </p>
                </div>
              </div>

              {/* Kolom Kanan: Ganti Skeleton dengan Komponen Interaktif */}
              <div className="flex items-center justify-center">
                <InteractiveDashboardMockup />
              </div>

            </div>
          </div>
        </section>
        <ServicesSection/>
      </main>
    </div>
  );
}