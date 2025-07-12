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
import { GlareCard } from "../ui/glare-card";

const cardItems = [
  {
    title: "Programming & Tech",
    icon: CodeBracketIcon,
    iconColor: "text-primary",
  },
  {
    title: "Graphics & Design",
    icon: PaintBrushIcon,
    iconColor: "text-success",
  },
  {
    title: "Digital Marketing",
    icon: MegaphoneIcon,
    iconColor: "text-primary-hover",
  },
  {
    title: "Writing & Translation",
    icon: PencilSquareIcon,
    iconColor: "text-secondary",
  },
  { title: "Video & Animation", icon: FilmIcon, iconColor: "text-error" },
  { title: "AI Services", icon: CpuChipIcon, iconColor: "text-primary" },
  { title: "Music & Audio", icon: MusicalNoteIcon, iconColor: "text-muted" },
  { title: "Business", icon: BriefcaseIcon, iconColor: "text-foreground" },
  { title: "Consulting", icon: UserGroupIcon, iconColor: "text-secondary" },
];

export function GlareCardDemo() {
  return (
    <div className="relative pt-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16 px-6 sm:px-12 lg:px-32"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
          <SparklesIcon className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-slate-300">
            Explore Categories
          </span>
        </div>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4 px-6 sm:px-12 lg:px-32">
        {cardItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <GlareCard
              key={index}
              className="group flex flex-col items-center justify-center w-full h-full p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl hover:shadow-xl transition-transform duration-300 hover:scale-105"
            >
              <Icon
                className={`h-8 w-8 ${item.iconColor} transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125`}
              />
              <p className="text-[var(--color-foreground)] text-sm mt-2 font-medium text-center group-hover:text-[var(--color-primary-hover)] transition-colors duration-300">
                {item.title}
              </p>
            </GlareCard>
          );
        })}
      </div>
    </div>
  );
}
