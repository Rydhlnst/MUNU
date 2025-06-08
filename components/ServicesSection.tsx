// components/sections/services-section.tsx (Versi dengan useState & setApi)

"use client";

import {
  LineChart,
  Target,
  Wallet,
  PieChart,
  Link2,
  GraduationCap,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
// 1. Impor hook dan tipe CarouselApi
import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi, // Impor tipe untuk state api
} from "@/components/ui/carousel";

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
}

const servicesList: Service[] = [
    {
        icon: Wallet,
        title: "Pelacakan Pengeluaran",
        description: "Catat setiap pemasukan dan pengeluaran Anda dengan mudah untuk melihat ke mana uang Anda pergi.",
    },
    {
        icon: Target,
        title: "Perencanaan Anggaran",
        description: "Buat anggaran bulanan yang realistis dan patuhi untuk mencapai stabilitas finansial.",
    },
    {
        icon: LineChart,
        title: "Tujuan Finansial",
        description: "Tetapkan tujuan finansial jangka pendek dan panjang, lalu lacak progres Anda secara visual.",
    },
    {
        icon: PieChart,
        title: "Laporan Keuangan Detail",
        description: "Dapatkan wawasan mendalam melalui laporan pengeluaran, pemasukan, dan arus kas yang komprehensif.",
    },
    {
        icon: Link2,
        title: "Sinkronisasi Akun",
        description: "Hubungkan akun bank Anda dengan aman untuk otomatisasi pencatatan transaksi.",
    },
    {
        icon: GraduationCap,
        title: "Edukasi Finansial",
        description: "Tingkatkan literasi keuangan Anda dengan artikel dan tips praktis langsung di aplikasi.",
    },
];

export function ServicesSection() {
  // 2. Gunakan pola useState sesuai permintaan Anda
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // State untuk tombol navigasi tetap dipertahankan
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // Fungsi handle untuk tombol custom tetap sama
  const handlePrevious = () => {
    api?.scrollPrev();
  };

  const handleNext = () => {
    api?.scrollNext();
  };
  
  // 3. Gunakan useEffect untuk mengelola semua state saat API siap
  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      // Set state yang Anda minta
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);

      // Set state untuk tombol navigasi
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);
    
    // Panggil sekali di awal untuk set kondisi awal
    onSelect();

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section id="layanan" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-black">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16 px-4">
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-900 dark:text-gray-50">
            Semua yang Anda Butuhkan
          </h2>
          <p className="max-w-[700px] text-gray-600 md:text-xl dark:text-gray-400">
            Munu menyediakan berbagai fitur canggih yang dirancang untuk memberdayakan Anda dalam mengelola keuangan pribadi secara efektif dan efisien.
          </p>
        </div>

        <div className="relative">
          {/* 4. Gunakan prop `setApi` pada komponen Carousel */}
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-6">
              {servicesList.map((service, index) => {
                const Icon = service.icon;
                return (
                  <CarouselItem key={index} className="pl-6 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <div className="flex h-full flex-col p-8 border rounded-2xl bg-white dark:bg-gray-900/50 dark:border-gray-800 shadow-sm">
                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/50 mb-6">
                          <Icon className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-base text-gray-600 dark:text-gray-400">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
          
          <div className="flex items-center justify-between mt-6 px-1">
             {/* Tombol Navigasi Custom */}
            <div className="flex gap-4">
                <button
                    onClick={handlePrevious}
                    disabled={!canScrollPrev}
                    className="flex items-center justify-center w-11 h-11 rounded-full bg-white dark:bg-gray-900/50 border dark:border-gray-800 shadow-sm hover:scale-110 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Scroll Left"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={handleNext}
                    disabled={!canScrollNext}
                    className="flex items-center justify-center w-11 h-11 rounded-full bg-white dark:bg-gray-900/50 border dark:border-gray-800 shadow-sm hover:scale-110 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Scroll Right"
                >
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
             {/* Indikator Slide */}
            <div className="text-center text-sm text-muted-foreground">
              Fitur {current} dari {count}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}