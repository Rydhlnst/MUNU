"use client";

import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, Bot, User } from "lucide-react";
// import { gsap } from "gsap"; // DIHAPUS: Impor ini menyebabkan error build
import { cn } from "@/lib/utils"; // Pastikan path ini benar

// Data percakapan
const messages = [
  { from: "ai", text: "Halo! Mau atur budget bulan ini?" },
  { from: "user", text: "Ya dong! Saya ingin hemat 1 juta!" },
  { from: "ai", text: "Siap! Kita mulai dari pengeluaran rutin ya!" },
];

// Komponen untuk Bubble Chat
const ChatBubble = React.forwardRef<
  HTMLDivElement,
  { msg: (typeof messages)[0]; className?: string }
>(({ msg, className }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-end gap-3 max-w-sm opacity-0",
      msg.from === "user" ? "self-end flex-row-reverse" : "self-start",
      className
    )}
  >
    <div
      className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white",
        msg.from === 'ai' ? 'bg-green-500' : 'bg-indigo-500'
      )}
    >
      {msg.from === 'ai' ? <Bot size={20} /> : <User size={20} />}
    </div>
    <div
      className={cn(
        "px-4 py-3 rounded-2xl relative",
        msg.from === "ai"
          ? "bg-slate-700 text-white rounded-bl-none"
          : "bg-white text-gray-800 rounded-br-none"
      )}
    >
      <p>{msg.text}</p>
    </div>
  </div>
));
ChatBubble.displayName = 'ChatBubble';

// Komponen untuk Indikator Mengetik
const TypingIndicator = React.forwardRef<HTMLDivElement, {}>((props, ref) => (
  <div ref={ref} className="flex items-center gap-1.5 opacity-0 self-start ml-11">
    <div className="dot w-2 h-2 bg-slate-500 rounded-full"></div>
    <div className="dot w-2 h-2 bg-slate-500 rounded-full"></div>
    <div className="dot w-2 h-2 bg-slate-500 rounded-full"></div>
  </div>
));
TypingIndicator.displayName = 'TypingIndicator';

// Komponen Utama
export default function AssistantChat() {
  const containerRef = useRef<HTMLDivElement>(null);
  const typingIndicatorRef = useRef<HTMLDivElement>(null);
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // DIPERBAIKI: Akses GSAP dari object window
    const gsap = window.gsap;
    if (!gsap) {
        console.error("GSAP tidak ditemukan. Pastikan sudah dimuat via CDN.");
        return;
    }
    
    // Konteks GSAP untuk cleanup otomatis
    const ctx = gsap.context(() => {
      // Animasi untuk titik-titik pada typing indicator
      gsap.to(".dot", {
        y: -5,
        duration: 0.4,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.2
      });

      // Membuat timeline utama untuk mengontrol urutan chat
      const tl = gsap.timeline({
        repeat: -1, // Ulangi seluruh timeline selamanya
        repeatDelay: 3, // Jeda 3 detik sebelum mengulang
        onRepeat: () => {
          // Sembunyikan semua pesan sebelum restart untuk animasi yang bersih
          // onRepeat lebih baik dari onComplete untuk looping yang mulus
          gsap.set(".chat-bubble", { opacity: 0, y: 20 });
          gsap.set(typingIndicatorRef.current, { opacity: 0 });
        }
      });

      // Mengambil semua elemen bubble chat
      const bubbles = gsap.utils.toArray<HTMLDivElement>(".chat-bubble");
      
      // Loop melalui pesan untuk membangun timeline
      messages.forEach((msg, index) => {
        if (msg.from === 'user') {
          tl.to(bubbles[index], {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
          }, "+=0.5"); // Tunda 0.5 detik dari animasi sebelumnya
        } else {
          // Jika AI yang bicara, tampilkan typing indicator dulu
          tl.to(typingIndicatorRef.current, { opacity: 1, duration: 0.3 }, "+=1") // Tampilkan typing indicator
            .to(typingIndicatorRef.current, { opacity: 0, duration: 0.3 }, "+=1.5") // Sembunyikan setelah 1.5 detik
            .to(bubbles[index], { // Tampilkan pesan AI
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out"
            }, "-=0.2"); // Muncul sedikit lebih cepat setelah typing hilang
        }
      });

      setTimeline(tl);

    }, containerRef); // Scope context ke container utama

    return () => ctx.revert(); // Cleanup saat komponen unmount
  }, []);

  return (
    <div ref={containerRef} className="h-full flex flex-col justify-center items-start px-8 py-12 text-white bg-gray-800 rounded-lg shadow-2xl">
      <div className="mb-6 flex items-center gap-3 text-xl font-semibold self-center">
        <MessageCircle className="w-7 h-7 text-green-400" />
        <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          Munu Assistant
        </span>
      </div>
      <div className="space-y-4 w-full max-w-sm flex flex-col">
        {messages.map((msg, i) => (
          // Tambahkan class agar bisa ditarget oleh GSAP
          <ChatBubble key={i} msg={msg} className="chat-bubble" />
        ))}
        {/* Placeholder untuk Typing Indicator */}
        <TypingIndicator ref={typingIndicatorRef} />
      </div>
    </div>
  );
}
