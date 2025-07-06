"use client";
import React from "react";
import { motion } from "framer-motion";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import { HeroVideoDialog } from "../magicui/HeroVideoDialog";

export function HeroSection() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Typing:", e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Search submitted");
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-6 text-foreground pt-32 md:pt-32">
      <div className="max-w-6xl w-full text-center space-y-10">
        <motion.div
          className="inline-block px-5 py-1.5 text-sm rounded-full bg-surface border border-border text-muted-foreground tracking-wide"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🚀 Web3-Powered Freelancing Revolution
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight font-display"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-hover to-primary">
            Decentralized Career
          </span>{" "}
          Starts Here
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-sans"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Connect, collaborate, and earn trustlessly using smart contracts. Join
          the global shift to secure, transparent freelance ecosystems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <PlaceholdersAndVanishInput
            placeholders={[
              "Search blockchain-based gigs...",
              "Find Solidity experts...",
              "Post an escrow-protected task...",
              "Hire contributors for your DAO...",
            ]}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </motion.div>

        <motion.div
          className="flex justify-center pt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <div className="relative">
            <HeroVideoDialog
              className="block dark:hidden"
              animationStyle="from-center"
              videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
              thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
              thumbnailAlt="Hero Video"
            />
            <HeroVideoDialog
              className="hidden dark:block"
              animationStyle="from-center"
              videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
              thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
              thumbnailAlt="Hero Video"
            />
          </div>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            "Smart Contract Payments",
            "Decentralized Hiring",
            "Trustless Workflows",
            "DAO Collaboration",
          ].map((label, index) => (
            <span
              key={index}
              className="px-4 py-1.5 rounded-full bg-surface border border-border text-sm text-muted-foreground"
            >
              {label}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-muted-foreground pt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div>
            <span className="text-white text-2xl font-bold">15K+</span>
            <div>Verified Web3 Freelancers</div>
          </div>
          <div>
            <span className="text-white text-2xl font-bold">200+</span>
            <div>Trusted DAOs & Projects</div>
          </div>
          <div>
            <span className="text-white text-2xl font-bold">$100M+</span>
            <div>Secured via Smart Contracts</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
