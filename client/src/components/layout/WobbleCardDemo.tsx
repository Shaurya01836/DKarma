"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const freelancerCards = [
  {
    title: "Smart Contracts",
    description:
      "Get paid only when work is complete and verified via blockchain-backed contracts.",

    img: "https://ui.aceternity.com/linear.webp",
  },
  {
    title: "Verified Clients",
    description:
      "Avoid scams and fake jobs. Only verified clients with reputation can post.",

    img: "https://ui.aceternity.com/linear.webp",
  },
  {
    title: "Dispute Resolution",
    description:
      "Raise disputes and get fair resolution with timeline-based evidence checks.",

    img: "https://ui.aceternity.com/linear.webp",
  },
];

const clientCards = [
  {
    title: "Top Freelancers",
    description:
      "Access a pool of top-rated, verified freelancers with proven delivery.",

    img: "https://ui.aceternity.com/linear.webp",
  },
  {
    title: "Secure Payments",
    description: "Funds held in escrow. Only released after work is accepted.",

    img: "",
  },
  {
    title: "Project Milestones",
    description:
      "Split work into clear milestones and track accountability with ease.",

    img: "https://ui.aceternity.com/linear.webp",
  },
];

const WobbleCard = ({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / 20;
    const y = (clientY - (rect.top + rect.height / 2)) / 20;
    setMousePosition({ x, y });
  };

  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovering
          ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)`
          : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
        transition: "transform 0.1s ease-out",
      }}
      className={`mx-auto w-full relative rounded-2xl overflow-hidden ${containerClassName}`}
    >
      <motion.div
        style={{
          transform: isHovering
            ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.03, 1.03, 1)`
            : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
          transition: "transform 0.1s ease-out",
        }}
        className={`h-full  ${className}`}
      >
        {children}
      </motion.div>
    </motion.section>
  );
};

export function WobbleCardDemo() {
  const [view, setView] = useState<"freelancer" | "client">("freelancer");
  const cards = view === "freelancer" ? freelancerCards : clientCards;

  return (
    <div
      className="max-w-7xl mx-auto w-full py-20 px-4"
      style={{ color: "#e5e7eb" }}
    >
      {/* Toggle */}
      <div className="flex justify-center mb-12">
        <div
          className="relative flex items-center p-1 rounded-full border-2 border-opacity-20"
          style={{ backgroundColor: "#161b22", borderColor: "#2c2f36" }}
        >
          <motion.div
            className="absolute top-1 bottom-1 rounded-full"
            style={{ backgroundColor: "#3b82f6" }}
            animate={{
              left: view === "freelancer" ? "4px" : "50%",
              width: "calc(50% - 4px)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <motion.button
            onClick={() => setView("freelancer")}
            className="relative z-10 px-8 py-3 rounded-full text-sm font-medium min-w-[140px]"
            style={{ color: view === "freelancer" ? "#ffffff" : "#9ca3af" }}
          >
            Freelancer
          </motion.button>
          <motion.button
            onClick={() => setView("client")}
            className="relative z-10 px-8 py-3 rounded-full text-sm font-medium min-w-[140px]"
            style={{ color: view === "client" ? "#ffffff" : "#9ca3af" }}
          >
            Client
          </motion.button>
        </div>
      </div>

      {/* Title */}
      <motion.div
        key={`title-${view}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-hover)] to-primary">
          {view === "freelancer" ? "For Freelancers" : "For Clients"}
        </h2>
        <div className="flex justify-center mt-2 mb-2">
          <span className="block w-16 h-1 rounded-full bg-gradient-to-r from-[var(--color-primary)] via-primary-hover to-primary opacity-70"></span>
        </div>
        <p className="text-base mt-2 text-gray-400">
          {view === "freelancer"
            ? "Build your career with confidence and security"
            : "Find and work with the best talent effortlessly"}
        </p>
      </motion.div>

      {/* Cards Layout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`cards-${view}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Top Left: Large with Image */}
          <div className="lg:col-span-2">
            <WobbleCard
              containerClassName="bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg"
              className="h-full"
            >
              {cards[0].img && (
                <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
                  <Image
                    src={cards[0].img}
                    alt="Card Visual"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{cards[0].title}</h3>
                <p className="text-sm">{cards[0].description}</p>
              </div>
            </WobbleCard>
          </div>

          {/* Top Right: No Image */}
          <div>
            <WobbleCard
              containerClassName="bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg"
              className="h-full"
            >
              {cards[0].img && (
                <div className="relative w-full h-40 rounded-t-xl overflow-hidden">
                  <Image
                    src={cards[0].img}
                    alt="Card Visual"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{cards[1].title}</h3>
                <p className="text-sm">{cards[1].description}</p>
              </div>
            </WobbleCard>
          </div>

          {/* Bottom Full-Width */}
          <div className="lg:col-span-3">
            <WobbleCard
              containerClassName="bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg"
              className="h-full"
            >
              {cards[2].img && (
                <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
                  <Image
                    src={cards[2].img}
                    alt="Card Visual"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{cards[2].title}</h3>
                <p className="text-sm">{cards[2].description}</p>
              </div>
            </WobbleCard>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
