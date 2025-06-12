"use client";

import React from "react";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

const roles = ["personal", "business", "investor"] as const;
type Role = typeof roles[number];

type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
};

type PricingData = {
  monthly: Plan[];
  yearly: Plan[];
};

type FeatureComparison = {
  category: string;
  features: {
    name: string;
    value: boolean[];
  }[];
};

const planNames = ["Basic", "Pro", "Max"];

const pricingData: Record<Role, PricingData> = {
  personal: {
    monthly: [
      {
        name: "Personal Free",
        price: "Free",
        description: "Get started with essential tools for personal finance.",
        features: [
          "Spending Tracker",
          "Bill Reminders",
        ],
        cta: "Start for Free",
        highlighted: false,
      },
      {
        name: "Personal Pro",
        price: "Rp 29.000",
        description: "Ideal for individuals managing their personal finances.",
        features: [
          "Budget & Spending Dashboard",
          "Auto Categorizer",
          "Bill Reminders",
          "Goal Tracking",
        ],
        cta: "Upgrade Now",
        highlighted: false,
      },
      {
        name: "Personal Max",
        price: "Rp 59.000",
        description: "All-in-one tools for financial freedom and automation.",
        features: [
          "All Pro Features",
          "Smart AI Financial Advisor",
          "Auto Budget Allocation",
          "Custom Spending Categories",
          "Sync Multiple Bank Accounts",
          "Priority Support",
        ],
        cta: "Go Premium",
        highlighted: true,
      },
    ],
    yearly: [
      {
        name: "Personal Free",
        price: "Free",
        description: "Get started with essential tools for personal finance.",
        features: [
          "Spending Tracker",
          "Bill Reminders",
        ],
        cta: "Start for Free",
        highlighted: false,
      },
      {
        name: "Personal Pro",
        price: "Rp 290.000",
        description: "Ideal for individuals managing their personal finances.",
        features: [
          "Budget & Spending Dashboard",
          "Auto Categorizer",
          "Bill Reminders",
          "Goal Tracking",
        ],
        cta: "Upgrade Now",
        highlighted: false,
      },
      {
        name: "Personal Max",
        price: "Rp 590.000",
        description: "All-in-one tools for financial freedom and automation.",
        features: [
          "All Pro Features",
          "Smart AI Financial Advisor",
          "Auto Budget Allocation",
          "Custom Spending Categories",
          "Sync Multiple Bank Accounts",
          "Priority Support",
        ],
        cta: "Go Premium",
        highlighted: true,
      },
    ],
  },

  business: { // Renamed from "ukm"
    monthly: [
      {
        name: "Business Free",
        price: "Free",
        description: "Basic tools for early stage business tracking.",
        features: [
          "Cashflow Tracker",
          "Basic Invoice Template",
        ],
        cta: "Start for Free",
        highlighted: false,
      },
      {
        name: "Business Pro",
        price: "Rp 89.000",
        description: "For small businesses managing finance, stock, and invoices.",
        features: [
          "All Personal Features",
          "Cashflow + Invoice Tracker",
          "Stock Management (50 Items)",
          "PDF Statement Parser",
          "Laporan Bulanan (Export)",
          "Basic Staff Access (up to 3)",
        ],
        cta: "Start Free Trial",
        highlighted: false,
      },
      {
        name: "Business Max",
        price: "Rp 179.000",
        description: "Advanced tools for growing and scaling your business.",
        features: [
          "All Pro Features",
          "Stock Management Unlimited",
          "Advanced Staff Role Access (up to 10)",
          "Multi-Branch Report",
          "Integration with POS & Marketplace",
          "AI-Powered Financial Summary",
          "Priority Email + WA Support",
        ],
        cta: "Scale Your Business",
        highlighted: true,
      },
    ],
    yearly: [
      {
        name: "Business Free",
        price: "Free",
        description: "Basic tools for early stage business tracking.",
        features: [
          "Cashflow Tracker",
          "Basic Invoice Template",
        ],
        cta: "Start for Free",
        highlighted: false,
      },
      {
        name: "Business Pro",
        price: "Rp 890.000",
        description: "For small businesses managing finance, stock, and invoices.",
        features: [
          "All Personal Features",
          "Cashflow + Invoice Tracker",
          "Stock Management (50 Items)",
          "PDF Statement Parser",
          "Laporan Bulanan (Export)",
          "Basic Staff Access (up to 3)",
        ],
        cta: "Start Free Trial",
        highlighted: false,
      },
      {
        name: "Business Max",
        price: "Rp 1.790.000",
        description: "Advanced tools for growing and scaling your business.",
        features: [
          "All Pro Features",
          "Stock Management Unlimited",
          "Advanced Staff Role Access (up to 10)",
          "Multi-Branch Report",
          "Integration with POS & Marketplace",
          "AI-Powered Financial Summary",
          "Priority Email + WA Support",
        ],
        cta: "Scale Your Business",
        highlighted: true,
      },
    ],
  },


  investor: {
    monthly: [
      {
        name: "Investor Free",
        price: "Free",
        description: "Monitor portfolios with essential insights.",
        features: [
          "Portfolio Overview",
          "Watchlist Alerts",
        ],
        cta: "Start for Free",
        highlighted: false,
      },
      {
        name: "Investor Elite",
        price: "Rp 149.000",
        description: "Best for active investors needing auto-execution tools.",
        features: [
          "Investment Dashboard",
          "Crypto Arbitrage Scanner",
          "Auto Execute Trading (API-based)",
          "Hedging Planner",
          "DEX Spread Comparison",
          "Real-time Watchlist & Alerts",
        ],
        cta: "Start Free Trial",
        highlighted: false,
      },
      {
        name: "Investor Prime",
        price: "Rp 249.000",
        description: "Full-suite of tools for pro investors and portfolio managers.",
        features: [
          "All Elite Features",
          "Real-Time Market Signals (AI-Driven)",
          "Smart Portfolio Rebalancer",
          "Auto Hedge Execution",
          "On-Chain Wallet Sync",
          "Portfolio Performance Analytics",
          "VIP Support",
        ],
        cta: "Go Prime",
        highlighted: true,
      },
    ],
    yearly: [
      {
        name: "Investor Free",
        price: "Free",
        description: "Monitor portfolios with essential insights.",
        features: [
          "Portfolio Overview",
          "Watchlist Alerts",
        ],
        cta: "Start for Free",
        highlighted: false,
      },
      {
        name: "Investor Elite",
        price: "Rp 1.490.000",
        description: "Best for active investors needing auto-execution tools.",
        features: [
          "Investment Dashboard",
          "Crypto Arbitrage Scanner",
          "Auto Execute Trading (API-based)",
          "Hedging Planner",
          "DEX Spread Comparison",
          "Real-time Watchlist & Alerts",
        ],
        cta: "Start Free Trial",
        highlighted: false,
      },
      {
        name: "Investor Prime",
        price: "Rp 2.490.000",
        description: "Full-suite of tools for pro investors and portfolio managers.",
        features: [
          "All Elite Features",
          "Real-Time Market Signals (AI-Driven)",
          "Smart Portfolio Rebalancer",
          "Auto Hedge Execution",
          "On-Chain Wallet Sync",
          "Portfolio Performance Analytics",
          "VIP Support",
        ],
        cta: "Go Prime",
        highlighted: true,
      },
    ],
  },
};

