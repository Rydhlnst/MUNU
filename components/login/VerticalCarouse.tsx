"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen } from "lucide-react"

const messages = [
  {
    title: "Kelola Keuangan Lebih Cerdas",
    description: "Atur pengeluaran dan pemasukan Anda dengan lebih terstruktur melalui dashboard pintar.",
  },
  {
    title: "Pantau Investasi Real-Time",
    description: "Lihat performa portofolio saham, crypto, dan aset lainnya kapan saja.",
  },
  {
    title: "AI Advisor Siap Membantu",
    description: "Dapatkan rekomendasi finansial otomatis dari AI sesuai tujuan keuangan Anda.",
  },
  {
    title: "Sinkronisasi dengan Visa/MasterCard",
    description: "Otomatisasi pencatatan transaksi dari kartu Anda tanpa repot input manual.",
  },
]

export default function VerticalCarouselCard() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLDivElement>(".carousel-item") as HTMLDivElement[]
      let index = 0

      const loop = () => {
        const current = items[index]
        const nextIndex = (index + 1) % items.length
        const next = items[nextIndex]

        const currentWords = current.querySelectorAll(".word")
        gsap.to(currentWords, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          stagger: 0.05,
          onComplete: () => {
            gsap.set(current, { y: "100%", opacity: 0 })
            gsap.set(next, { y: "100%", opacity: 0 })

            const nextWords = next.querySelectorAll(".word")
            gsap.to(next, { y: "0%", opacity: 1, duration: 0.5 })
            gsap.fromTo(
              nextWords,
              { opacity: 0, y: 10 },
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.05,
                delay: 0.1,
              }
            )
          },
        })

        index = nextIndex
      }

      const interval = setInterval(loop, 3000)
      return () => clearInterval(interval)
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center px-6 overflow-hidden bg-primary text-primary-foreground dark:bg-primary"
    >
      {messages.map((msg, i) => (
        <Card
          key={i}
          className={`carousel-item absolute w-full max-w-md md:max-w-lg lg:max-w-xl rounded-2xl border border-border bg-white dark:bg-muted shadow-md transition-all duration-500 ${
            i === 0 ? "opacity-100" : "opacity-0"
          }`}
        >
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <BookOpen className="w-4 h-4" />
              <span>MUNU Insight</span>
            </div>

            <div className="flex flex-wrap justify-center text-center text-2xl font-bold text-foreground leading-snug gap-x-1">
              {msg.title.split(" ").map((word, idx) => (
                <span key={idx} className="word inline-block">
                  {word}
                </span>
              ))}
            </div>

            <p className="text-center text-sm md:text-base text-muted-foreground leading-relaxed">
              {msg.description}
            </p>

            <div className="text-xs text-muted-foreground text-center pt-2">
              Updated just now
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
