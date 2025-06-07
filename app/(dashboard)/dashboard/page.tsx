"use client"

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ArrowRightLeft,
  ScanLine,
  ArrowUpCircle,
  Users,
  Search,
  MoreHorizontal,
  ArrowDown,
  History,
  TrendingUp,
  TrendingDown,
  Wallet,
  Landmark,
  Utensils,
  Car,
  ShoppingBag,
  HeartPulse
} from "lucide-react";

interface Transaction {
  category: string;
  description: string;
  amount: number;
  type: 'income' | 'outcome';
  icon: React.ElementType;
}

interface UserTransaction {
  name: string;
  date: string;
  amount: string;
  type: 'positive' | 'negative';
  avatar: string;
}

interface BalanceCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
}

interface AssetItemProps {
  avatar: string;
  symbol: string;
  name: string;
  price: string;
  unit?: string;
}

const userTransactions: UserTransaction[] = [
    { name: "Jihan Audy", date: "3 Juni, 08:24", amount: "+689.73", type: "positive", avatar: "https://placehold.co/40x40/facc15/333?text=JA" },
    { name: "Nayda Nayara", date: "2 Juni, 15:09", amount: "-15.99", type: "negative", avatar: "https://placehold.co/40x40/60a5fa/fff?text=NN" },
    { name: "Fahri Skroepp", date: "2 Juni, 11:30", amount: "+120.00", type: "positive", avatar: "https://placehold.co/40x40/4ade80/fff?text=FS" },
    { name: "Sisca Kohl", date: "1 Juni, 20:00", amount: "-250.00", type: "negative", avatar: "https://placehold.co/40x40/f87171/fff?text=SK" },
    { name: "Jerome Polin", date: "1 Juni, 18:30", amount: "-35.50", type: "negative", avatar: "https://placehold.co/40x40/a78bfa/fff?text=JP" },
];

// Menambahkan lebih banyak data untuk memastikan scrolling terlihat
const transactionsData: Transaction[] = [
    { category: "Gaji", description: "Gaji Bulan Juni", amount: 9389.04, type: "income", icon: Wallet },
    { category: "Investasi", description: "Dividen Saham BBCA", amount: 389.73, type: "income", icon: Landmark },
    { category: "Makanan", description: "Makan siang", amount: -15.99, type: "outcome", icon: Utensils },
    { category: "Transportasi", description: "Bensin", amount: -50.00, type: "outcome", icon: Car },
    { category: "Belanja", description: "Baju baru", amount: -120.00, type: "outcome", icon: ShoppingBag },
    { category: "Makanan", description: "Belanja mingguan", amount: -189.13, type: "outcome", icon: Utensils },
    { category: "Hiburan", description: "Tiket bioskop", amount: -10.00, type: "outcome", icon: Car },
    { category: "Kesehatan", description: "Obat", amount: -25.50, type: "outcome", icon: HeartPulse },
];

const stockIndexData = [
  { name: "Stripe", symbol: "S", price: "120.91", avatar: "https://placehold.co/40x40/6366f1/fff?text=S" },
  { name: "Amazon", symbol: "a", price: "182.90", avatar: "https://placehold.co/40x40/f97316/fff?text=A" },
  { name: "Wise", symbol: "W", price: "9.80", avatar: "https://placehold.co/40x40/22d3ee/fff?text=W" },
];

const cryptoData = [
  { name: "Bitcoin", symbol: "BTC", price: "65,100.50", avatar: "https://placehold.co/40x40/f7931a/fff?text=B" },
  { name: "Ethereum", symbol: "ETH", price: "3,450.72", avatar: "https://placehold.co/40x40/627eea/fff?text=E" },
];

const bondsData = [
  { name: "FR0091", symbol: "Gov", price: "101.50", avatar: "https://placehold.co/40x40/1e40af/fff?text=FR" },
];


// --- Komponen-Komponen ---

const VirtualCard = () => (
  <Card className="col-span-1 lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-2xl relative overflow-hidden">
    <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20 bg-primary"></div>
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle className="font-light tracking-widest">VISA</CardTitle>
        <div className="w-10 h-8 bg-white/20 rounded-md"></div>
      </div>
    </CardHeader>
    <CardContent className="space-y-6 pt-4">
      <div className="font-mono text-2xl tracking-wider">**** **** **** 2725 9097</div>
      <div className="flex justify-between text-sm">
        <div><p className="text-xs text-gray-400">Nama</p><p className="font-medium">Lucia Esperanza</p></div>
        <div><p className="text-xs text-gray-400">Valid Thru</p><p className="font-medium">12/28</p></div>
        <div><p className="text-xs text-gray-400">CVV</p><p className="font-medium">249</p></div>
      </div>
    </CardContent>
  </Card>
);


