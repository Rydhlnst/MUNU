// components/interactive-dashboard.tsx

"use client";

import { useLayoutEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Wallet } from "lucide-react";
import { gsap } from "gsap";

export function InteractiveDashboardMockup() {
  const component = useRef(null); // Ref untuk scope GSAP context

  // Gunakan useLayoutEffect untuk animasi agar tidak ada 'flickering'
  useLayoutEffect(() => {
    // gsap.context() adalah cara modern dan aman untuk menggunakan GSAP di React
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({ delay: 0.5 });

      // Animasi 1: Count-up untuk saldo
      const counter = { val: 0 };
      const balanceEl = document.querySelector("#balance-amount"); // Gunakan ID untuk target
      
      tl.to(counter, {
        val: 17298.92,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          // Format angka dengan koma dan 2 desimal
          balanceEl!.textContent = counter.val.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        },
      });

      // Animasi 2: Grafik batang tumbuh
      tl.fromTo(".chart-bar", 
        { scaleY: 0, transformOrigin: 'bottom' }, 
        { scaleY: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
        "-=1.5" // Mulai animasi ini 1.5s sebelum animasi sebelumnya selesai
      );

      // Animasi 3: Daftar transaksi muncul
      tl.from(".transaction-item", 
        { y: 20, opacity: 0, stagger: 0.2, duration: 0.5 },
        "-=0.5"
      );

    }, component); // Scope animasi ke dalam komponen ini

    return () => ctx.revert(); // Cleanup GSAP animations on unmount
  }, []);

  const barHeights = [0.4, 0.6, 0.3, 0.8, 0.5, 0.7];

  return (
    <Card ref={component} className="w-full max-w-md mx-auto shadow-2xl bg-card/80 backdrop-blur-sm overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-muted-foreground font-normal">
          <Wallet size={18} /> Total Saldo
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <h2 className="text-4xl font-bold tracking-tight mb-4">
          <span className="text-muted-foreground">$</span>
          {/* Beri ID agar mudah ditarget oleh GSAP */}
          <span id="balance-amount">0.00</span>
        </h2>

        <div className="h-24 w-full flex items-end gap-2 border-b pb-2 mb-4">
          {barHeights.map((height, i) => (
            <div key={i} className="w-full" style={{ height: `${height * 100}%` }}>
              {/* Beri kelas agar mudah ditarget oleh GSAP */}
              <div className="chart-bar w-full h-full bg-primary rounded-t-sm" />
            </div>
          ))}
        </div>

        {/* Beri kelas agar mudah ditarget oleh GSAP */}
        <div className="transaction-item flex justify-between items-center py-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-full"><TrendingUp className="text-red-500" size={16}/></div>
            <span className="font-medium">Spotify Subscription</span>
          </div>
          <span className="font-mono text-red-500">-$9.99</span>
        </div>
        <div className="transaction-item flex justify-between items-center py-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-full"><DollarSign className="text-primary" size={16}/></div>
            <span className="font-medium">Monthly Salary</span>
          </div>
          <span className="font-mono text-primary">+$3,200.00</span>
        </div>
      </CardContent>
    </Card>
  );
}