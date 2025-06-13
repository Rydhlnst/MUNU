"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { WalletCards, ListFilter, FileDown } from "lucide-react";


export function TransactionHistoryCard() {
  const transactions = [
    {
      id: "txn1",
      type: "purchase",
      assetName: "Bitcoin",
      assetSymbol: "BTC",
      date: new Date("2025-06-10T10:00:00"),
      amountCrypto: 0.00009,
      amountIdr: -100000,
    },
    {
      id: "txn2",
      type: "purchase",
      assetName: "Ethereum",
      assetSymbol: "ETH",
      date: new Date("2025-06-08T14:30:00"),
      amountCrypto: 0.0091,
      amountIdr: -500000,
    },
    {
      id: "txn3",
      type: "deposit",
      assetName: "Rupiah",
      date: new Date("2025-06-05T08:30:00"),
      amountIdr: 1000000,
    },
    {
      id: "txn4",
      type: "withdrawal",
      assetName: "Rupiah",
      date: new Date("2025-06-01T18:00:00"),
      amountIdr: -250000,
    },
  ];

  const TransactionTypeBadge = ({ type }: { type: string }) => {
    switch (type) {
      case "purchase":
        return <span className="text-sm font-medium text-blue-600">Pembelian</span>;
      case "deposit":
        return <span className="text-sm font-medium text-green-600">Setoran</span>;
      case "withdrawal":
        return <span className="text-sm font-medium text-red-600">Penarikan</span>;
      default:
        return <span className="text-sm font-medium">{type}</span>;
    }
  };

  return (
    <Card className="mt-4">
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
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium">{tx.assetName}</TableCell>
                  <TableCell><TransactionTypeBadge type={tx.type} /></TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat("id-ID", {
                      dateStyle: "long",
                      timeStyle: "short",
                    }).format(tx.date)}
                  </TableCell>
                  <TableCell className="text-right">
                    {tx.amountCrypto ? `${tx.amountCrypto.toFixed(6)} ${tx.assetSymbol}` : "-"}
                  </TableCell>
                  <TableCell className={`text-right font-semibold ${tx.amountIdr > 0 ? "text-green-600" : "text-foreground"}`}>
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
  );
}

