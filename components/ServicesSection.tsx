// components/sections/services-section.tsx (versi bersih)

"use client"; // Diperlukan jika ada hook, aman untuk tetap ada

import {
  LineChart,
  Target,
  Wallet,
  PieChart,
  Link2,
  GraduationCap,
} from "lucide-react";
import { ServiceCard } from "./ServiceCard"; // Impor komponen baru

// Tipe dan daftar layanan tetap sama
interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
}

const servicesList: Service[] = [
    {
        icon: Wallet,
        title: "Pelacakan Pengeluaran",
        description: "Catat setiap pemasukan dan pengeluaran Anda dengan mudah untuk melihat ke mana uang Anda pergi.",
    },
    {
        icon: Target,
        title: "Perencanaan Anggaran",
        description: "Buat anggaran bulanan yang realistis dan patuhi untuk mencapai stabilitas finansial.",
    },
    {
        icon: LineChart,
        title: "Tujuan Finansial",
        description: "Tetapkan tujuan finansial jangka pendek dan panjang, lalu lacak progres Anda secara visual.",
    },
    {
        icon: PieChart,
        title: "Laporan Keuangan Detail",
        description: "Dapatkan wawasan mendalam melalui laporan pengeluaran, pemasukan, dan arus kas yang komprehensif.",
    },
    {
        icon: Link2,
        title: "Sinkronisasi Akun",
        description: "Hubungkan akun bank Anda dengan aman untuk otomatisasi pencatatan transaksi.",
    },
    {
        icon: GraduationCap,
        title: "Edukasi Finansial",
        description: "Tingkatkan literasi keuangan Anda dengan artikel dan tips praktis langsung di aplikasi.",
    },
];

export function ServicesSection() {
  return (
    <section id="layanan" className="w-full py-12 px-8 md:px-0 md:py-24 lg:py-32 bg-muted/40 dark:bg-gray-900/60">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        {/* Judul Bagian (Tidak perlu animasi di sini lagi) */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700 dark:bg-green-900/70 dark:text-green-300">
            Layanan Unggulan
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Semua yang Anda Butuhkan untuk Keuangan Lebih Baik
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Munu menyediakan berbagai fitur canggih yang dirancang untuk memberdayakan Anda dalam mengelola keuangan pribadi secara efektif dan efisien.
          </p>
        </div>

        {/* Cukup map dan render komponen ServiceCard */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {servicesList.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}