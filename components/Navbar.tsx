// components/Navbar.tsx (Perbaikan Final - Menggunakan Tailwind CSS Penuh)

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Mountain } from "lucide-react";
import { MobileNav } from "./mobile-nav";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  AnalyticsIcon,
  BankFreeIcons,
  Chart01FreeIcons,
  CodeFreeIcons,
  DashboardSquareEditFreeIcons,
  DocumentAttachmentIcon,
  MagicWand01FreeIcons,
  PieChartFreeIcons,
  RefreshFreeIcons,
  SunglassesFreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";

// --- Tipe Data & Definisi Konten (Tidak berubah) --- //
type FeatureCategory = "Untuk Pemula" | "Untuk Investor" | "Untuk Profesional";

interface FeatureItem {
  category: FeatureCategory;
  title: string;
  description: string;
  icon: Parameters<typeof HugeiconsIcon>[0]["icon"];
  iconColor: string;
  bgColor: string;
  href: string;
}

const features: FeatureItem[] = [
    { category: "Untuk Pemula", title: "Manajemen Budget", description: "Buat dan kelola anggaran bulanan Anda dengan mudah.", icon: BankFreeIcons, iconColor: "text-green-700", bgColor: "bg-green-100", href: "/fitur/budgeting" },
    { category: "Untuk Pemula", title: "Edukasi Finansial", description: "Tingkatkan literasi keuangan Anda melalui modul interaktif.", icon: AnalyticsIcon, iconColor: "text-sky-700", bgColor: "bg-sky-100", href: "/fitur/edukasi" },
    { category: "Untuk Investor", title: "Dividen Tracker", description: "Lacak dan proyeksikan pendapatan dividen dari portofolio Anda.", icon: SunglassesFreeIcons, iconColor: "text-orange-700", bgColor: "bg-orange-100", href: "/fitur/dividen-tracker" },
    { category: "Untuk Investor", title: "Rebalancing Portofolio", description: "Jaga alokasi aset ideal Anda dengan saran rebalancing.", icon: RefreshFreeIcons, iconColor: "text-indigo-700", bgColor: "bg-indigo-100", href: "/fitur/rebalancing" },
    { category: "Untuk Profesional", title: "Laporan Otomatis", description: "Hasilkan laporan keuangan dan investasi secara otomatis.", icon: DocumentAttachmentIcon, iconColor: "text-rose-700", bgColor: "bg-rose-100", href: "/fitur/laporan-otomatis" },
    { category: "Untuk Profesional", title: "Integrasi API", description: "Hubungkan data finansial Anda dengan aplikasi pihak ketiga.", icon: CodeFreeIcons, iconColor: "text-slate-700", bgColor: "bg-slate-100", href: "/fitur/api" },
];

const productItems = [
    { name: "Portofolio Dashboard", description: "Kelola seluruh aset kamu dengan ringkasan yang terstruktur.", icon: DashboardSquareEditFreeIcons, href: "/dashboard" },
    { name: "Simulasi Investasi", description: "Hitung potensi return dari berbagai skenario investasi.", icon: PieChartFreeIcons, href: "/simulasi" },
    { name: "Pasar Saham & Crypto", description: "Pantau pergerakan saham dan aset crypto secara real-time.", icon: Chart01FreeIcons, href: "/market" },
    { name: "Fitur AI Finansial", description: "Gunakan AI untuk mendapatkan insight dan saran keuangan.", icon: MagicWand01FreeIcons, href: "/ai" },
];

// --- Komponen Utama Navbar --- //
export function Navbar() {
  const { status } = useSession();
  const [scrolled, setScrolled] = useState(false);

  const groupedFeatures = features.reduce<Record<FeatureCategory, FeatureItem[]>>(
    (acc, feature) => {
      if (!acc[feature.category]) acc[feature.category] = [];
      acc[feature.category].push(feature);
      return acc;
    },
    { "Untuk Pemula": [], "Untuk Investor": [], "Untuk Profesional": [] }
  );
  const categories: FeatureCategory[] = ["Untuk Pemula", "Untuk Investor", "Untuk Profesional"];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // GSAP dan useEffect untuk animasi telah DIHAPUS

  return (
    // --- INI BAGIAN YANG DIPERBAIKI ---
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out",
        scrolled
          ? "h-16 border-b border-border bg-background shadow-sm"
          : "h-20 border-b border-transparent bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        
        <div className="flex items-center">
            <Link href="/" className="flex items-center" prefetch={false}>
                <Mountain className="h-6 w-6 text-green-600" />
                <span className="ml-2 text-xl font-bold tracking-tighter text-foreground">Munu</span>
            </Link>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {/* ... Konten Navigasi tidak berubah ... */}
          <HoverCard openDelay={100} closeDelay={100}>
            <HoverCardTrigger className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none">
              Produk
            </HoverCardTrigger>
            <HoverCardContent
              sideOffset={15}
              className="w-full max-w-4xl rounded-xl border bg-background shadow-lg"
              align="center"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
                {productItems.map((item) => (
                  <Link key={item.name} href={item.href} className="group flex items-start gap-4 rounded-lg p-3 text-left transition-all hover:bg-muted">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
                      <HugeiconsIcon icon={item.icon} className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </HoverCardContent>
          </HoverCard>

          <HoverCard openDelay={100} closeDelay={100}>
            <HoverCardTrigger className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none">
              Fitur
            </HoverCardTrigger>
            <HoverCardContent
              sideOffset={15}
              className="w-full max-w-6xl rounded-xl border bg-background shadow-lg"
              align="center"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                {categories.map((categoryName) => (
                  <div key={categoryName}>
                    <h3 className="text-base font-semibold text-foreground mb-4">{categoryName}</h3>
                    <div className="grid gap-4">
                      {groupedFeatures[categoryName].map((product) => (
                        <Link key={product.title} href={product.href} className="group flex items-start gap-4 rounded-lg p-3 text-left transition-all hover:bg-muted">
                          <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${product.bgColor}`}>
                            <HugeiconsIcon icon={product.icon} className={`w-5 h-5 ${product.iconColor}`} />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{product.title}</p>
                            <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </HoverCardContent>
          </HoverCard>

          <Link href="/#harga" className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none">
            Harga
          </Link>
          <Link href="/#tentang" className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none">
            Misi kami
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-3 md:flex">
            {status === "loading" && (<div className="h-10 w-44 animate-pulse rounded-md bg-muted" />)}
            {status === "unauthenticated" && (
              <>
                <Link href="/sign-in">
                  <Button>Sign in</Button>
                </Link>
                <Link href="/sign-up">
                  <Button variant="outline">Sign up</Button>
                </Link>
              </>
            )}
            {status === "authenticated" && (
              <>
                <Link href="/dashboard" passHref>
                  <Button asChild variant="outline">
                    Dashboard
                  </Button>
                </Link>
                <Button onClick={() => signOut()}>
                  Logout
                </Button>
              </>
            )}
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}