"use client";

// import CoinTableImproved from "@/components/smartsave/CoinTable";
// import { CryptoPlanCard } from "@/components/smartsave/CryptoPlanCard";
import type { Plan, Coin } from "@/components/smartsave/CryptoPlanCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { PlansSection } from "@/components/smartsave/PlanSection";
import { TotalAssetCard } from "@/components/smartsave/TotalAssetCard";
import { ExploreCoinsSection } from "@/components/smartsave/ExploreCoinsSection";
import { TransactionHistoryCard } from "@/components/smartsave/TransactionHistoryCard";
import { SmartInsightBox } from "@/components/smartsave/SmartInsightBox";
import { DCAProgressCard } from "@/components/smartsave/DCAProgressCard";
import { RebalanceAlert } from "@/components/smartsave/RebalanceAlert";
import { GoalTracker } from "@/components/smartsave/GoalTracker";
import { GoalPlanner } from "@/components/smartsave/GoalPlanner";

export default function SmartSaveUI() {
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

  const coinData: Coin[] = [
    {
      id: "bitcoin",
      symbol: "btc",
      name: "Bitcoin",
      image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      current_price: 1100000000,
      price_change_percentage_24h: 1.5,
    },
    {
      id: "ethereum",
      symbol: "eth",
      name: "Ethereum",
      image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
      current_price: 55000000,
      price_change_percentage_24h: 3.2,
    },
  ];

  const combinedData = myPlans.map(plan => {
    const coin = coinData.find(c => c.id === plan.coinId);
    return { plan, coin };
  });

  const totalAssetValue = combinedData.reduce((total, { plan, coin }) => {
    if (coin) {
      return total + (plan.totalHoldings * coin.current_price);
    }
    return total;
  }, 0);

  const bitcoinValue = combinedData.find(d => d.coin?.id === "bitcoin")?.plan.totalHoldings ?? 0 * (combinedData.find(d => d.coin?.id === "bitcoin")?.coin?.current_price ?? 0);
  const ethereumValue = combinedData.find(d => d.coin?.id === "ethereum")?.plan.totalHoldings ?? 0 * (combinedData.find(d => d.coin?.id === "ethereum")?.coin?.current_price ?? 0);

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">SmartSave</h1>
        <Button>Buat Rencana Baru</Button>
      </div>

      <TotalAssetCard total={totalAssetValue} />
      <SmartInsightBox />
      <DCAProgressCard />
      <RebalanceAlert bitcoinValue={bitcoinValue} ethereumValue={ethereumValue} />
      <GoalTracker asset="ETH" currentAmount={0.12} targetAmount={1} deadline="31 Des 2025" />
      <GoalPlanner/>

      <Tabs defaultValue="active-plans">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active-plans">Rencana Aktif</TabsTrigger>
          <TabsTrigger value="transaction-history">Riwayat Transaksi</TabsTrigger>
        </TabsList>

        <TabsContent value="active-plans">
          <div className="flex flex-col gap-8 mt-4">
            <PlansSection combinedData={combinedData} />
            <ExploreCoinsSection />
          </div>
        </TabsContent>

        <TabsContent value="transaction-history">
          <TransactionHistoryCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
