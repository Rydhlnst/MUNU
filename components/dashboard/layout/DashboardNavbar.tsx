"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Notification03Icon,
  SunIconFreeIcons,
  Moon01FreeIcons,
  UserCircle02Icon,
  CreditCardFreeIcons,
  Home01FreeIcons,
  PlusSignIcon,
  QuestionFreeIcons,
  ArrowRight01Icon,
  Wrench01FreeIcons,

} from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

export function DashboardNavbar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-background min-h-[64px]">
      {/* Left: Brand / Menu */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <HugeiconsIcon icon={Home01FreeIcons} size={20} strokeWidth={1.5} />
        </Button>
        <span className="text-lg font-semibold hidden md:block">MUNU</span>
      </div>

      {/* Middle: Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <Input placeholder="Cari aset, transaksi, fitur..." className="text-sm" />
      </div>

      {/* Right: Action Items */}
      <div className="flex items-center gap-3">
        {/* Quick Action */}
        <Button size="sm" className="hidden md:flex gap-2">
          <HugeiconsIcon icon={PlusSignIcon} size={18} strokeWidth={1.5} /> Tambah Transaksi
        </Button>

        {/* Theme Switch */}
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          <HugeiconsIcon icon={darkMode ? SunIconFreeIcons : Moon01FreeIcons} size={20} strokeWidth={1.5} />
        </Button>

        {/* Help */}
        <Button variant="ghost" size="icon">
          <HugeiconsIcon icon={QuestionFreeIcons} size={20} strokeWidth={1.5} />
        </Button>

        {/* Notification */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <HugeiconsIcon icon={Notification03Icon} size={20} strokeWidth={1.5} />
              <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-red-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64" align="end">
            <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Kenaikan harga saham ABC 5%</DropdownMenuItem>
            <DropdownMenuItem>Transaksi kripto berhasil</DropdownMenuItem>
            <DropdownMenuItem>Pembaruan fitur baru</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer w-8 h-8">
              <AvatarImage src="/avatars/riyan.jpg" alt="User" />
              <AvatarFallback>RY</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center gap-2">
                <HugeiconsIcon icon={UserCircle02Icon} size={18} strokeWidth={1.5} /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/plan" className="flex items-center gap-2">
                <HugeiconsIcon icon={CreditCardFreeIcons} size={18} strokeWidth={1.5} /> Plan
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center gap-2">
                <HugeiconsIcon icon={Wrench01FreeIcons} size={18} strokeWidth={1.5} /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <button className="w-full flex items-center gap-2 text-red-500">
                <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={1.5} /> Logout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}