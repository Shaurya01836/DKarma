"use client";

import React, { useState } from "react";
import { WobbleCard } from "../ui/wobble-card";

const freelancerCards = [
  {
    title: "Smart Contracts",
    description: "Get paid only when work is complete and verified via blockchain-backed contracts.",
    bg: "bg-indigo-700",
    img: "https://ui.aceternity.com/linear.webp",
    span: "col-span-1 lg:col-span-2 h-full min-h-[500px] lg:min-h-[300px]",
  },
  {
    title: "Verified Clients",
    description: "Avoid scams and fake jobs. Only verified clients with reputation can post.",
    bg: "bg-emerald-700",
    span: "col-span-1 min-h-[300px]",
  },
  {
    title: "Dispute Resolution",
    description: "Raise disputes and get fair resolution with timeline-based evidence checks.",
    bg: "bg-pink-800",
    img: "https://ui.aceternity.com/linear.webp",
    span: "col-span-1 lg:col-span-3 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]",
  },
];

const clientCards = [
  {
    title: "Top Freelancers",
    description: "Access a pool of top-rated, verified freelancers with proven delivery.",
    bg: "bg-blue-800",
    img: "https://ui.aceternity.com/linear.webp",
    span: "col-span-1 lg:col-span-2 h-full min-h-[500px] lg:min-h-[300px]",
  },
  {
    title: "Secure Payments",
    description: "Funds held in escrow. Only released after work is accepted.",
    bg: "bg-yellow-600",
    span: "col-span-1 min-h-[300px]",
  },
  {
    title: "Project Milestones",
    description: "Split work into clear milestones and track accountability with ease.",
    bg: "bg-purple-800",
    img: "https://ui.aceternity.com/linear.webp",
    span: "col-span-1 lg:col-span-3 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]",
  },
];

export function WobbleCardDemo() {
  const [view, setView] = useState<"freelancer" | "client">("freelancer");
  const cards = view === "freelancer" ? freelancerCards : clientCards;

  return (
    <div className="max-w-7xl mx-auto w-full py-20 px-4">
      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => setView("freelancer")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition ${
            view === "freelancer"
              ? "bg-primary text-white"
              : "bg-muted text-foreground"
          }`}
        >
          Freelancer View
        </button>
        <button
          onClick={() => setView("client")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition ${
            view === "client"
              ? "bg-primary text-white"
              : "bg-muted text-foreground"
          }`}
        >
          Client View
        </button>
      </div>

      {/* Grid of Cards with same layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <WobbleCard key={index} containerClassName={`${card.span} ${card.bg}`}>
            <div className="max-w-sm">
              <h2 className="text-left text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                {card.title}
              </h2>
              <p className="mt-4 text-left text-base/6 text-neutral-200">
                {card.description}
              </p>
            </div>
            {card.img && (
              <img
                src={card.img}
                width={500}
                height={500}
                alt="card visual"
                className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
              />
            )}
          </WobbleCard>
        ))}
      </div>
    </div>
  );
}
