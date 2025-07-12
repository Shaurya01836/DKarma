"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Award,
  CheckCircle,
  Users,
  TrendingUp,
  Lock,
  Star,
} from "lucide-react";

export default function ProfessionalBentoGrid() {
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number],
      },
    },
  };

  const reputationData = [
    { name: "Projects", value: 247, icon: CheckCircle },
    { name: "Rating", value: 4.9, icon: Star },
    { name: "Clients", value: 89, icon: Users },
    { name: "Growth", value: "+32%", icon: TrendingUp },
  ];

  return (
    <section className="py-24 ">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Empowering Freelancers with
            <span className="block bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Decentralized Innovation
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-2xl text-lg text-slate-300"
          >
            Redefining trust, ownership, and work in the decentralized era
            through cutting-edge blockchain technology
          </motion.p>
        </motion.div>

        {/* Responsive, balanced grid layout */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid gap-8 lg:grid-cols-3 auto-rows-fr"
        >
          {/* Decentralized Identity */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-between min-h-[380px] bg-black/80 backdrop-blur-sm rounded-3xl border border-primary/20 overflow-hidden p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Decentralized Identity
                </h3>
                <p className="text-sm text-primary">
                  Self-sovereign profiles
                </p>
              </div>
            </div>
            <p className="text-slate-300 mb-6">
              Manage your Web3 profile, portfolio, and credentials using
              secure, self-sovereign identities (DIDs). Own your
              professional reputation forever.
            </p>

            {/* Mock Profile Interface */}
            <div className="bg-black/60 rounded-2xl p-6 border border-primary/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  JS
                </div>
                <div>
                  <h4 className="font-semibold text-white">John Smith</h4>
                  <p className="text-sm text-primary">
                    Senior Full-Stack Developer
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-xs text-primary">
                      Verified DID
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Reputation Score</span>
                  <span className="font-semibold text-white">4.9/5.0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Completed Jobs</span>
                  <span className="font-semibold text-white">247</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Total Earned</span>
                  <span className="font-semibold text-white">$156,340</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trustless Escrow */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-between min-h-[380px] bg-black/80 backdrop-blur-sm rounded-3xl border border-purple-500/20 overflow-hidden p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Trustless Escrow
                </h3>
                <p className="text-sm text-purple-400">
                  Automated payments
                </p>
              </div>
            </div>
            <p className="text-slate-300 mb-6">
              Funds are securely locked in smart contracts and auto-released
              on milestone delivery—no middleman needed.
            </p>

            {/* Escrow Flow Visualization */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  1
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">
                    Funds Deposited
                  </p>
                  <p className="text-xs text-primary">
                    Client locks payment in escrow
                  </p>
                </div>
                <CheckCircle className="w-5 h-5 text-primary " />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  2
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">
                    Work in Progress
                  </p>
                  <p className="text-xs text-purple-400">
                    Freelancer completes milestones
                  </p>
                </div>
                <div className="w-5 h-5 bg-purple-500 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  3
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-pink-400">
                    Auto-Release
                  </p>
                  <p className="text-xs text-slate-400">
                    Payment released automatically
                  </p>
                </div>
                <div className="w-5 h-5 border-2 border-pink-500 rounded-full"></div>
              </div>
            </div>
          </motion.div>

          {/* On-chain Reputation */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-between min-h-[380px] bg-black/80 backdrop-blur-sm rounded-3xl border border-pink-500/20 overflow-hidden p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-primary rounded-2xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  On-chain Reputation
                </h3>
                <p className="text-sm text-pink-400">
                  Verifiable achievements
                </p>
              </div>
            </div>
            <p className="text-slate-300 mb-6">
              Build a transparent, verifiable reputation based on completed
              work, ratings, and community endorsements.
            </p>

            {/* Reputation Metrics */}
            <div className="grid grid-cols-2 gap-4">
              {reputationData.map((metric, index) => (
                <div
                  key={index}
                  className="bg-black/60 rounded-xl p-4 border border-pink-500/20"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <metric.icon className="w-4 h-4 text-pink-400" />
                    <span className="text-xs text-pink-400">
                      {metric.name}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

    
        </motion.div>
      </div>
    </section>
  );
}
