"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BrainCircuit, Building, Target, User } from "lucide-react";
import { TiltButton } from "@/components/motion/tilt-button"; 

const roles = [
  {
    icon: <User className="w-8 h-8 text-blue-500" />,
    label: "Personal",
    description:
      "Achieve life goals, from saving for a vacation to buying a home. MUNU helps you manage your daily cash flow effortlessly.",
  },
  {
    icon: <Building className="w-8 h-8 text-green-500" />,
    label: "SMEs",
    description:
      "Focus on growing your business, not paperwork. Let MUNU automate your cash flow, invoices, and stock management.",
  },
  {
    icon: <Target className="w-8 h-8 text-purple-500" />,
    label: "Investor",
    description:
      "Make investment decisions with confidence. MUNU scans opportunities, provides data, and automates your strategy.",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 sm:py-32 space-y-24">
      {/* Header */}
      <motion.div
        className="text-center space-y-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Our Mission: Empowering Financial Freedom
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Finance is often complex and fragmented. We built MUNU to unify it. We
          believe everyone deserves clarity and full control over their financial
          future.
        </p>
      </motion.div>

      {/* Role Highlights */}
      <motion.div
        className="space-y-8"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn}
        custom={1}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Built for Every Ambition
          </h2>
          <p className="text-muted-foreground mt-2">
            Whatever your financial goals, MUNU is here to support you.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role, i) => (
            <motion.div
              key={role.label}
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
            >
              <Card className="bg-card/80 backdrop-blur-sm shadow-lg hover:scale-[1.03] hover:shadow-xl transition-transform duration-300">
                <CardContent className="p-6 flex flex-col items-start space-y-4">
                  {role.icon}
                  <Badge variant="secondary" className="text-sm font-semibold">
                    {role.label}
                  </Badge>
                  <p className="text-muted-foreground text-base">
                    {role.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Vision and Tech */}
      <motion.div
        className="grid md:grid-cols-2 gap-12 items-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn}
        custom={2}
      >
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Our Vision</h2>
          <p className="text-muted-foreground text-lg">
            We envision a world where financial decisions are made with{" "}
            <strong>confidence</strong>, not confusion. MUNU is your smart partner,
            delivering AI-driven insights and seamless automation so you can seize
            every opportunity.
          </p>
        </div>
        <div className="space-y-4 rounded-lg bg-muted p-8">
          <h3 className="text-xl font-semibold flex items-center">
            <BrainCircuit className="w-6 h-6 mr-3 text-primary" />
            The Intelligence Behind Simplicity
          </h3>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>AI-based transaction categorization & budget recommendations</li>
            <li>Smart OCR parsing for invoices and bank statements</li>
            <li>Crypto arbitrage scanner with auto-execution</li>
            <li>Role-based dashboards with multi-device sync</li>
          </ul>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="text-center bg-primary/10 dark:bg-primary/5 rounded-lg p-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn}
        custom={3}
      >
        <h2 className="text-3xl font-bold tracking-tight">
          Ready to Take Control?
        </h2>
        <p className="text-muted-foreground mt-4 mb-6 max-w-xl mx-auto">
          Start simplifying your financial life today. Explore our features and see
          how MUNU works for you.
        </p>
        <TiltButton size="lg" className="group" aria-label="Explore Features">
          Explore Features
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </TiltButton>
      </motion.div>
    </section>
  );
}
