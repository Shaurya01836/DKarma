"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 750], [1, 0]);
  const translateY = useTransform(scrollY, [0, 750], [0, -100]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number],
      },
    },
  };

  if (!mounted) return null;

  return (
    <section className="relative lg:min-h-screen overflow-hidden">

      
      {/* Earth Image as Horizon */}
      <motion.div
        className="absolute left-1/2 bottom-16 transform -translate-x-1/2 translate-y-[40%] w-full flex justify-center pointer-events-none z-0"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{ maxWidth: "100vw" }}
      >
        <div className="relative w-[900px] h-[400px] sm:w-[1200px] sm:h-[500px]">
          <Image
            src="https://res.cloudinary.com/dg2q2tzbv/image/upload/v1752832833/upscalemedia-transformed_1_1_d1o9p5.png"
            alt="Earth Horizon"
            width={1200}
            height={500}
            className="w-full h-full object-cover object-top shadow-2xl select-none"
            draggable={false}
          />
        </div>
      </motion.div>

      {/* Hero Content with Scroll Animation */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen -mt-32"
        style={{ opacity, y: translateY }}
      >
        <motion.div
          className="text-center space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Heading */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
              <span className="bg-gradient-to-r from-primary via-primary-hover to-primary bg-clip-text text-transparent">
                Decentralized Freelancing
              </span>
              <br />
              <span className="text-4xl sm:text-5xl lg:text-6xl">Platform</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-slate-300 leading-relaxed">
              Connect with global talent on the blockchain. Secure payments,
              transparent escrows, and zero platform fees.
            </p>
          </motion.div>

          {/* CTA Buttons */}
        </motion.div>
      </motion.div>
    </section>
  );
}
