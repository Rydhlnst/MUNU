"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function GoalPlanner() {
  const [targetAmount, setTargetAmount] = useState(1);
  const [durationMonths, setDurationMonths] = useState(6);
  const [result, setResult] = useState<number | null>(null);

  const calculatePlan = () => {
    if (durationMonths <= 0 || targetAmount <= 0) return;
    const monthlyPlan = targetAmount / durationMonths;
    setResult(monthlyPlan);
  };

  return (
    <Card className="border-l-4 border-indigo-500">
      <CardHeader>
        <CardTitle className="text-base">🧠 Perencana Tujuan (ETH)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Target ETH</Label>
          <Input
            type="number"
            min={0.01}
            step={0.01}
            value={targetAmount}
            onChange={(e) => setTargetAmount(parseFloat(e.target.value))}
            placeholder="Contoh: 1"
          />
        </div>
        <div>
          <Label>Durasi (bulan)</Label>
          <Input
            type="number"
            min={1}
            value={durationMonths}
            onChange={(e) => setDurationMonths(parseInt(e.target.value))}
            placeholder="Contoh: 6"
          />
        </div>
        <Button onClick={calculatePlan} className="w-full">Hitung Rencana</Button>
      </CardContent>
      {result && (
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            💡 Kamu perlu menyisihkan sekitar <span className="font-medium">{result.toFixed(4)} ETH</span> per bulan.
          </p>
        </CardFooter>
      )}
    </Card>
  );
}