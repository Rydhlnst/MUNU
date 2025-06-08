import Link from "next/link";
import { Twitter, Github, Linkedin, Mountain } from "lucide-react";

// Komponen helper untuk Link di Footer agar tidak repetitif
// Kita modifikasi sedikit agar sesuai dengan background primary
const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link
      href={href}
      className="text-primary-foreground/80 transition-colors duration-200 hover:text-primary-foreground"
      prefetch={false}
    >
      {children}
    </Link>
  </li>
);

export function Footer() {
  return (
    // UBAH 1: Mengganti background menjadi bg-primary dan warna teks default
    <footer className="w-full border-t border-primary-foreground/10 bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Bagian Atas: Logo dan Kolom Link */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          
          {/* Kolom Kiri: Logo & Copyright */}
          <div className="md:col-span-4 lg:col-span-3">
            <Link href="/" className="flex items-center" prefetch={false}>
              {/* UBAH 2: Warna ikon disesuaikan */}
              <Mountain className="h-7 w-7 text-primary-foreground" />
              <span className="ml-2 text-xl font-bold tracking-tighter">Munu</span>
            </Link>
            {/* UBAH 3: Warna teks muted disesuaikan */}
            <p className="mt-4 text-sm text-primary-foreground/80">
              Platform finansial all-in-one untuk masa depan Anda.
            </p>
            <p className="mt-4 text-xs text-primary-foreground/60">
              © {new Date().getFullYear()} Munu Inc. All rights reserved.
            </p>
          </div>

          {/* Kolom Kanan: Grup Link Navigasi */}
          <div className="grid grid-cols-2 gap-8 md:col-span-8 lg:col-span-9 lg:grid-cols-4">
            <div>
              {/* UBAH 4: Warna heading disesuaikan */}
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground">
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
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground">
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
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground">
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
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground">
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

        {/* UBAH 5: Warna garis pemisah disesuaikan */}
        <hr className="my-8 border-primary-foreground/20" />

        {/* Bagian Bawah: Copyright & Sosial Media */}
        <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-primary-foreground/80 sm:hidden">
              © {new Date().getFullYear()} Munu Inc.
            </p>
          <div className="flex items-center space-x-5">
            {/* UBAH 6: Warna ikon sosial media dan hover-nya disesuaikan */}
            <Link href="#" target="_blank" rel="noreferrer" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-primary-foreground/80 transition-colors hover:text-primary-foreground" />
            </Link>
            <Link href="#" target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5 text-primary-foreground/80 transition-colors hover:text-primary-foreground" />
            </Link>
            <Link href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-primary-foreground/80 transition-colors hover:text-primary-foreground" />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}