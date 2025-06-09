"use client"

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
  { id: "dark-mode", label: "Dark Mode" },
  { id: "integrasi-broker", label: "Stock Broker Integration" },
  { id: "laporan-pajak", label: "Automatic Tax Reports" },
  { id: "notifikasi-harga", label: "Asset Price Notifications" },
  { id: "multi-currency", label: "Multi-Currency Support" },
];

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<Record<string, boolean>>({});
  const [additionalSuggestion, setAdditionalSuggestion] = useState("");

  const handleCheckboxChange = (featureId: string) => {
    setSelectedFeatures((prev) => ({ ...prev, [featureId]: !prev[featureId] }));
  };

  const handleSubmit = async () => {
    const feedbackData = {
      wantsFeatures: Object.keys(selectedFeatures).filter((key) => selectedFeatures[key]),
      suggestion: additionalSuggestion,
      submittedAt: new Date().toISOString(),
    };

    try {
      await fetch("/api/send-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      setIsOpen(false);
    } catch (error) {
      console.error("Failed to send feedback:", error);
    }
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
          <SheetTitle>Send Us Your Feedback</SheetTitle>
          <SheetDescription className="text-muted-foreground mt-1">
            We&apos;d love to hear your thoughts! Which features are you most excited about?
            Let us know so we can make MUNU even better.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-grow overflow-y-auto px-6 py-6 space-y-8">
          <div>
            <h4 className="font-semibold mb-3">Most Anticipated Features</h4>
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
              Any other ideas or suggestions?
            </Label>
            <Textarea
              id="suggestion"
              placeholder="Write your brilliant idea here..."
              className="w-full"
              rows={4}
              value={additionalSuggestion}
              onChange={(e) => setAdditionalSuggestion(e.target.value)}
            />
          </div>
        </div>

        <SheetFooter className="px-6 pb-6">
          <Button onClick={handleSubmit} type="submit" className="w-full">
            Submit Feedback
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
