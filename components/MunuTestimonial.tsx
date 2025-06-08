// src/components/MunuTestimonials.tsx

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image" // Gunakan Image dari Next.js untuk optimasi

// Data testimoni fiktif untuk MUNU
const testimonials = [
  {
    name: "Andini Lestari",
    handle: "Pemilik Kafe 'Senja'",
    avatar: "https://i.pravatar.cc/150?u=andini",
    content:
      "“Dulu pusing kalau mau update menu atau harga, harus cetak ulang terus. Sejak pakai MUNU, semua jadi instan! Cukup edit dari HP, menu di meja pelanggan langsung ter-update. Hemat biaya dan waktu banget.”",
  },
  {
    name: "Chef Rendra",
    handle: "Executive Chef",
    avatar: "https://i.pravatar.cc/150?u=rendra",
    content:
      "“Saya suka sekali bagaimana MUNU bisa menampilkan foto hidangan dengan sangat menarik. Setiap kali saya membuat menu spesial baru, saya bisa langsung menambahkannya ke menu digital lengkap dengan foto berkualitas tinggi. Respon pelanggan luar biasa!”",
  },
  {
    name: "Grace Wijaya",
    handle: "Manajer 'Urban Eatery'",
    avatar: "https://i.pravatar.cc/150?u=grace",
    content:
      "“Proses onboarding MUNU sangat mulus dan intuitif. Panduan awalnya jelas, membuat saya bisa menyiapkan dasar-dasar menu tanpa perlu skill teknis. Cocok untuk bisnis F&B yang ingin cepat go digital.”",
  },
  {
    name: "Budi Santoso",
    handle: "Pemilik Restoran Keluarga",
    avatar: "https://i.pravatar.cc/150?u=budi",
    content:
      "“Yang membuat saya tertarik adalah kemandiriannya. Saya bisa membuat dan mengedit semuanya sendiri tanpa bergantung pada programmer. Artinya, tidak ada biaya tambahan tak terduga, baik dari segi uang maupun waktu.”",
  },
  {
    name: "David",
    handle: "Manajer Bar",
    avatar: "https://i.pravatar.cc/150?u=david",
    content:
      "“Dengan MUNU, promosi happy hour jadi jauh lebih mudah. Kami bisa mengatur menu spesial untuk jam-jam tertentu dan pelanggan bisa langsung melihatnya. Sistemnya simpel, cepat, dan sangat efektif untuk meningkatkan penjualan.”",
  },
  {
    name: "Pak Joko",
    handle: "Warung Sederhana",
    avatar: "https://i.pravatar.cc/150?u=joko",
    content:
      "“Meskipun saya tidak terlalu paham teknologi, MUNU ternyata gampang dipakai. Tampilannya sederhana dan lurus ke intinya. Pas sekali untuk warung saya yang ingin terlihat lebih modern tanpa ribet.”",
  },
]

export function MunuTestimonials() {
  return (
    <section className="w-full bg-white py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Judul Section */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl italic text-primary">
            Suara Mereka
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 mt-2">
            Apa Kata Pengguna <span className="text-primary">MUNU</span>
          </h1>
        </div>

        {/* Grid Testimoni (Masonry Layout) */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.handle}
              className="break-inside-avoid bg-secondary shadow-sm"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  {/* Ganti src dengan URL gambar asli Anda */}
                  <Image
                    src={testimonial.avatar}
                    alt={`Avatar ${testimonial.name}`}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500">{testimonial.handle}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}