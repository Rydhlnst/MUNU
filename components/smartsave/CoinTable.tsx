"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import Image from "next/image";
import { useCoinMarkets } from "@/app/api/coin/prices/route";
import type { Coin } from "@/types/coin"; 

const INITIAL_DISPLAY_COUNT = 5;
const INCREMENT_COUNT = 5;

export default function CoinTableImproved() {
  const { data: coins = [], isLoading: loading, error } = useCoinMarkets();
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_DISPLAY_COUNT);

  const renderSkeleton = () => (
    <>
      {Array(INITIAL_DISPLAY_COUNT)
        .fill(0)
        .map((_, index) => (
          <TableRow key={`skeleton-${index}`}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 rounded-full bg-gray-200" />
                <Skeleton className="h-4 w-24 bg-gray-200" />
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-12 bg-gray-200" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-32 bg-gray-200" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-20 bg-gray-200" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-9 w-24 bg-gray-200" />
            </TableCell>
          </TableRow>
        ))}
    </>
  );

  const handleCreatePlanClick = (coin: Coin) => {
    setSelectedCoin(coin);
  };

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + INCREMENT_COUNT);
  };

  return (
    <Dialog>
      <div className="rounded-xl border bg-card text-card-foreground">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Coin</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Price (IDR)</TableHead>
              <TableHead className="text-right">24h Change</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              renderSkeleton()
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{`${error}`}</AlertDescription>
                  </Alert>
                </TableCell>
              </TableRow>
            ) : coins.length > 0 ? (
              <>
                {coins.slice(0, visibleCount).map((coin) => (
                  <TableRow key={coin.id}>
                    <TableCell className="flex items-center gap-3">
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        className="w-6 h-6 rounded-full"
                        width={24}
                        height={24}
                      />
                      <span className="font-medium">{coin.name}</span>
                    </TableCell>
                    <TableCell className="uppercase text-muted-foreground">
                      {coin.symbol}
                    </TableCell>
                    <TableCell className="font-semibold">
                      Rp {coin.current_price.toLocaleString("id-ID")}
                    </TableCell>
                    <TableCell
                      className={`text-right font-medium ${
                        coin.price_change_percentage_24h >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>
                    <TableCell className="text-right">
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCreatePlanClick(coin)}
                        >
                          Create Plan
                        </Button>
                      </DialogTrigger>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  Tidak ada data koin yang ditemukan.
                </TableCell>
              </TableRow>
            )}

            {!loading && !error && visibleCount < coins.length && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <Button variant="ghost" onClick={handleSeeMore}>
                    Lihat Lainnya...
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat Rencana untuk {selectedCoin?.name}</DialogTitle>
          <DialogDescription>
            Atur investasi rutin untuk {selectedCoin?.name} (
            {selectedCoin?.symbol.toUpperCase()}).
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>Form untuk membuat rencana akan muncul di sini.</p>
          <p className="mt-4 font-semibold">
            Harga saat ini: Rp{" "}
            {selectedCoin?.current_price.toLocaleString("id-ID")}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}