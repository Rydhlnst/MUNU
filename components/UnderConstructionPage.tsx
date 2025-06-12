"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const bounceIn = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.34, 1.56, 0.64, 1], // Custom bounce-like ease
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const slideInItem = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const UnderConstructionPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 bg-background text-foreground">
      <motion.div
        variants={bounceIn}
        initial="hidden"
        animate="visible"
      >
        <Image
          src="/onBuild.svg"
          alt="Page Under Construction"
          height={400}
          width={400}
          className="mb-8"
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-4"
          variants={slideInItem}
        >
          This Page is Still Under Construction
        </motion.h1>

        <motion.p
          className="text-muted-foreground max-w-xl text-base md:text-lg"
          variants={slideInItem}
        >
          We&apos;re currently working hard to build something amazing for you.
          <br />
          Stay tuned — this section will be available very soon as part of the full{" "}
          <span className="text-primary">MUNU</span> experience.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default UnderConstructionPage;
