import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: {
    default: "MUNU – Manajemen Keuangan Pribadi & Investasi",
    template: "%s | MUNU",
  },
  description: "Aplikasi keuangan pribadi modern berbasis web untuk pelacakan pengeluaran, perencanaan anggaran, dan eksekusi strategi investasi & trading.",
  keywords: ["manajemen keuangan", "personal finance", "investasi", "crypto", "budgeting", "AI financial advisor", "delta neutral trading"],
  metadataBase: new URL("https://munu.id"), // ganti sesuai domain final
  openGraph: {
    title: "MUNU – Kontrol Uangmu Lebih Pintar",
    description: "Kelola keuangan pribadi & investasi dengan AI. Pelacak pengeluaran, anggaran, dan trading netral dalam satu dashboard.",
    url: "https://munu.id",
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
    icon: "/favicon.ico",
  },
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await auth(); // Ambil sesi di server
  return (
     <SessionProvider session={session}>
      <html lang="en">
        <body>
          {/* Navbar Anda akan ada di suatu tempat di sini atau di dalam children */}
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
