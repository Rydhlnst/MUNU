// components/nav-item.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils"; // Fungsi utilitas dari shadcn
import { Button } from "@/components/ui/button";

// 1. Tambahkan `className` sebagai prop opsional
interface NavItemProps {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
  isSubItem?: boolean;
  className?: string; // <-- DITAMBAHKAN
}

export function NavItem({
  href,
  icon: Icon,
  children,
  isSubItem = false,
  className, // <-- DITAMBAHKAN
}: NavItemProps) {
  const path = usePathname();
  const isActive = path === href;

  return (
    <Link href={href} passHref>
      <Button
        variant={isActive ? "default" : "ghost"}
        // 2. Gabungkan className dari props ke dalam `cn()`
        className={cn(
          "w-full justify-start font-normal h-9",
          isSubItem && "pl-8", // Beri indentasi jika ini sub-item
          className // <-- DITAMBAHKAN
        )}
      >
        <Icon size={16} className="mr-3" />
        {children}
      </Button>
    </Link>
  );
}