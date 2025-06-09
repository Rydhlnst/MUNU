import Link from "next/link";
import { Twitter, Github, Linkedin, Mountain } from "lucide-react";

// Helper component for Footer links to reduce repetition
// Slightly modified to fit the primary background theme
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
    // CHANGE 1: Use bg-primary and proper text colors
    <footer className="w-full border-t border-primary-foreground/10 bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-7xl px-8 py-12 md:px-12 lg:px-16">
        
        {/* Top Section: Logo and Link Columns */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          
          {/* Left Column: Logo & Copyright */}
          <div className="md:col-span-4 lg:col-span-3">
            <Link href="/" className="flex items-center" prefetch={false}>
              <Mountain className="h-7 w-7 text-primary-foreground" />
              <span className="ml-2 text-xl font-bold tracking-tighter">Munu</span>
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/80">
              Your all-in-one financial platform for a better future.
            </p>
            <p className="mt-4 text-xs text-primary-foreground/60">
              © {new Date().getFullYear()} Munu Inc. All rights reserved.
            </p>
          </div>

          {/* Right Column: Navigation Link Groups */}
          <div className="grid grid-cols-2 gap-8 md:col-span-8 lg:col-span-9 lg:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground">
                Product
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <FooterLink href="/dashboard">Dashboard</FooterLink>
                <FooterLink href="/#fitur">Features</FooterLink>
                <FooterLink href="/#harga">Pricing</FooterLink>
                <FooterLink href="/integrasi">Integrations</FooterLink>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground">
                Resources
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <FooterLink href="/blog">Blog</FooterLink>
                <FooterLink href="/docs">Documentation</FooterLink>
                <FooterLink href="/faq">FAQ</FooterLink>
                <FooterLink href="/status">Status</FooterLink>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground">
                Company
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <FooterLink href="/#tentang">About Us</FooterLink>
                <FooterLink href="/karier">Careers</FooterLink>
                <FooterLink href="/pers">Press</FooterLink>
                <FooterLink href="/kontak">Contact</FooterLink>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground">
                Legal
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <FooterLink href="/syarat-ketentuan">Terms & Conditions</FooterLink>
                <FooterLink href="/kebijakan-privasi">Privacy Policy</FooterLink>
                <FooterLink href="/lisensi">Licenses</FooterLink>
              </ul>
            </div>
          </div>
        </div>

        {/* CHANGE 5: Adjust divider color */}
        <hr className="my-8 border-primary-foreground/20" />

        {/* Bottom Section: Copyright & Social Media */}
        <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-primary-foreground/80 sm:hidden">
            © {new Date().getFullYear()} Munu Inc.
          </p>
          <div className="flex items-center space-x-5">
            <Link href="https://x.com/riyadhulnst" target="_blank" rel="noreferrer" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-primary-foreground/80 transition-colors hover:text-primary-foreground" />
            </Link>
            <Link href="#" target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5 text-primary-foreground/80 transition-colors hover:text-primary-foreground" />
            </Link>
            <Link href="https://www.linkedin.com/in/404ryan/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-primary-foreground/80 transition-colors hover:text-primary-foreground" />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
