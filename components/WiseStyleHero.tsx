import { motion } from "framer-motion";
import { TiltButton } from "./motion/tilt-button";

const SplitText = ({ children }: { children: string }) => {
  return (
    <>
      {children.split(" ").map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em]"
          style={{ whiteSpace: "pre" }}
          whileHover={{
            y: -6,
            transition: { type: "spring", stiffness: 250, damping: 14 },
          }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
};


const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export function WiseStyleHero() {
  return (
    <section
      suppressHydrationWarning
      className="flex flex-col items-center justify-center w-full min-h-screen bg-white dark:bg-background text-black dark:text-white px-4 py-16"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Headline */}
        <motion.div
          className="mb-8 headline-text max-w-[90vw] px-4 sm:px-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {["FINANCE, SIMPLIFIED.", "ANYWHERE. ANYTIME.", "MUNU"].map((line, i) => (
            <motion.div key={i} variants={itemVariants}>
              <h1
                className="text-balance text-center font-black uppercase tracking-tight break-normal leading-tight"
                style={{
                  fontSize: "clamp(2rem, 5vw, 4.5rem)",
                  lineHeight: "1.25",
                }}
              >
                <SplitText>{line}</SplitText>
              </h1>
            </motion.div>
          ))}
        </motion.div>

        {/* Subheadline */}
        <motion.p
          className="max-w-[330px] md:max-w-xl text-md md:text-xl text-slate-700 dark:text-slate-300 mb-10 cursor-pointer"
          variants={itemVariants}
          initial="hidden"
          animate="show"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <SplitText>
            Your global financial partner — track your money, invest with ease,
            and unlock smarter savings in every currency.
          </SplitText>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants}>
            <TiltButton
              size="lg"
              className="bg-primary font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-6 text-white dark:text-white"
            >
              Open an account
            </TiltButton>
          </motion.div>

          <motion.div variants={itemVariants}>
            <TiltButton
              size="lg"
              variant="outline"
              className="border-slate-300 hover:bg-white/90 dark:border-slate-600 text-black dark:text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-6"
            >
              Send money now
            </TiltButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
