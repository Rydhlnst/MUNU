// components/layout/footer.tsx

import Link from "next/link";
import { Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    // Wrapper luar untuk background dan border full-width
    <footer className="w-full border-t bg-background">
      
      {/* Container dalam untuk membatasi lebar dan mengatur layout konten */}
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 py-6 sm:flex-row">
        
        {/* Copyright text - Menggunakan tahun dinamis */}
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Munu Inc. All rights reserved.
        </p>
        
        {/* Navigasi Footer */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link
            href="/syarat-ketentuan"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Syarat & Ketentuan
          </Link>
          <Link
            href="/kebijakan-privasi"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Kebijakan Privasi
          </Link>
          
          {/* Ikon Sosial Media */}
          <div className="flex items-center gap-4">
            <Link href="#" target="_blank" rel="noreferrer" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
            </Link>
            <Link href="#" target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
            </Link>
            <Link href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
            </Link>
          </div>
        </nav>
        
      </div>
    </footer>
  );
}