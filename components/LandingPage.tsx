"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ServicesSection } from "./ServicesSection";
import { WiseStyleHero } from "./WiseStyleHero";
import MunuScrollPage from "./scroll/aboutMunu";
import { MunuCommunity } from "./MunuCommunity";
import { MunuTestimonials } from "./MunuTestimonial";

const fadeVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export function MunuLandingPage() {
  // const dashboardRef = useRef<HTMLDivElement>(null);
  // const { scrollYProgress } = useScroll({
  //   target: dashboardRef,
  //   offset: ["start start", "end start"],
  // });

  // const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // refs & visibility
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { margin: "-10% 0px -10% 0px" });

  // const scrollRef = useRef(null);
  // const scrollInView = useInView(scrollRef, { margin: "-10% 0px -10% 0px" });

  const testimonialRef = useRef(null);
  const testimonialInView = useInView(testimonialRef, { margin: "-10% 0px -10% 0px" });

  const communityRef = useRef(null);
  const communityInView = useInView(communityRef, { margin: "-10% 0px -10% 0px" });

  const serviceRef = useRef(null);
  const serviceInView = useInView(serviceRef, { margin: "-10% 0px -10% 0px" });

  return (
    <div className="flex flex-col min-h-screen bg-background" suppressHydrationWarning>
      <main className="flex-1">
        <motion.div
          ref={heroRef}
          variants={fadeVariants}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
        >
          <WiseStyleHero />
        </motion.div>

        <MunuScrollPage />

        <motion.div
          ref={testimonialRef}
          variants={fadeVariants}
          initial="hidden"
          animate={testimonialInView ? "visible" : "hidden"}
        >
          <MunuTestimonials />
        </motion.div>

        <motion.div
          ref={communityRef}
          variants={fadeVariants}
          initial="hidden"
          animate={communityInView ? "visible" : "hidden"}
        >
          <MunuCommunity />
        </motion.div>

        <motion.div
          ref={serviceRef}
          variants={fadeVariants}
          initial="hidden"
          animate={serviceInView ? "visible" : "hidden"}
        >
          <ServicesSection />
        </motion.div>
      </main>
    </div>
  );
}
