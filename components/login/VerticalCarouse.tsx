"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

export default function VerticalCarouselCard() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const current = messages[index]

  return (
    <div className="absolute inset-0 flex items-center justify-center px-6 overflow-hidden bg-primary text-primary-foreground dark:bg-primary">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md md:max-w-lg lg:max-w-xl"
        >
          <Card className="rounded-2xl border border-border bg-white dark:bg-muted shadow-md">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span>MUNU Insight</span>
              </div>

              <motion.div
                className="flex flex-wrap justify-center text-center text-2xl font-bold text-foreground leading-snug gap-x-1"
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {current.title.split(" ").map((word, idx) => (
                  <motion.span
                    key={idx}
                    className="inline-block"
                    variants={wordVariants}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>

              <p className="text-center text-sm md:text-base text-muted-foreground leading-relaxed">
                {current.description}
              </p>

              <div className="text-xs text-muted-foreground text-center pt-2">
                Updated just now
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
