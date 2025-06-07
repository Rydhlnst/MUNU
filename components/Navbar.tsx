"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react"; // Import hook dan fungsi signOut
import { Button } from "@/components/ui/button";
import { Mountain } from "lucide-react";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
  // Ambil status dan data sesi dari hook useSession
  const { status } = useSession();

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
            <Link href="/#fitur" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Fitur
            </Link>
            <Link href="/#harga" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Harga
            </Link>
            <Link href="/#tentang" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Tentang Kami
            </Link>
          </nav>

          {/* --- Tombol Dinamis --- */}
          <div className="flex items-center gap-3">
            {/* Tampilkan loading state jika sesi sedang diperiksa */}
            {status === "loading" && (
              <div className="hidden h-10 w-44 animate-pulse rounded-md bg-muted md:flex" />
            )}

            {/* Tampilkan tombol ini jika pengguna BELUM login */}
            {status === "unauthenticated" && (
              <>
                <Link href="/sign-in" passHref legacyBehavior>
                  <Button asChild className="hidden md:flex">
                    Masuk
                  </Button>
                </Link>
                <Link href="/sign-up" passHref legacyBehavior>
                  <Button asChild variant={"outline"} className="hidden md:flex">
                    Daftar
                  </Button>
                </Link>
              </>
            )}

            {/* Tampilkan tombol ini jika pengguna SUDAH login */}
            {status === "authenticated" && (
              <>
                <Link href="/dashboard" passHref legacyBehavior>
                  <Button asChild variant={"outline"} className="hidden md:flex">
                    <a>Dashboard</a>
                  </Button>
                </Link>
                <Button onClick={() => signOut()} className="hidden md:flex">
                  Logout
                </Button>
              </>
            )}
          </div>

          {/* Mobile Nav Trigger (Anda mungkin perlu meneruskan 'status' ke sini) */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}