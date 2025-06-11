// config/sidebar-links.ts

import {
  LayoutDashboard, BarChart2, Wallet, Search, History, Bitcoin, Repeat, Lock, Droplets, Calculator, Sparkles, Gift, Shield, BarChart3,
  LucideIcon
} from "lucide-react";

export type NavItemType = {
  type?: "item";
  title: string;
  href: string;
  icon: LucideIcon;
  isSubItem?: boolean;
};

export type SectionType = {
  title: string;
  type?: "section";
  icon: LucideIcon
  subItems: NavItemType[];
};

export type SeparatorType = {
  type: "separator"
}

// Definisikan semua link Anda di sini
export const sidebarConfig: (NavItemType | SectionType | SeparatorType)[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    title: "Saham",
    icon: BarChart2,
    subItems: [
      { title: "Portofolio", href: "/dashboard/saham/portofolio", icon: Wallet, isSubItem: true },
      { title: "Analisis Pasar", href: "/dashboard/saham/analisis", icon: Search, isSubItem: true },
      { title: "Riwayat Transaksi", href: "/dashboard/saham/riwayat", icon: History, isSubItem: true },
    ],
  },
  {
    title: "Crypto",
    icon: Bitcoin,
    subItems: [
      { title: "Trading", href: "/dashboard/crypto/trading", icon: Repeat, isSubItem: true },
      { title: "Staking", href: "/dashboard/crypto/staking", icon: Lock, isSubItem: true },
      { title: "Liquidity Provider", href: "/dashboard/crypto/lp", icon: Droplets, isSubItem: true },
    ],
  },
  {
    title: "Bonds",
    icon: BarChart2,
    subItems: [
      { title: "Portofolio", href: "/dashboard/saham/portofolio", icon: Wallet, isSubItem: true },
      { title: "Analisis Pasar", href: "/dashboard/saham/analisis", icon: Search, isSubItem: true },
      { title: "Riwayat Transaksi", href: "/dashboard/saham/riwayat", icon: History, isSubItem: true },
    ],
  },
  {type: "separator"},

  { title: "Simulasi", href: "/dashboard/simulation", icon: Calculator },
  { title: "Features", href: "/dashboard/ongoing-feature", icon: Sparkles },
];

export const whatsNewConfig: NavItemType[] = [
    { title: "Fitur Baru Kami", href: "/whats-new/fitur-baru", icon: Gift },
    { title: "Keamanan 2FA", href: "/whats-new/2fa", icon: Shield },
    { title: "Reporting", href: "/whats-new/reporting", icon: BarChart3 },
]