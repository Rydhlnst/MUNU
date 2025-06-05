"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mountain } from "lucide-react";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center" prefetch={false}>
          <Mountain className="h-6 w-6 text-green-600" />
          <span className="ml-2 text-xl font-bold tracking-tighter">Munu</span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6 md:gap-12">
          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Fitur
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Harga
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Tentang Kami
            </Link>
          </nav>

        <div className="flex gap-3">
          <Button className="hidden md:flex">Masuk</Button>
          <Button variant={"outline"} className="hidden md:flex">Daftar</Button>
        </div>

          {/* Mobile Nav Trigger */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
