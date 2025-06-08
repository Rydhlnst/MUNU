"use client"

import { Button } from "@/components/ui/button"; // Asumsi path ke komponen Button Anda
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

// Definisikan fitur untuk setiap paket
// Anda bisa dengan mudah menambah atau mengurangi fitur di sini
const tiers = [
  {
    name: "Pemula",
    price: "Gratis",
    frequency: "selamanya",
    description: "Untuk Anda yang baru memulai perjalanan mengelola keuangan.",
    features: [
      "Manajemen Budget",
      "Edukasi Finansial",
      "Laporan bulanan sederhana",
    ],
    ctaText: "Mulai Gratis",
    isRecommended: false,
  },
  {
    name: "Investor",
    price: "Rp 99.000",
    frequency: "/ bulan",
    description: "Untuk mengembangkan dan mengoptimalkan portofolio investasi Anda.",
    features: [
      "Semua fitur di paket Pemula",
      "Dividen Tracker",
      "Rebalancing Portofolio",
      "Analisis Saham & Kripto",
    ],
    ctaText: "Pilih Paket Investor",
    isRecommended: true, // Kita tandai ini sebagai paket paling populer
  },
  {
    name: "Profesional",
    price: "Rp 249.000",
    frequency: "/ bulan",
    description: "Untuk Anda yang membutuhkan alat canggih dan integrasi penuh.",
    features: [
      "Semua fitur di paket Investor",
      "Laporan Otomatis & Kustom",
      "Integrasi API",
      "Dukungan Prioritas",
    ],
    ctaText: "Pilih Paket Pro",
    isRecommended: false,
  },
];

const DEFAULT_RECOMMENDED_TIER = "Investor";

export default function HoverPricingSection() {
  // 2. useState hook to track the hovered tier. Initialize with the default.
  const [hoveredTier, setHoveredTier] = useState(DEFAULT_RECOMMENDED_TIER);

  return (
    <section className="w-full py-12 md:py-20 lg:py-24 bg-gray-50/50 dark:bg-black/50">
      <div className="container mx-auto px-4 md:px-6">
        {/* The onMouseLeave on the container resets the hover effect */}
        <div
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
          onMouseLeave={() => setHoveredTier(DEFAULT_RECOMMENDED_TIER)}
        >
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              // 3. onMouseEnter updates the state to the current card's name
              onMouseEnter={() => setHoveredTier(tier.name)}
              // 4. Conditional styling based on the hoveredTier state
              className={`relative flex flex-col transition-all duration-300
                ${hoveredTier === tier.name ? "border-primary ring-2 ring-primary" : "border-border"}`}
            >
              {/* Conditional "Most Popular" Badge */}
              {hoveredTier === tier.name && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <CardDescription className="pt-2">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <div className="flex-grow">
                  <p className="text-4xl font-bold">{tier.price}</p>
                  <Button className="w-full mt-6">{tier.ctaText}</Button>
                  <p className="mt-8 text-sm font-semibold text-foreground">
                    {tier.name} plan includes:
                  </p>
                  <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <span className="text-primary font-bold mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}