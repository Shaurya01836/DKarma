"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  CodeBracketIcon,
  PaintBrushIcon,
  MegaphoneIcon,
  PencilSquareIcon,
  FilmIcon,
  CpuChipIcon,
  MusicalNoteIcon,
  BriefcaseIcon,
  UserGroupIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

const cardItems = [
  {
    title: "Programming & Tech",
    icon: CodeBracketIcon,
    iconColor: "text-blue-400",
  },
  {
    title: "Graphics & Design",
    icon: PaintBrushIcon,
    iconColor: "text-emerald-400",
  },
  {
    title: "Digital Marketing",
    icon: MegaphoneIcon,
    iconColor: "text-purple-400",
  },
  {
    title: "Writing & Translation",
    icon: PencilSquareIcon,
    iconColor: "text-orange-400",
  },
  {
    title: "Video & Animation",
    icon: FilmIcon,
    iconColor: "text-red-400",
  },
  {
    title: "AI Services",
    icon: CpuChipIcon,
    iconColor: "text-indigo-400",
  },
  {
    title: "Music & Audio",
    icon: MusicalNoteIcon,
    iconColor: "text-pink-400",
  },
  {
    title: "Business",
    icon: BriefcaseIcon,
    iconColor: "text-slate-400",
  },
  {
    title: "Consulting",
    icon: UserGroupIcon,
    iconColor: "text-cyan-400",
  },
];

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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function GlareCardDemo() {
  return (
    <section className="relative py-10 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <SparklesIcon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-slate-300">
              Explore Categories
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Discover Your Perfect
            <br />
            <span className="bg-gradient-to-r from-primary via-primary-hover to-primary bg-clip-text text-transparent">
              Service Category
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-300 leading-relaxed">
            From cutting-edge technology to creative design, find the perfect
            category that matches your skills and business needs.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-4 sm:gap-6"
        >
          {cardItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.3 },
                }}
                className="group"
              >
                <div className="relative h-32 sm:h-36 p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 overflow-hidden">
                  {/* Content */}
                  <div className="flex flex-col items-center justify-center h-full space-y-3">
                    {/* Icon */}
                    <div className="">
                      <Icon
                        className={`h-5 w-5 sm:h-6 sm:w-6 ${item.iconColor} transition-colors duration-300 group-hover:text-white`}
                      />
                    </div>

                    {/* Text Content */}
                    <div className="text-center space-y-1">
                      <h3 className="text-xs sm:text-sm font-semibold text-white transition-colors duration-300 leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
