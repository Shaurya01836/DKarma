"use client";

import { motion } from "motion/react";

export function HeroSection() {
  return (
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center pt-24">

      <div className="absolute inset-y-0 left-0 h-full w-px bg-border">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-border">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-border">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-display font-bold text-foreground md:text-4xl lg:text-7xl">
          {"Empowering freelancers with secure, trusted work opportunities"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.08,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-sans font-normal text-muted"
        >
          Discover a new era of freelancing where trust, reputation, and smart
          work commitments ensure quality results for both clients and
          professionals.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.2 }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="w-60 transform rounded-lg bg-primary px-6 py-2 font-display font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover">
            Get Started
          </button>
          <button className="w-60 transform rounded-lg border border-border bg-surface px-6 py-2 font-display font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted">
            Learn More
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.4 }}
          className="relative z-10 mt-20 rounded-3xl border border-border bg-muted/10 p-4 shadow-md"
        >
          <div className="w-full overflow-hidden rounded-xl border border-border">
            <img
              src="https://assets.aceternity.com/pro/aceternity-landing.webp"
              alt="Freelance platform preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