const featureComparisonData: Record<"personal" | "business" | "investor", FeatureComparison[]> = {
  personal: [
    {
      category: "Core Features",
      features: [
        { name: "Spending Tracker", value: [true, true, true] },
        { name: "Bill Reminders", value: [true, true, true] },
        { name: "Auto Categorizer", value: [false, true, true] },
        { name: "Budget & Goal Tracker", value: [false, true, true] },
        { name: "Smart AI Financial Advisor", value: [false, false, true] },
        { name: "Auto Budget Allocation", value: [false, false, true] },
        { name: "Custom Spending Categories", value: [false, false, true] },
        { name: "Sync Multiple Bank Accounts", value: [false, false, true] },
        { name: "Priority Support", value: [false, false, true] },
      ],
    },
  ],
  business: [
    {
      category: "Business Tools",
      features: [
        { name: "Cashflow Tracker", value: [true, true, true] },
        { name: "Invoice Generator", value: [true, true, true] },
        { name: "Stock Manager", value: [false, true, true] },
        { name: "PDF Statement Parser", value: [false, true, true] },
        { name: "Monthly Report Export", value: [false, true, true] },
        { name: "Staff Access", value: [false, true, true] },
        { name: "Stock Unlimited", value: [false, false, true] },
        { name: "Multi Branch Report", value: [false, false, true] },
        { name: "POS & Marketplace Integration", value: [false, false, true] },
        { name: "AI Financial Summary", value: [false, false, true] },
        { name: "Priority Support", value: [false, false, true] },
      ],
    },
  ],
  investor: [
    {
      category: "Investment Tools",
      features: [
        { name: "Portfolio Tracker", value: [true, true, true] },
        { name: "Watchlist Alerts", value: [true, true, true] },
        { name: "Investment Dashboard", value: [false, true, true] },
        { name: "Crypto Arbitrage Scanner", value: [false, true, true] },
        { name: "Auto Execute Trading", value: [false, true, true] },
        { name: "Hedging Planner", value: [false, true, true] },
        { name: "DEX Spread Comparison", value: [false, true, true] },
        { name: "Real-time Market Signals (AI)", value: [false, false, true] },
        { name: "Smart Portfolio Rebalancer", value: [false, false, true] },
        { name: "Auto Hedge Execution", value: [false, false, true] },
        { name: "On-Chain Wallet Sync", value: [false, false, true] },
        { name: "Portfolio Performance Analytics", value: [false, false, true] },
        { name: "VIP Support", value: [false, false, true] },
      ],
    },
  ],
};


