import Link from "next/link";
import { Twitter, Github, Linkedin, Mountain } from "lucide-react";

// Komponen helper untuk Link di Footer agar tidak repetitif
const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link
      href={href}
      className="text-muted-foreground transition-colors duration-200 hover:text-primary"
      prefetch={false}
    >
      {children}
    </Link>
  </li>
);

export function Footer() {
  return (
    <footer className="w-full border-t bg-background text-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Bagian Atas: Logo dan Kolom Link */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          
          {/* Kolom Kiri: Logo & Copyright */}
          <div className="md:col-span-4 lg:col-span-3">
            <Link href="/" className="flex items-center" prefetch={false}>
              <Mountain className="h-7 w-7 text-primary" />
              <span className="ml-2 text-xl font-bold tracking-tighter">Munu</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Platform finansial all-in-one untuk masa depan Anda.
            </p>
            <p className="mt-4 text-xs text-muted-foreground/80">
              © {new Date().getFullYear()} Munu Inc. All rights reserved.
            </p>
          </div>

          {/* Kolom Kanan: Grup Link Navigasi */}
          <div className="grid grid-cols-2 gap-8 md:col-span-8 lg:col-span-9 lg:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Produk
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <FooterLink href="/dashboard">Dashboard</FooterLink>
                <FooterLink href="/#fitur">Fitur</FooterLink>
                <FooterLink href="/#harga">Harga</FooterLink>
                <FooterLink href="/integrasi">Integrasi</FooterLink>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Sumber Daya
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <FooterLink href="/blog">Blog</FooterLink>
                <FooterLink href="/docs">Dokumentasi</FooterLink>
                <FooterLink href="/faq">FAQ</FooterLink>
                <FooterLink href="/status">Status</FooterLink>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Perusahaan
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <FooterLink href="/#tentang">Tentang Kami</FooterLink>
                <FooterLink href="/karier">Karier</FooterLink>
                <FooterLink href="/pers">Pers</FooterLink>
                <FooterLink href="/kontak">Kontak</FooterLink>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Legal
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <FooterLink href="/syarat-ketentuan">Syarat & Ketentuan</FooterLink>
                <FooterLink href="/kebijakan-privasi">Kebijakan Privasi</FooterLink>
                <FooterLink href="/lisensi">Lisensi</FooterLink>
              </ul>
            </div>
          </div>
        </div>

        {/* Garis Pemisah */}
        <hr className="my-8 border-border" />

        {/* Bagian Bawah: Copyright & Sosial Media */}
        <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground sm:hidden">
              © {new Date().getFullYear()} Munu Inc.
            </p>
          <div className="flex items-center space-x-5">
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
        </div>

      </div>
    </footer>
  );
}