"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Sparkles } from "lucide-react";

export function SmartInsightBox() {
  const [insight, setInsight] = useState("Sedang memuat insight...");

  useEffect(() => {
    // Simulasi API call ke backend AI
    setTimeout(() => {
      setInsight("🚀 Bitcoin menunjukkan tren positif minggu ini. Jika pola historis berlanjut, potensi naik 2-4% dalam 5 hari ke depan.");
    }, 1200);
  }, []);

  return (
    <Card className="bg-muted/40 border-l-4 border-yellow-500">
      <CardHeader className="flex flex-row items-center gap-2">
        <Sparkles className="text-yellow-500" />
        <CardTitle className="text-base">Smart Insight</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">{insight}</p>
      </CardContent>
    </Card>
  );
}