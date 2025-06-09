// src/components/FeedbackWidget.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const upcomingFeatures = [
  { id: "dark-mode", label: "Mode Gelap (Dark Mode)" },
  { id: "integrasi-broker", label: "Integrasi dengan Pialang Saham" },
  { id: "laporan-pajak", label: "Laporan Pajak Otomatis" },
  { id: "notifikasi-harga", label: "Notifikasi Harga Saham/Aset" },
  { id: "multi-currency", label: "Dukungan Multi-Mata Uang" },
];

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<Record<string, boolean>>({});
  const [additionalSuggestion, setAdditionalSuggestion] = useState("");

  const handleCheckboxChange = (featureId: string) => {
    setSelectedFeatures((prev) => ({ ...prev, [featureId]: !prev[featureId] }));
  };

  const handleSubmit = () => {
    const feedbackData = {
      wantsFeatures: Object.keys(selectedFeatures).filter((key) => selectedFeatures[key]),
      suggestion: additionalSuggestion,
      submittedAt: new Date().toISOString(),
    };
    console.log("Feedback Diterima:", feedbackData);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSelectedFeatures({});
        setAdditionalSuggestion("");
      }, 200);
    }
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {!isOpen && (
        <SheetTrigger asChild>
          <Button
            variant="default"
            className="fixed top-1/2 -translate-y-1/2 left-0 z-40 h-auto p-3 rounded-l-none dark:bg-muted dark:text-white"
          >
            <div className="flex flex-col items-center gap-2">
              <span
                style={{ writingMode: "vertical-rl" }}
                className="rotate-180 font-semibold tracking-wider"
              >
                Feedback
              </span>
            </div>
          </Button>
        </SheetTrigger>
      )}

      <SheetContent
        side="left"
        className="flex flex-col h-auto top-1/2 -translate-y-1/2 rounded-r-2xl max-h-[90vh] dark:bg-background"
      >
        <SheetClose asChild>
          <Button
            variant="default"
            className="absolute top-1/2 -translate-y-1/2 -right-[46px] z-50 h-auto p-3 rounded-l-none dark:bg-muted dark:text-white"
          >
            <div className="flex flex-col items-center gap-2">
              <span
                style={{ writingMode: "vertical-rl" }}
                className="rotate-180 font-semibold tracking-wider"
              >
                Feedback
              </span>
            </div>
          </Button>
        </SheetClose>

        <SheetHeader className="text-left px-6 pt-6">
          <SheetTitle>Beri Kami Masukan</SheetTitle>
          <SheetDescription className="text-muted-foreground mt-1">
            Kami ingin mendengar pendapat Anda! Fitur apa yang paling Anda nantikan?
            Beri tahu kami agar MUNU bisa menjadi lebih baik.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-grow overflow-y-auto px-6 py-6 space-y-8">
          <div>
            <h4 className="font-semibold mb-3">Fitur yang paling dinantikan</h4>
            <div className="space-y-4">
              {upcomingFeatures.map((feature) => (
                <div key={feature.id} className="flex items-center gap-3">
                  <Checkbox
                    id={feature.id}
                    checked={!!selectedFeatures[feature.id]}
                    onCheckedChange={() => handleCheckboxChange(feature.id)}
                  />
                  <Label htmlFor={feature.id} className="cursor-pointer leading-snug">
                    {feature.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="suggestion" className="font-semibold block mb-2">
              Punya saran atau ide lain?
            </Label>
            <Textarea
              id="suggestion"
              placeholder="Tuliskan ide brilian Anda di sini..."
              className="w-full"
              rows={4}
              value={additionalSuggestion}
              onChange={(e) => setAdditionalSuggestion(e.target.value)}
            />
          </div>
        </div>

        <SheetFooter className="px-6 pb-6">
          <Button onClick={handleSubmit} type="submit" className="w-full">
            Kirim Feedback
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
