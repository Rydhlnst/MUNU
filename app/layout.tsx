import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Chivo_Mono, Plus_Jakarta_Sans, DM_Sans, Inter } from "next/font/google";
import { auth } from "@/auth";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { FeedbackWidget } from "@/components/FeedbackWidget";


export const metadata: Metadata = {
  
  title: {
    default: "MUNU – Manajemen Keuangan Pribadi & Investasi",
    template: "%s | MUNU",
  },
  description: "Aplikasi keuangan pribadi modern berbasis web untuk pelacakan pengeluaran, perencanaan anggaran, dan eksekusi strategi investasi & trading.",
  keywords: ["manajemen keuangan", "personal finance", "investasi", "crypto", "budgeting", "AI financial advisor", "delta neutral trading"],
  metadataBase: new URL("https://munu.finance"),
  openGraph: {
    title: "MUNU – Kontrol Uangmu Lebih Pintar",
    description: "Kelola keuangan pribadi & investasi dengan AI. Pelacak pengeluaran, anggaran, dan trading netral dalam satu dashboard.",
    url: "https://munu.finance",
    siteName: "MUNU",
    images: [
      {
        url: "/og-cover.png", 
        width: 1200,
        height: 630,
        alt: "MUNU Web Preview",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MUNU – Kontrol Uangmu Lebih Pintar",
    description: "Dashboard AI-powered keuangan & investasi. Praktis, modern, cerdas.",
    images: ["/og-cover.png"],
    creator: "@akunmunu", 
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const chivoMono = Chivo_Mono({
  subsets: ["latin"],
  variable: "--font-chivo-mono",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
    const session = await auth();
  return (
     <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        
        <body className={cn("font-sans", chivoMono.variable, dmSans.variable, plusJakarta.variable, inter.variable)} suppressHydrationWarning>
          <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
            <FeedbackWidget/>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
