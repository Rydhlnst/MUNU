import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

// Tipe data seperti yang didefinisikan di atas
export type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number
};

export type Plan = {
  id: string;
  coinId: string;
  label: string;
  frequency: "harian" | "mingguan" | "bulanan";
  amountPerPeriod: number;
  nextPurchaseDate: Date;
  totalHoldings: number;
};

interface CryptoPlanCardProps {
  plan: Plan;
  coin: Coin;
}

export function CryptoPlanCard({ plan, coin }: CryptoPlanCardProps) {
  // 3. Kalkulasi nilai estimasi secara dinamis
  const estimatedValue = plan.totalHoldings * coin.current_price;

  // 4. Fungsi untuk format tanggal agar lebih rapi
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex items-center gap-3">
          {/* 2. Gunakan data dinamis dari prop 'coin' */}
          <Avatar>
            <AvatarImage src={coin.image} alt={coin.symbol} />
            <AvatarFallback>{coin.symbol.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{coin.name}</CardTitle>
            <CardDescription>{plan.label}</CardDescription>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Kelola Rencana</DropdownMenuItem>
            <DropdownMenuItem>Jeda Rencana</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Hapus</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <div className="flex-grow">
          <p className="text-sm font-medium">
            Investasi: {`Rp ${plan.amountPerPeriod.toLocaleString("id-ID")}`} / {plan.frequency}
          </p>
          <p className="text-sm text-muted-foreground">
            Pembelian berikutnya: {formatDate(plan.nextPurchaseDate)}
          </p>
        </div>
        <div className="pt-4 mt-4 border-t">
          <p className="text-xs text-muted-foreground">Total Aset</p>
          <p className="font-semibold">
            {`${plan.totalHoldings.toFixed(6)} ${coin.symbol.toUpperCase()}`}
            <span className="text-muted-foreground font-normal">
              {` (≈ Rp ${estimatedValue.toLocaleString("id-ID", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })})`}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}