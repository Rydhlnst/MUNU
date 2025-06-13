import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function RebalanceAlert({ bitcoinValue, ethereumValue }: { bitcoinValue: number; ethereumValue: number }) {
  const total = bitcoinValue + ethereumValue;
  const btcRatio = bitcoinValue / total;
  const ethRatio = ethereumValue / total;

  const imbalance = Math.abs(btcRatio - ethRatio) > 0.25; // threshold

  if (!imbalance) return null;

  return (
    <Card className="border-l-4 border-red-500 bg-red-50">
      <CardHeader className="flex flex-row items-center gap-2">
        <AlertTriangle className="text-red-500" />
        <CardTitle className="text-base">Rebalancing Disarankan</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-red-800">
          Alokasi aset Anda terlalu condong ke salah satu koin. Pertimbangkan untuk menyeimbangkan kembali antara Bitcoin dan Ethereum.
        </p>
      </CardContent>
    </Card>
  );
}