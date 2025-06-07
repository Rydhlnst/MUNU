"use client";

import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BarChart2,
  Bitcoin,
  FileCode,
  Calculator,
  Sparkles,
  Gift,
  Shield,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Droplets,
  Wallet,
  Search,
  History,
  Repeat,
  Lock,
  Landmark,
  Building2,
  LucideIcon,
} from "lucide-react";

// --- Tipe Props ---
interface NavItemProps {
  icon: LucideIcon;
  children: React.ReactNode;
  itemName: string;
  activeItem: string;
  setActiveItem: React.Dispatch<React.SetStateAction<string>>;
  isSubItem?: boolean;
}

interface CollapsibleIconProps {
  open: boolean;
}

// --- Komponen ---
const NavItem = ({
  icon: Icon,
  children,
  itemName,
  activeItem,
  setActiveItem,
  isSubItem = false,
}: NavItemProps) => {
  const isActive = activeItem === itemName;

  return (
    <Button
      variant="ghost"
      onClick={() => setActiveItem(itemName)}
      className={cn(
        "w-full justify-start font-normal text-sm h-9",
        isSubItem && "pl-11",
        isActive &&
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
      )}
    >
      <Icon className={cn("mr-3 h-4 w-4", isActive && "text-primary-foreground")} />
      {children}
    </Button>
  );
};

const CollapsibleIcon = ({ open }: CollapsibleIconProps) =>
  open ? (
    <ChevronDown size={16} className="text-muted-foreground" />
  ) : (
    <ChevronRight size={16} className="text-muted-foreground" />
  );

// --- Sidebar utama ---
export function Sidebar() {
  const [openSections, setOpenSections] = useState<{
    saham: boolean;
    crypto: boolean;
    bonds: boolean;
  }>({
    saham: true,
    crypto: false,
    bonds: false,
  });

  const [activeItem, setActiveItem] = useState<string>("Dashboard");

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside className="h-full w-64 flex flex-col border-r pt-3 bg-background">
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          <NavItem
            icon={LayoutDashboard}
            itemName="Dashboard"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          >
            Dashboard
          </NavItem>

          {/* Saham */}
          <Collapsible onOpenChange={() => toggleSection("saham")} open={openSections.saham}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full flex justify-between items-center font-normal text-sm h-9"
              >
                <div className="flex items-center">
                  <BarChart2 size={16} className="mr-3" />
                  Saham
                </div>
                <CollapsibleIcon open={openSections.saham} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 pt-1">
              <NavItem icon={Wallet} itemName="Portofolio Saham" activeItem={activeItem} setActiveItem={setActiveItem} isSubItem>
                Portofolio
              </NavItem>
              <NavItem icon={Search} itemName="Analisis Pasar" activeItem={activeItem} setActiveItem={setActiveItem} isSubItem>
                Analisis Pasar
              </NavItem>
              <NavItem icon={History} itemName="Riwayat Saham" activeItem={activeItem} setActiveItem={setActiveItem} isSubItem>
                Riwayat Transaksi
              </NavItem>
            </CollapsibleContent>
          </Collapsible>

          {/* Crypto */}
          <Collapsible onOpenChange={() => toggleSection("crypto")} open={openSections.crypto}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full flex justify-between items-center font-normal text-sm h-9"
              >
                <div className="flex items-center">
                  <Bitcoin size={16} className="mr-3" />
                  Crypto
                </div>
                <CollapsibleIcon open={openSections.crypto} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 pt-1">
              <NavItem icon={Repeat} itemName="Trading Crypto" activeItem={activeItem} setActiveItem={setActiveItem} isSubItem>
                Trading
              </NavItem>
              <NavItem icon={Lock} itemName="Staking Crypto" activeItem={activeItem} setActiveItem={setActiveItem} isSubItem>
                Staking
              </NavItem>
              <NavItem icon={Droplets} itemName="Liquidity Provider" activeItem={activeItem} setActiveItem={setActiveItem} isSubItem>
                Liquidity Provider
              </NavItem>
            </CollapsibleContent>
          </Collapsible>

          {/* Bonds */}
          <Collapsible onOpenChange={() => toggleSection("bonds")} open={openSections.bonds}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full flex justify-between items-center font-normal text-sm h-9"
              >
                <div className="flex items-center">
                  <FileCode size={16} className="mr-3" />
                  Bonds
                </div>
                <CollapsibleIcon open={openSections.bonds} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 pt-1">
              <NavItem icon={Landmark} itemName="Obligasi Pemerintah" activeItem={activeItem} setActiveItem={setActiveItem} isSubItem>
                Pemerintah
              </NavItem>
              <NavItem icon={Building2} itemName="Obligasi Korporasi" activeItem={activeItem} setActiveItem={setActiveItem} isSubItem>
                Korporasi
              </NavItem>
            </CollapsibleContent>
          </Collapsible>

          <Separator className="my-2" />
          <NavItem icon={Calculator} itemName="Simulasi" activeItem={activeItem} setActiveItem={setActiveItem}>
            Simulasi Investasi
          </NavItem>
          <NavItem icon={Sparkles} itemName="Features" activeItem={activeItem} setActiveItem={setActiveItem}>
            Ongoing Feature
          </NavItem>
        </div>
      </ScrollArea>

      <div className="p-2 border-t">
        <div className="p-2 space-y-1">
          <h3 className="px-2 text-xs font-semibold text-muted-foreground tracking-wider mb-2">
            What&apos;s New
          </h3>
          <NavItem icon={Gift} itemName="Fitur Baru" activeItem={activeItem} setActiveItem={setActiveItem}>
            Fitur Baru Kami
          </NavItem>
          <NavItem icon={Shield} itemName="2FA" activeItem={activeItem} setActiveItem={setActiveItem}>
            Keamanan 2FA
          </NavItem>
          <NavItem icon={BarChart3} itemName="Reporting" activeItem={activeItem} setActiveItem={setActiveItem}>
            Reporting
          </NavItem>
        </div>
      </div>
    </aside>
  );
}
