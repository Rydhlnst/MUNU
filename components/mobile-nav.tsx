import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, Mountain } from "lucide-react";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Buka Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-full sm:w-full p-0">
        <nav className="flex flex-col gap-6 text-lg font-medium px-6 py-10">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
            onClick={() => setIsOpen(false)}
          >
            <Mountain className="h-6 w-6 text-green-600" />
            <span className="tracking-tighter">Munu</span>
          </Link>

          <Link
            href="/fitur"
            className="text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setIsOpen(false)}
          >
            Fitur
          </Link>
          <Link
            href="/harga"
            className="text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setIsOpen(false)}
          >
            Harga
          </Link>
          <Link
            href="/tentang"
            className="text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setIsOpen(false)}
          >
            Tentang Kami
          </Link>

          <Button
            onClick={() => setIsOpen(false)}
            className="mt-6 w-full"
          >
            Masuk
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
