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
    title: "Expense Tracking",
    description:
      "Easily record your income and expenses to see where your money goes.",
  },
  {
    icon: Target,
    title: "Budget Planning",
    description:
      "Create realistic monthly budgets and stick to them to achieve financial stability.",
  },
  {
    icon: LineChart,
    title: "Financial Goals",
    description:
      "Set short and long-term financial goals, then track your progress visually.",
  },
  {
    icon: PieChart,
    title: "Detailed Financial Reports",
    description:
      "Gain deep insights through comprehensive income, expense, and cash flow reports.",
  },
  {
    icon: Link2,
    title: "Account Synchronization",
    description:
      "Securely link your bank accounts for automated transaction tracking.",
  },
  {
    icon: GraduationCap,
    title: "Financial Education",
    description:
      "Improve your financial literacy with in-app articles and practical tips.",
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
      id="services"
      className="w-full px-8 md:px-12 lg:px-16 py-12 md:py-24 lg:py-32 bg-background text-foreground"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16 px-4">
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Everything You Need
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Munu provides advanced features designed to empower you to manage your personal finances effectively and efficiently.
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
              Feature {current} of {count}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
