"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Notification03Icon,
  SunIconFreeIcons,
  Moon01FreeIcons,
  CreditCardFreeIcons,
  Home01FreeIcons,
  PlusSignIcon,
  QuestionFreeIcons,
  Wrench01FreeIcons,
  User02Icon,
  Setting06FreeIcons,
  Logout01FreeIcons,
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
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

export function DashboardNavbar() {
  const { setTheme } = useTheme();

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-background min-h-[64px]">
      {/* Left: Brand / Menu */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <HugeiconsIcon icon={Home01FreeIcons} className="w-5 h-5 stroke-[1.5]" />
        </Button>
        <span className="text-lg font-semibold hidden md:block">MUNU</span>
      </div>

      {/* Right: Action Items */}
      <div className="flex items-center gap-3">
        {/* Quick Action */}
        <Button size="sm" className="hidden md:flex gap-2">
          <HugeiconsIcon icon={PlusSignIcon} className="w-5 h-5 stroke-[1.5]" />
          Tambah Transaksi
        </Button>

        {/* Help */}
        <Button variant="ghost" size="icon">
          <HugeiconsIcon icon={QuestionFreeIcons} className="w-5 h-5 stroke-[1.5]" />
        </Button>

        {/* Notification */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <HugeiconsIcon icon={Notification03Icon} className="w-5 h-5 stroke-[1.5]" />
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
            <Avatar className="cursor-pointer w-9 h-9">
              <AvatarImage src="https://placehold.co/100x100/E2E8F0/4A5568?text=RY" alt="User" />
              <AvatarFallback>RY</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <HugeiconsIcon icon={User02Icon} className="w-4 h-4 mr-2 stroke-[1.5]" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon icon={CreditCardFreeIcons} className="w-4 h-4 mr-2 stroke-[1.5]" />
              <span>Plan</span>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <HugeiconsIcon icon={Wrench01FreeIcons} className="w-4 h-4 mr-2 stroke-[1.5]" />
                <span>Settings</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuLabel>Theme</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <HugeiconsIcon icon={SunIconFreeIcons} className="w-4 h-4 mr-2 stroke-[1.5]" />
                    <span>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <HugeiconsIcon icon={Moon01FreeIcons} className="w-4 h-4 mr-2 stroke-[1.5]" />
                    <span>Dark</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <HugeiconsIcon icon={Setting06FreeIcons} className="w-4 h-4 mr-2 stroke-[1.5]" />
                    <span>System</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-50">
              <HugeiconsIcon icon={Logout01FreeIcons} className="w-4 h-4 mr-2 stroke-[1.5]" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
