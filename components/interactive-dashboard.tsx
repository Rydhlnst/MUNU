"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Wallet } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

export function InteractiveDashboardMockup() {
  const rawValue = useMotionValue(0);
  const springValue = useSpring(rawValue, { damping: 20, stiffness: 100 });

  const formattedValue = useTransform(springValue, (val) =>
    val.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );

  useEffect(() => {
    // Trigger count-up
    rawValue.set(17298.92);
  }, [rawValue]);

  const barHeights = [0.4, 0.6, 0.3, 0.8, 0.5, 0.7];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const barVariant = {
    hidden: { scaleY: 0, transformOrigin: "bottom" },
    show: { scaleY: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const transactionVariants = {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.2, duration: 0.4 },
    }),
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl bg-card/80 backdrop-blur-sm overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-muted-foreground font-normal">
          <Wallet size={18} /> Total Saldo
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <h2 className="text-4xl font-bold tracking-tight mb-4">
          <span className="text-muted-foreground">$</span>
          <motion.span>{formattedValue}</motion.span>
        </h2>

        <motion.div
          className="h-24 w-full flex items-end gap-2 border-b pb-2 mb-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {barHeights.map((height, i) => (
            <motion.div
              key={i}
              className="w-full"
              style={{ height: `${height * 100}%` }}
              variants={barVariant}
            >
              <div className="chart-bar w-full h-full bg-primary rounded-t-sm" />
            </motion.div>
          ))}
        </motion.div>

        {/* Transaction List */}
        <AnimatePresence>
          {[
            {
              icon: <TrendingUp className="text-red-500" size={16} />,
              label: "Spotify Subscription",
              value: "-$9.99",
              color: "text-red-500",
              bg: "bg-red-100 dark:bg-red-900/50",
            },
            {
              icon: <DollarSign className="text-primary" size={16} />,
              label: "Monthly Salary",
              value: "+$3,200.00",
              color: "text-primary",
              bg: "bg-green-100 dark:bg-green-900/50",
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="transaction-item flex justify-between items-center py-2"
              custom={i}
              variants={transactionVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${item.bg}`}>{item.icon}</div>
                <span className="font-medium">{item.label}</span>
              </div>
              <span className={`font-mono ${item.color}`}>{item.value}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
