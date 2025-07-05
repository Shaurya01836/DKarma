"use client";
import React from "react";
import { motion } from "framer-motion";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

export function HeroSection() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Typing:", e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Search submitted");
  };
  return (
    <section className="w-full min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl text-center space-y-6">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Build Smarter with{" "}
          <span className="text-[#3b82f6]">AI-Powered Workflows</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Supercharge your productivity and ship projects faster than ever with
          our intuitive tools, automation, and AI insights.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-md mx-auto"
        >
          <PlaceholdersAndVanishInput
            placeholders={[
              "Find top freelance talent...",
              "Search tasks by domain — e.g., Web3, UI/UX, Solidity",
              "Explore secure contracts...",
              "Track smart payments...",
            ]}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </motion.div>
      </div>
    </section>
  );
}
