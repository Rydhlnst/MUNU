"use client";

import { CryptoPlanCard } from "@/components/smartsave/CryptoPlanCard";
import type { Plan, Coin } from "@/components/smartsave/CryptoPlanCard";

export function PlansSection({ combinedData }: { combinedData: { plan: Plan; coin?: Coin }[] }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight mb-4">Rencana Anda</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {combinedData.map(({ plan, coin }) => (
          coin ? <CryptoPlanCard key={plan.id} plan={plan} coin={coin} /> : null
        ))}
      </div>
    </div>
  );
}

