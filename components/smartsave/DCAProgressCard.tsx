"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "@radix-ui/react-progress";

export function DCAProgressCard() {
  const [progress, setProgress] = useState(0);

  // Simulasi goal 0.05 BTC dalam 6 bulan, saat ini baru 0.0081 BTC
  const currentHoldings = 0.0081;
  const target = 0.05;
  const percentage = Math.min((currentHoldings / target) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 500);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <Card className="border-l-4 border-emerald-500">
      <CardHeader>
        <CardTitle className="text-base">🎯 Progress Target BTC</CardTitle>
        <CardDescription>Tujuan: 0.05 BTC dalam 6 bulan</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm mb-1">
          <span>{currentHoldings.toFixed(4)} BTC</span>
          <span className="text-muted-foreground">{target} BTC</span>
        </div>
        <Progress value={progress} className="h-3" />
      </CardContent>
    </Card>
  );
}