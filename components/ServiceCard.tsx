// components/sections/service-card.tsx (VERSI FINAL YANG LEBIH AMAN)

"use client";

import { useLayoutEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Definisikan tipe untuk props
interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    const cardEl = cardRef.current;

    const ctx = gsap.context(() => {
      // Gunakan fromTo untuk kontrol penuh atas state awal dan akhir
      gsap.fromTo(
        cardEl,
        {
          // State Awal (sama dengan state 'from')
          opacity: 0,
          y: 50,
        },
        {
          // State Akhir (sama dengan state 'to')
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          // ScrollTrigger tetap sama
          scrollTrigger: {
            trigger: cardEl,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    // Ref tetap ada, tapi TIDAK PERLU `opacity-0` lagi di sini
    <Card
      ref={cardRef}
      className="flex flex-col p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <CardHeader className="flex flex-row items-center p-0 gap-5">
        <div className=" inline-block rounded-full bg-green-100 p-4 dark:bg-green-900/70">
          <service.icon className="h-10 w-10 text-green-600 dark:text-green-300" />
        </div>
        <CardTitle className="text-xl font-semibold">
          {service.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 mt-2">
        <CardDescription className="text-base text-muted-foreground">
          {service.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}