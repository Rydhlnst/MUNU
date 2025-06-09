// src/components/MunuCommunity.tsx

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { DiscordFreeIcons } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const faqs = [
  {
    question: "Apa itu MUNU?",
    answer:
      "MUNU adalah partner digital Anda untuk industri F&B. Kami membantu Anda membuat menu digital interaktif dalam hitungan detik, mempublikasikannya dengan satu klik, dan mengelola pembaruan secara otomatis—tanpa perlu coding sama sekali.",
  },
  {
    question: "Apakah saya bisa mencoba MUNU secara gratis?",
    answer:
      "Tentu saja! MUNU menawarkan paket gratis yang memungkinkan Anda merasakan fitur-fitur dasar kami. Untuk fungsionalitas yang lebih canggih, kami memiliki paket berbayar yang terjangkau untuk mengembangkan bisnis Anda.",
  },
  {
    question: "Mengapa bisnis F&B saya memerlukan menu digital?",
    answer:
      "Menu digital mengurangi biaya cetak, memudahkan pembaruan promo atau harga, memberikan pengalaman modern bagi pelanggan, dan memungkinkan integrasi dengan sistem pemesanan online untuk efisiensi yang lebih tinggi.",
  },
  {
    question: "Bagaimana cara membuat menu digital dengan MUNU?",
    answer:
      "Sangat mudah! Cukup daftar, pilih template yang Anda suka, masukkan informasi menu dan hidangan Anda, lalu publikasikan. Seluruh proses dirancang agar cepat dan intuitif, bahkan untuk pemula.",
  },
  {
    question: "Apakah saya perlu keahlian teknis untuk menggunakan MUNU?",
    answer:
      "Tidak sama sekali. Platform MUNU dirancang untuk semua orang. Jika Anda bisa menggunakan media sosial, Anda pasti bisa menggunakan MUNU untuk membuat menu digital yang profesional.",
  },
]

export function MunuCommunity() {
  return (
    <section className="w-full bg-background py-20 px-4 md:px-8 lg:px-16 min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Kolom Kiri: Judul dan Tombol CTA */}
        <div className="flex flex-col space-y-6">
          <h2 className="font-serif text-2xl italic text-primary">Komunitas</h2>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
            Bantuan apapun yang Anda butuhkan, kami siap membantu
          </h1>
          <p className="text-muted-foreground text-lg">
            Bergabunglah dengan komunitas para pemilik restoran, manajer, dan pegiat F&B lainnya untuk berbagi tips dan mendapatkan dukungan.
          </p>
          <div>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <HugeiconsIcon icon={DiscordFreeIcons} className="mr-2 h-5 w-5" />
              Gabung Discord
            </Button>
          </div>
        </div>

        {/* Kolom Kanan: FAQ dengan Accordion */}
        <div className="w-full">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg text-left font-medium text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
