// components/Navbar.tsx (Final Revision - Full Tailwind CSS)

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

// --- Type Definitions & Content (Unchanged) --- //
type FeatureCategory = "For Beginners" | "For Investors" | "For Professionals";

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
  {
    category: "For Beginners",
    title: "Budget Management",
    description: "Easily create and manage your monthly budget.",
    icon: BankFreeIcons,
    iconColor: "text-green-700",
    bgColor: "bg-green-100",
    href: "/features/budgeting",
  },
  {
    category: "For Beginners",
    title: "Financial Education",
    description: "Enhance your financial literacy with interactive modules.",
    icon: AnalyticsIcon,
    iconColor: "text-sky-700",
    bgColor: "bg-sky-100",
    href: "/features/education",
  },
  {
    category: "For Investors",
    title: "Dividend Tracker",
    description: "Track and project your portfolio's dividend income.",
    icon: SunglassesFreeIcons,
    iconColor: "text-orange-700",
    bgColor: "bg-orange-100",
    href: "/features/dividend-tracker",
  },
  {
    category: "For Investors",
    title: "Portfolio Rebalancing",
    description: "Maintain optimal asset allocation with rebalancing suggestions.",
    icon: RefreshFreeIcons,
    iconColor: "text-indigo-700",
    bgColor: "bg-indigo-100",
    href: "/features/rebalancing",
  },
  {
    category: "For Professionals",
    title: "Automated Reports",
    description: "Generate financial and investment reports automatically.",
    icon: DocumentAttachmentIcon,
    iconColor: "text-rose-700",
    bgColor: "bg-rose-100",
    href: "/features/auto-reports",
  },
  {
    category: "For Professionals",
    title: "API Integration",
    description: "Connect your financial data with third-party apps.",
    icon: CodeFreeIcons,
    iconColor: "text-slate-700",
    bgColor: "bg-slate-100",
    href: "/features/api",
  },
];

const productItems = [
  {
    name: "Portfolio Dashboard",
    description: "Manage all your assets with a structured overview.",
    icon: DashboardSquareEditFreeIcons,
    href: "/dashboard",
  },
  {
    name: "Investment Simulator",
    description: "Calculate potential returns from different scenarios.",
    icon: PieChartFreeIcons,
    href: "/simulator",
  },
  {
    name: "Stock & Crypto Market",
    description: "Monitor stock and crypto asset movements in real-time.",
    icon: Chart01FreeIcons,
    href: "/market",
  },
  {
    name: "AI Financial Features",
    description: "Use AI to gain insights and financial advice.",
    icon: MagicWand01FreeIcons,
    href: "/ai",
  },
];

// --- Main Navbar Component --- //
export function Navbar() {
  const { status } = useSession();
  const [scrolled, setScrolled] = useState(false);

  const groupedFeatures = features.reduce<Record<FeatureCategory, FeatureItem[]>>(
    (acc, feature) => {
      if (!acc[feature.category]) acc[feature.category] = [];
      acc[feature.category].push(feature);
      return acc;
    },
    {
      "For Beginners": [],
      "For Investors": [],
      "For Professionals": [],
    }
  );

  const categories: FeatureCategory[] = [
    "For Beginners",
    "For Investors",
    "For Professionals",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out",
        scrolled
          ? "h-16 border-b border-border bg-background shadow-sm"
          : "h-20 border-b border-transparent bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-full max-w-7xl items-center justify-between  px-4 sm:px-6">
        <div className="flex items-center">
          <Link href="/" className="flex items-center" prefetch={false}>
            <Mountain className="h-6 w-6 text-primary" />
            <span className="ml-2 text-xl font-bold tracking-tighter text-foreground">
              Munu
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-8">
            <nav className="hidden items-center gap-2 md:flex">
              <HoverCard openDelay={100} closeDelay={100}>
                <HoverCardTrigger className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none">
                  Products
                </HoverCardTrigger>
                <HoverCardContent
                  sideOffset={15}
                  className="w-full max-w-4xl rounded-xl border bg-background shadow-lg"
                  align="center"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
                    {productItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="group flex items-start gap-4 rounded-lg p-3 text-left transition-all hover:bg-muted"
                      >
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
                  Features
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
                          {groupedFeatures[categoryName].map((feature) => (
                            <Link
                              key={feature.title}
                              href={feature.href}
                              className="group flex items-start gap-4 rounded-lg p-3 text-left transition-all hover:bg-muted"
                            >
                              <div
                                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${feature.bgColor}`}
                              >
                                <HugeiconsIcon icon={feature.icon} className={`w-5 h-5 ${feature.iconColor}`} />
                              </div>
                              <div>
                                <p className="font-semibold text-foreground">{feature.title}</p>
                                <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </HoverCardContent>
              </HoverCard>

              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none"
              >
                Pricing
              </Link>
              <Link
                href="/#about"
                className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none"
              >
                Our Mission
              </Link>
            </nav>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-3 md:flex">
              {status === "loading" && (
                <div className="h-10 w-44 animate-pulse rounded-md bg-muted" />
              )}
              {status === "unauthenticated" && (
                <>
                  <Link href="/sign-in">
                    <Button>Sign In</Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button variant="outline">Sign Up</Button>
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
                  <Button onClick={() => signOut()}>Logout</Button>
                </>
              )}
            </div>
            <MobileNav />
          </div>
        </div>

      </div>
    </header>
  );
}