const faqData: Record<Role, { question: string; answer: string }[]> = {
  personal: [
    {
      question: "Can I change my plan later?",
      answer: "Yes! You can upgrade or downgrade anytime via dashboard.",
    },
    {
      question: "Does the personal plan include reminders?",
      answer: "Yes, it includes auto reminders for bill payments.",
    },
  ],
  business: [
    {
      question: "Can I manage stock and invoice together?",
      answer: "Absolutely, Business Pro includes both features.",
    },
    {
      question: "Can I export reports?",
      answer: "Yes. Business Pro supports PDF & CSV export.",
    },
  ],
  investor: [
    {
      question: "How does auto-execute trading work?",
      answer: "It uses connected exchange APIs with conditions you define.",
    },
    {
      question: "Is arbitrage scanner real-time?",
      answer: "Yes, it updates from multiple DEX and CEX feeds.",
    },
  ],
};

export default function MunuPricingPage() {
  return (
    <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-7xl w-full mx-auto">
        <motion.header
          className="text-center my-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Choose the Right Plan for You
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Start for free, then select the plan that fits each stage of your growth.
          </p>
        </motion.header>


       <Tabs defaultValue="personal" className="max-w-7xl mx-auto mb-12 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <TabsList className="mx-auto h-auto rounded-lg bg-muted p-1">
              {roles.map((role) => (
                <TabsTrigger
                  key={role}
                  value={role}
                  className="capitalize rounded-md px-4 text-muted-foreground transition-all duration-300 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  {role}
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>
          
          {roles.map((role) => (
            <TabsContent key={role} value={role}>
              <Tabs defaultValue="monthly" className="w-full mt-3">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.4 }}
                >
                  <TabsList className="grid grid-cols-2 w-fit max-w-md mx-auto">
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="yearly">
                      Yearly
                      <Badge variant="secondary" className="ml-2 bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100">
                        Save 20%
                      </Badge>
                    </TabsTrigger>
                  </TabsList>
                </motion.div>

                <TabsContent value="monthly">
                  <PricingCards plans={pricingData[role].monthly} period="monthly" />
                </TabsContent>
                <TabsContent value="yearly">
                  <PricingCards plans={pricingData[role].yearly} period="yearly" />
                </TabsContent>
              </Tabs>

              {/* Feature Comparison */}
              <motion.section
                  className="my-20"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                <h2 className="text-3xl font-bold text-center mb-10">
                  Detailed Feature Comparison
                </h2>
                <Card className="w-full overflow-auto">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-1/2">Feature</TableHead>
                          {planNames.map((plan) => (
                            <TableHead key={plan} className="text-center">
                              {plan}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {featureComparisonData[role].map((category) => (
                          <React.Fragment key={category.category}>
                            <TableRow className="bg-muted">
                              <TableCell colSpan={4} className="font-bold">
                                {category.category}
                              </TableCell>
                            </TableRow>
                            {category.features.map((f) => (
                              <TableRow key={f.name}>
                                <TableCell>{f.name}</TableCell>
                                {f.value.map((has, idx) => (
                                  <TableCell key={idx} className="text-center">
                                    {has ? (
                                      <Check className="text-green-500 mx-auto w-4 h-4" />
                                    ) : (
                                      <X className="text-muted-foreground mx-auto w-4 h-4" />
                                    )}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </React.Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.section>

              {/* FAQ Section */}
              <motion.section
                className="my-20"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-center mb-10">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                  {faqData[role].map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.section>

            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

function PricingCards({ plans, period }: { plans: Plan[]; period: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-fit mx-auto justify-items-center">
      {plans.map((plan, index) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.1,
            duration: 0.5,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.4 }}
          className="w-full min-w-sm max-w-sm"
        >
          <Card
            className={`flex flex-col h-full ${
              plan.highlighted ? "border-2 border-primary dark:border-primary" : ""
            }`}
          >
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-500 dark:text-gray-400">
                  /{period === "monthly" ? "mo" : "yr"}
                </span>
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}