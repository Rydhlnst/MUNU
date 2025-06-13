"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function TotalAssetCard({ total }: { total: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Aset SmartSave</CardTitle>
        <CardDescription>
          Nilai estimasi seluruh aset kripto Anda.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold">
          Rp {total.toLocaleString("id-ID", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </p>
        <p className="text-sm text-green-600 dark:text-green-400">
          +Rp 1.250.000 (+8.5%) All Time
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button>Setor Dana</Button>
        <Button variant="outline">Tarik Dana</Button>
      </CardFooter>
    </Card>
  );
}