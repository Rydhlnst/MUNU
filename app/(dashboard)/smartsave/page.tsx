"use client";

import CoinTableImproved from "@/components/smartsave/CoinTable";
import { CryptoPlanCard } from "@/components/smartsave/CryptoPlanCard";
// Kita asumsikan tipe 'Plan' dan 'Coin' diekspor dari file CryptoPlanCard
import type { Plan, Coin } from "@/components/smartsave/CryptoPlanCard"; 
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileDown, ListFilter, WalletCards } from "lucide-react";

export default function SmartSaveUI() {
  // 1. Data & Logika dipindahkan ke dalam komponen
  // Di aplikasi nyata, ini akan berasal dari state (useState/useEffect) yang mengambil data dari API
  
  // Dummy data untuk rencana investasi pengguna
  const myPlans: Plan[] = [
    {
      id: "plan-btc-1",
      coinId: "bitcoin",
      label: "Tabungan Mingguan",
      frequency: "mingguan",
      amountPerPeriod: 100000,
      nextPurchaseDate: new Date("2025-06-17"),
      totalHoldings: 0.0081,
    },
    // 2. Dummy data untuk Ethereum ditambahkan
    {
      id: "plan-eth-1",
      coinId: "ethereum",
      label: "Investasi Bulanan",
      frequency: "bulanan",
      amountPerPeriod: 500000,
      nextPurchaseDate: new Date("2025-07-01"),
      totalHoldings: 0.12,
    },
  ];

  // Dummy data harga koin dari API
  const coinData: Coin[] = [
    {
      id: "bitcoin",
      symbol: "btc",
      name: "Bitcoin",
      image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      current_price: 1100000000,
      price_change_percentage_24h: 1.5,
    },
    // 2. Dummy data untuk Ethereum ditambahkan
    {
      id: "ethereum",
      symbol: "eth",
      name: "Ethereum",
      image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
      current_price: 55000000,
      price_change_percentage_24h: 3.2,
    },
  ];

  // Menggabungkan data plan dengan data koin
  const combinedData = myPlans.map(plan => {
    const coin = coinData.find(c => c.id === plan.coinId);
    return { plan, coin };
  });

  // 3. Kalkulasi Total Aset secara Dinamis
  const totalAssetValue = combinedData.reduce((total, { plan, coin }) => {
    if (coin) {
      return total + (plan.totalHoldings * coin.current_price);
    }
    return total;
  }, 0);

  type Transaction = {
    id: string;
    type: "purchase" | "deposit" | "withdrawal";
    assetName: string;
    assetSymbol?: string;
    date: Date;
    amountCrypto?: number;
    amountIdr: number;
    };

    const transactions: Transaction[] = [
        {
            id: "txn1",
            type: "purchase",
            assetName: "Bitcoin",
            assetSymbol: "BTC",
            date: new Date("2025-06-10T10:00:00"),
            amountCrypto: 0.00009,
            amountIdr: -100000, // Pembelian adalah pengeluaran
        },
        {
            id: "txn2",
            type: "purchase",
            assetName: "Ethereum",
            assetSymbol: "ETH",
            date: new Date("2025-06-08T14:30:00"),
            amountCrypto: 0.0091,
            amountIdr: -500000, // Pembelian adalah pengeluaran
        },
        {
            id: "txn3",
            type: "deposit",
            assetName: "Rupiah", // Untuk deposit/withdrawal, asetnya adalah Rupiah
            date: new Date("2025-06-05T08:30:00"),
            amountIdr: 1000000, // Deposit adalah pemasukan
        },
        {
            id: "txn4",
            type: "withdrawal",
            assetName: "Rupiah",
            date: new Date("2025-06-01T18:00:00"),
            amountIdr: -250000, // Withdrawal adalah pengeluaran
        },
    ];

  const TransactionTypeBadge = ({ type }: { type: Transaction["type"] }) => {
    switch (type) {
        case "purchase":
        return <Badge variant="outline">Pembelian</Badge>;
        case "deposit":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Setoran</Badge>;
        case "withdrawal":
        return <Badge variant="destructive">Penarikan</Badge>;
        default:
        return <Badge>{type}</Badge>;
    }
    };

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      {/* Header Halaman */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">SmartSave</h1>
        <Button>Buat Rencana Baru</Button>
      </div>

      {/* Kartu Ringkasan (Sekarang Dinamis) */}
      <Card>
        <CardHeader>
          <CardTitle>Total Aset SmartSave</CardTitle>
          <CardDescription>
            Nilai estimasi seluruh aset kripto Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">
            Rp {totalAssetValue.toLocaleString("id-ID", {minimumFractionDigits: 0, maximumFractionDigits: 0})}
          </p>
          <p className="text-sm text-green-600 dark:text-green-400">
            {/* Nilai ini bisa dibuat dinamis jika ada data historis */}
            +Rp 1.250.000 (+8.5%) All Time
          </p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button>Setor Dana</Button>
          <Button variant="outline">Tarik Dana</Button>
        </CardFooter>
      </Card>

      {/* Tabs Utama */}
      <Tabs defaultValue="active-plans">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active-plans">Rencana Aktif</TabsTrigger>
          <TabsTrigger value="transaction-history">Riwayat Transaksi</TabsTrigger>
        </TabsList>

        {/* Konten Tab Rencana Aktif */}
        <TabsContent value="active-plans">
          {/* 4. Perbaikan Layout: Menambah Judul & Spasi antar bagian */}
          <div className="flex flex-col gap-8 mt-4">
            
            {/* Bagian untuk Rencana Pengguna */}
            <div>
              <h2 className="text-2xl font-semibold tracking-tight mb-4">Rencana Anda</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {combinedData.map(({ plan, coin }) => (
                  coin ? <CryptoPlanCard key={plan.id} plan={plan} coin={coin} /> : null
                ))}
              </div>
            </div>

            {/* Bagian untuk Menemukan Aset Baru */}
            <div>
              <h2 className="text-2xl font-semibold tracking-tight mb-4">Jelajahi Aset Lain</h2>
              <CoinTableImproved />
            </div>

          </div>
        </TabsContent>

        {/* Konten Tab Riwayat Transaksi */}
        <TabsContent value="transaction-history">
            <Card className="mt-4">
                {/* 2. Menambah Aksi & Filter di Header Card */}
                <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Riwayat Transaksi</CardTitle>
                    <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                            <ListFilter className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by type</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>Pembelian</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked>Setoran</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked>Penarikan</DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" variant="outline" className="h-8 gap-1">
                        <FileDown className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
                    </Button>
                    </div>
                </div>
                </CardHeader>
                <CardContent>
                {/* 3. Menangani Empty State */}
                {transactions.length > 0 ? (
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Aset</TableHead>
                        <TableHead>Jenis</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead className="text-right">Jumlah</TableHead>
                        <TableHead className="text-right">Nilai (IDR)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* 4. Render data secara dinamis */}
                        {transactions.map((tx) => (
                        <TableRow key={tx.id}>
                            <TableCell className="font-medium">{tx.assetName}</TableCell>
                            <TableCell>
                            <TransactionTypeBadge type={tx.type} />
                            </TableCell>
                            <TableCell>
                            {new Intl.DateTimeFormat("id-ID", {
                                dateStyle: "long",
                                timeStyle: "short",
                            }).format(tx.date)}
                            </TableCell>
                            <TableCell className="text-right">
                            {tx.amountCrypto ? `${tx.amountCrypto.toFixed(6)} ${tx.assetSymbol}` : "-"}
                            </TableCell>
                            <TableCell
                            className={`text-right font-semibold ${
                                tx.amountIdr > 0 ? "text-green-600" : "text-foreground"
                            }`}
                            >
                            {tx.amountIdr > 0 ? "+" : ""}{tx.amountIdr.toLocaleString("id-ID", { style: 'currency', currency: 'IDR' })}
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                ) : (
                    <div className="text-center py-12">
                    <WalletCards className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">Belum Ada Transaksi</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Setiap transaksi pembelian atau setoran dana akan muncul di sini.
                    </p>
                    </div>
                )}
                </CardContent>
            </Card>
            </TabsContent>
      </Tabs>
    </div>
  );
}