"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";
import { signInWithGoogle } from "@/lib/actions";
import Image from "next/image";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-full sm:w-full p-0">
        <nav className="flex flex-col gap-6 text-lg font-medium px-6 py-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold"
            onClick={() => setIsOpen(false)}
          >
            <Image src={"/Gunung2Hijau.svg"} alt="icon" width={32} height={32}/>
            <span className="tracking-tighter">Munu</span>
          </Link>

          <Link
            href="/products"
            className="text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>

          <Link
            href="/features"
            className="text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setIsOpen(false)}
          >
            Features
          </Link>

          <Link
            href="/pricing"
            className="text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </Link>

          <Link
            href="/our-mission"
            className="text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setIsOpen(false)}
          >
            Our Mission
          </Link>

          <Button onClick={signInWithGoogle} className="mt-6 w-full">
            Join Waitlist
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
