// components/pricing/PricingHero.tsx

import React from "react";

export default function PricingHero() {
  return (
    <section className="w-full py-20 text-center bg-background">
      <div className="container max-w-3xl mx-auto px-4">
        <span className="inline-block rounded-full border border-muted-foreground px-4 py-1 text-xs font-semibold tracking-wide text-muted-foreground mb-4">
          PLANS & PRICING
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
          A plan for every product
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          Accelerate your speed of innovation with the right Munu plan for you.
        </p>
      </div>
    </section>
  );
}
