// src/components/MunuTestimonials.tsx

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

const testimonials = [
  {
    name: "Andini Lestari",
    handle: "Pemilik Kafe 'Senja'",
    avatar: "https://i.pravatar.cc/150?u=andini",
    content:
      "“Dulu pusing banget misahin keuangan kafe dan pribadi, cash flow sering macet. Sejak pakai MUNU, semua jadi terperinci di satu dashboard. Advisor-nya juga membantu saya membuat budget bisnis yang sehat. Sekarang saya bisa fokus mengembangkan usaha dengan tenang.”",
  },
  {
    name: "Chef Rendra",
    handle: "Executive Chef",
    avatar: "https://i.pravatar.cc/150?u=rendra",
    content:
      "“Gaji saya cukup besar, tapi entah kenapa selalu habis tak bersisa. MUNU membantu saya melacak pengeluaran dan membuat rencana investasi pertama saya. Melihat portofolio bertumbuh, saya jadi lebih optimis menatap masa depan finansial saya.”",
  },
  {
    name: "Grace Wijaya",
    handle: "Marketing Manager",
    avatar: "https://i.pravatar.cc/150?u=grace",
    content:
      "“Sebagai seorang profesional yang sibuk, saya tidak punya waktu untuk mengelola investasi secara mendalam. Proses onboarding MUNU sangat efisien. Kini, saya bisa memantau semua aset saya dan berkonsultasi dengan advisor kapan saja. Sangat praktis!”",
  },
  {
    name: "Budi Santoso",
    handle: "Pemilik Usaha Keluarga",
    avatar: "https://i.pravatar.cc/150?u=budi",
    content:
      "“Yang membuat saya tertarik adalah perencanaan jangka panjangnya. MUNU membantu saya merancang dana pendidikan untuk anak dan program pensiun. Rasanya lega sekali mengetahui bahwa masa depan keluarga saya sudah terjamin dan terencana dengan baik.”",
  },
  {
    name: "David",
    handle: "Project Manager",
    avatar: "https://i.pravatar.cc/150?u=david",
    content:
      "“Dulu saya takut untuk mulai investasi karena terlihat rumit. Advisor dari MUNU menjelaskan semuanya dengan sabar dan bahasa yang mudah dimengerti. Saya bisa mulai dengan modal kecil, dan sekarang investasi sudah menjadi kebiasaan rutin.”",
  },
  {
    name: "Pak Joko",
    handle: "Pensiunan",
    avatar: "https://i.pravatar.cc/150?u=joko",
    content:
      "“Meskipun saya tidak terlalu melek teknologi, aplikasi MUNU ternyata mudah sekali dipakai. Tampilannya sederhana. Saya jadi bisa mengelola dana pensiun saya sendiri tanpa perlu bantuan orang lain. Ternyata tidak serumit yang saya kira.”",
  },
];

export function MunuTestimonials() {
  return (
    <section className="w-full bg-background py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Judul Section */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl italic text-primary">Suara Mereka</h2>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mt-2">
            Apa Kata Pengguna <span className="text-primary">MUNU</span>
          </h1>
        </div>

        {/* Grid Testimoni */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.handle}
              className="break-inside-avoid bg-card border-border border shadow-sm transition-colors"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.avatar}
                    alt={`Avatar ${testimonial.name}`}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{testimonial.handle}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
