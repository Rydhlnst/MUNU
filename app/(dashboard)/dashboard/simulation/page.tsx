// Pastikan berada di paling atas file
"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { Bitcoin, Briefcase, Landmark, LineChart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormattedInput } from "@/components/FormattedInput";

// Tipe untuk hasil simulasi
interface SimulationResult {
  futureValue: number;
  totalInvested: number;
  totalGains: number;
  chartData: {
    year: number;
    principal: number;
    gains: number;
  }[];
}

type Payload = TooltipProps<number, string>['payload'];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Payload;
  label?: string | number;
}

type ContributionGrowthType = "none" | "monthly" | "yearly";

export default function InvestmentSimulationPage() {
  // State untuk semua input form
  const [assetType, setAssetType] = useState("stocks");
  const [initialInvestment, setInitialInvestment] = useState("1000");
  const [monthlyContribution, setMonthlyContribution] = useState("100");
  const [durationYears, setDurationYears] = useState("10");
  const [annualRate, setAnnualRate] = useState("8");
  const [compoundingType, setCompoundingType] = useState("monthly");

 const [contributionGrowthType, setContributionGrowthType] = useState<ContributionGrowthType>("none");
const contributionGrowthRate = 0.05; // 5% kenaikan


  // State untuk menyimpan hasil kalkulasi
  const [result, setResult] = useState<SimulationResult | null>(null);

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        const principal = payload.find((p) => p.dataKey === "principal")?.value ?? 0;
        const gains = payload.find((p) => p.dataKey === "gains")?.value ?? 0;

        return (
        <div className="rounded-md border bg-background p-2 shadow-sm text-sm space-y-1">
            <div className="font-semibold">Tahun: {label}</div>
            <div>Principal : {formatCurrency(principal)}</div>
            <div>Gains : {formatCurrency(gains)}</div>
        </div>
        );
    }
    return null;
};


  const handleSimulation = () => {
  const P = parseFloat(initialInvestment);
  let PMT = parseFloat(monthlyContribution);
  const t = parseInt(durationYears);
  const r = parseFloat(annualRate) / 100;

  let n = 1;
  if (compoundingType === "daily") n = 365;
  if (compoundingType === "monthly") n = 12;
  if (compoundingType === "yearly") n = 1;

  const chartData = [];
  let currentBalance = P;
  let totalContribution = 0;
  let monthCount = 0;

  for (let year = 1; year <= t; year++) {
    for (let i = 0; i < n; i++) {
      monthCount++;

      // Tambahkan kontribusi
      const periodicContribution = PMT * (12 / n);
      currentBalance += periodicContribution;
      totalContribution += periodicContribution;

      // Bunga
      currentBalance *= (1 + r / n);

      // Cek pertumbuhan kontribusi
      if (contributionGrowthType === "monthly" && monthCount % 1 === 0) {
        PMT *= 1 + contributionGrowthRate;
      } else if (contributionGrowthType === "yearly" && monthCount % 12 === 0) {
        PMT *= 1 + contributionGrowthRate;
      }
    }

    chartData.push({
      year,
      principal: parseFloat((P + totalContribution).toFixed(2)),
      gains: parseFloat((currentBalance - P - totalContribution).toFixed(2)),
    });
  }

  setResult({
    futureValue: parseFloat(currentBalance.toFixed(2)),
    totalInvested: parseFloat((P + totalContribution).toFixed(2)),
    totalGains: parseFloat((currentBalance - P - totalContribution).toFixed(2)),
    chartData,
  });
};

  
  // Fungsi untuk format mata uang
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };


  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Investment Simulation</h1>
        <p className="text-muted-foreground">
          See how your investment can grow over time with compounding interest.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Kolom Kiri: Form Input */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Simulation Parameters</CardTitle>
              <CardDescription>Enter the details for your simulation.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pilihan Aset */}
              <div className="space-y-2">
                <Label>Asset Type</Label>
                <Tabs value={assetType} onValueChange={setAssetType} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="stocks"><Briefcase className="mr-2 h-4 w-4" /> Stocks</TabsTrigger>
                    <TabsTrigger value="crypto"><Bitcoin className="mr-2 h-4 w-4" /> Crypto</TabsTrigger>
                    <TabsTrigger value="bonds"><Landmark className="mr-2 h-4 w-4" /> Bonds</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Pilihan Input Angka */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="initial-investment">Initial Investment (IDR)</Label>
                  <FormattedInput
                    id="initial-investment"
                    value={initialInvestment}
                    onValueChange={setInitialInvestment}
                    placeholder="e.g., 1.000.000"
                    />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthly-contribution">Monthly Contribution (IDR)</Label>
                    <FormattedInput
                    id="monthly-contribution"
                    value={monthlyContribution}
                    onValueChange={setMonthlyContribution}
                    placeholder="e.g., 100.000"
                    />
                </div>
              </div>

               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (Years)</Label>
                  <Input id="duration" type="number" value={durationYears} onChange={(e) => setDurationYears(e.target.value)} placeholder="e.g., 10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annual-rate">Expected Annual Return (%)</Label>
                  <Input id="annual-rate" type="number" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)} placeholder="e.g., 8" />
                </div>
              </div>

              {/* Pilihan Tipe Compounding */}
              <div className="space-y-2">
                <Label>Compounding Frequency</Label>
                <RadioGroup defaultValue="monthly" value={compoundingType} onValueChange={setCompoundingType} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily">Daily</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly">Monthly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yearly" id="yearly" />
                    <Label htmlFor="yearly">Yearly</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Contribution Growth</Label>
                <RadioGroup value={contributionGrowthType} onValueChange={(v: ContributionGrowthType) => setContributionGrowthType(v)} className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="none" />
                    <Label htmlFor="none">Fixed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly">Monthly ↑</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yearly" id="yearly" />
                    <Label htmlFor="yearly">Yearly ↑</Label>
                    </div>
                </RadioGroup>
            </div>

            </CardContent>
            <CardFooter>
              <Button onClick={handleSimulation} className="w-full">
                <LineChart className="mr-2 h-4 w-4" />
                Simulate Growth
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Kolom Kanan: Hasil Simulasi */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Simulation Results</CardTitle>
              <CardDescription>
                Projected growth based on your parameters.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {result ? (
                <>
                  {/* Hasil Angka */}
                  <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                    <div className="rounded-lg bg-secondary p-4">
                      <p className="text-sm text-muted-foreground">Total Invested</p>
                      <p className="text-2xl font-bold">{formatCurrency(result.totalInvested)}</p>
                    </div>
                    <div className="rounded-lg bg-secondary p-4">
                      <p className="text-sm text-muted-foreground">Total Gains</p>
                      <p className="text-2xl font-bold text-green-500">{formatCurrency(result.totalGains)}</p>
                    </div>
                    <div className="rounded-lg bg-primary p-4 text-primary-foreground">
                      <p className="text-sm">Future Value</p>
                      <p className="text-2xl font-bold">{formatCurrency(result.futureValue)}</p>
                    </div>
                  </div>

                  {/* Grafik */}
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={result.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${formatCurrency(value)}`} />
                        <Tooltip content={<CustomTooltip />} />
                       <Bar dataKey="principal" stackId="a" fill="#115c39" name="Principal" />
                        <Bar dataKey="gains" stackId="a" fill="#115c39" name="Gains" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </>
              ) : (
                <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed">
                  <p className="text-muted-foreground">Your results will be displayed here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}