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
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
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
    description:
      "Catat setiap pemasukan dan pengeluaran Anda dengan mudah untuk melihat ke mana uang Anda pergi.",
  },
  {
    icon: Target,
    title: "Perencanaan Anggaran",
    description:
      "Buat anggaran bulanan yang realistis dan patuhi untuk mencapai stabilitas finansial.",
  },
  {
    icon: LineChart,
    title: "Tujuan Finansial",
    description:
      "Tetapkan tujuan finansial jangka pendek dan panjang, lalu lacak progres Anda secara visual.",
  },
  {
    icon: PieChart,
    title: "Laporan Keuangan Detail",
    description:
      "Dapatkan wawasan mendalam melalui laporan pengeluaran, pemasukan, dan arus kas yang komprehensif.",
  },
  {
    icon: Link2,
    title: "Sinkronisasi Akun",
    description:
      "Hubungkan akun bank Anda dengan aman untuk otomatisasi pencatatan transaksi.",
  },
  {
    icon: GraduationCap,
    title: "Edukasi Finansial",
    description:
      "Tingkatkan literasi keuangan Anda dengan artikel dan tips praktis langsung di aplikasi.",
  },
];

export function ServicesSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const handlePrevious = () => {
    api?.scrollPrev();
  };

  const handleNext = () => {
    api?.scrollNext();
  };

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section
      id="layanan"
      className="w-full py-12 md:py-24 lg:py-32 bg-background text-foreground"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16 px-4">
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Semua yang Anda Butuhkan
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Munu menyediakan berbagai fitur canggih yang dirancang untuk
            memberdayakan Anda dalam mengelola keuangan pribadi secara efektif
            dan efisien.
          </p>
        </div>

        <div className="relative">
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
                  <CarouselItem
                    key={index}
                    className="pl-6 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1 h-full">
                      <div className="flex h-full flex-col p-8 border rounded-2xl bg-card border-border shadow-sm">
                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/50 mb-6">
                          <Icon className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                          {service.title}
                        </h3>
                        <p className="text-base text-muted-foreground">
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
            <div className="flex gap-4">
              <button
                onClick={handlePrevious}
                disabled={!canScrollPrev}
                className="flex items-center justify-center w-11 h-11 rounded-full bg-card border border-border shadow-sm hover:scale-110 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Scroll Left"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={!canScrollNext}
                className="flex items-center justify-center w-11 h-11 rounded-full bg-card border border-border shadow-sm hover:scale-110 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Scroll Right"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="text-sm text-muted-foreground">
              Fitur {current} dari {count}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
