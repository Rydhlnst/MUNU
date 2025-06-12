"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

const imageVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.34, 1.56, 0.64, 1], // bounce-like
    },
  },
};

const slideVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.3 + i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function ThanksPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        <motion.div
          className="w-full flex justify-center items-center"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <Image src={"/success.svg"} alt="Success" width={450} height={450} />
        </motion.div>

        <div className="space-y-6">
          {[
            <h1 key="title" className="text-3xl font-bold text-foreground">
              You’ve Successfully Joined the Waitlist!
            </h1>,
            <p key="desc" className="text-muted-foreground">
              Thank you for signing up. We’ll reach out to you once the beta version of{" "}
              <span className="font-semibold text-primary">MUNU</span> is ready to launch.
            </p>,
            <div key="button">
              <Button asChild className="mt-4">
                <Link href="/">Back to Homepage</Link>
              </Button>
            </div>,
          ].map((element, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
            >
              {element}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