const BalanceCard:React.FC<BalanceCardProps> = ({ title, value, icon: Icon }) => (
  <Card className="col-span-1 flex flex-col justify-between">
    <CardHeader className="pb-2">
      <CardDescription className="flex justify-between items-center">
        <span>{title}</span><Icon className="w-5 h-5 text-muted-foreground"/>
      </CardDescription>
      <CardTitle className="text-3xl font-bold text-primary">{value}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="gap-2 mt-4 grid grid-cols-2">
        <Button className="w-full bg-primary text-white"><ArrowDown className="w-4 h-4 mr-2"/> Withdraw</Button>
        <Button variant="outline" className="w-full"><History className="w-4 h-4 mr-2"/> History</Button>
      </div>
    </CardContent>
  </Card>
);


const IncomeExpenseTracker = () => {
    const totalIncome = transactionsData.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalOutcome = transactionsData.filter(t => t.type === 'outcome').reduce((sum, t) => sum + t.amount, 0);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Pemasukan & Pengeluaran</CardTitle>
                <CardDescription>Ringkasan transaksi bulan ini.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-full">
                           <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Pemasukan</p>
                            <p className="text-lg font-bold text-green-600 dark:text-green-400">${totalIncome.toFixed(2)}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-full">
                           <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Pengeluaran</p>
                            <p className="text-lg font-bold text-red-600 dark:text-red-400">${Math.abs(totalOutcome).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <h4 className="text-sm font-semibold mb-3">Transaksi Terbaru</h4>
                <div className="space-y-4 h-full overflow-y-auto max-h-[184px]">
                    {transactionsData.map((tx, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                                <tx.icon className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold text-sm">{tx.description}</p>
                                <p className="text-xs text-muted-foreground">{tx.category}</p>
                            </div>
                            <div className={`font-bold text-sm ${tx.type === 'income' ? 'text-primary' : 'text-foreground'}`}>
                                {tx.type === 'income' ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

const ActivityButtons = () => (
  <div className="flex justify-around items-center p-4 bg-muted/50 rounded-lg">
    <button className="flex flex-col items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary">
      <ScanLine className="w-6 h-6" /> Scan
    </button>
    <button className="flex flex-col items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary">
      <ArrowRightLeft className="w-6 h-6" /> Transfer
    </button>
    <button className="flex flex-col items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary">
      <ArrowUpCircle className="w-6 h-6" /> Topup
    </button>
    <button className="flex flex-col items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary">
      <Users className="w-6 h-6" /> Partner
    </button>
  </div>
);

const TransactionsList = () => (
  <div className="space-y-4">
    {userTransactions.map(tx => (
      <div key={tx.name} className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={tx.avatar} />
          <AvatarFallback>{tx.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <p className="font-semibold text-sm">{tx.name}</p>
          <p className="text-xs text-muted-foreground">{tx.date}</p>
        </div>
        <div className={`font-bold text-sm ${tx.type === 'positive' ? 'text-primary' : 'text-red-500'}`}>${tx.amount}</div>
      </div>
    ))}
  </div>
);

const AllActivityCard = () => (
    <Card>
        <CardHeader>
            <CardTitle>All Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <ActivityButtons />
            <TransactionsList />
        </CardContent>
    </Card>
);

const MarketIndexes = () => {
    const AssetItem:React.FC<AssetItemProps> = ({ avatar, symbol, name, price, unit = '$' }) => (
        <div className="p-3 flex items-center gap-3 hover:bg-muted/50 transition-colors rounded-lg">
            <Avatar className="w-8 h-8"><AvatarImage src={avatar} /><AvatarFallback>{symbol}</AvatarFallback></Avatar>
            <div><p className="font-bold text-sm">{name}</p><p className="text-xs text-muted-foreground">{unit}{price}</p></div>
        </div>
    );
    return (
        <Card>
            <CardHeader><CardTitle>Market Indexes</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Stocks</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                        {stockIndexData.map(item => <AssetItem key={item.name} {...item} />)}
                    </div>
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Crypto</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                        {cryptoData.map(item => <AssetItem key={item.name} {...item} />)}
                    </div>
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Bonds</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                        {bondsData.map(item => <AssetItem key={item.name} {...item} unit="" />)}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};


// --- Komponen Halaman Utama ---
export default function FintechDashboardPage() {
  return (
    <main className="space-y-6 bg-gray-50 dark:bg-gray-900/50 h-full p-8">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">Home Page &gt; Dashboard</p>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight"><span className="text-primary">MUNU</span> Dashboard</h1>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" size="icon"><Search className="w-4 h-4"/></Button>
          <Button variant="outline">Set Calendar</Button>
          <Button variant="outline">Add Widget</Button>
          <Button className="bg-primary text-white">Create Reports</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <VirtualCard />
            <BalanceCard title="Available Balance" value="$817,432.09" icon={MoreHorizontal} />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <IncomeExpenseTracker />
            </div>
            <div className="xl:col-span-1">
              <AllActivityCard />
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader><CardTitle>Total Earnings</CardTitle><CardDescription>Pertumbuhan meningkat 14% dari minggu lalu.</CardDescription></CardHeader>
            <CardContent><p className="text-4xl font-bold">$42,291.53</p></CardContent>
          </Card>
          <MarketIndexes />
        </div>
      </div>
    </main>
  )
}

