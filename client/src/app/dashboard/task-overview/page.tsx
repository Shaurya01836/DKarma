"use client";

import { useState } from "react";
import {
  Search,
  Star,
  Clock,
  CheckCircle,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

const tabs = [
  { name: "Available", count: 18, active: true },
  { name: "Pending", count: 5, active: false },
  { name: "Active", count: 3, active: false },
  { name: "Completed", count: 12, active: false },
];

const taskData = {
  Available: [
    {
      id: 1,
      title: "Smart Contract Security Audit",
      organization: "DeFi Protocol",
      description:
        "Comprehensive security audit for our new lending protocol smart contracts.",
      price: "$ 3.5 ETH",
      type: "MILESTONE",
      urgent: true,
      duration: "2-3 weeks",
    },
    {
      id: 2,
      title: "NFT Marketplace Frontend",
      organization: "CryptoArt Studio",
      description:
        "Build a modern React frontend for NFT trading platform with Web3 integration.",
      price: "$ 2.8 ETH",
      type: "SINGLE",
      urgent: false,
      duration: "1-2 weeks",
    },
    {
      id: 3,
      title: "DeFi Yield Farming Protocol",
      organization: "Yield Labs",
      description:
        "Develop smart contracts for automated yield farming and liquidity mining.",
      price: "$ 4.2 ETH",
      type: "MILESTONE",
      urgent: true,
      duration: "3-4 weeks",
    },
    {
      id: 4,
      title: "Cross-chain Bridge Development",
      organization: "Bridge Protocol",
      description:
        "Create secure cross-chain bridge for token transfers between networks.",
      price: "$ 5.1 ETH",
      type: "MILESTONE",
      urgent: false,
      duration: "4-5 weeks",
    },
  ],
  Pending: [
    {
      id: 5,
      title: "DAO Governance System",
      organization: "Governance Labs",
      description:
        "Implement voting mechanisms and proposal system for decentralized governance.",
      price: "$ 3.8 ETH",
      type: "MILESTONE",
      status: "Under Review",
      appliedDate: "2 days ago",
    },
    {
      id: 6,
      title: "Token Staking Platform",
      organization: "Stake Protocol",
      description:
        "Build staking interface with reward calculation and withdrawal features.",
      price: "$ 2.5 ETH",
      type: "SINGLE",
      status: "Awaiting Response",
      appliedDate: "1 day ago",
    },
    {
      id: 7,
      title: "DEX Aggregator Interface",
      organization: "Swap Labs",
      description:
        "Create user interface for decentralized exchange aggregation service.",
      price: "$ 3.2 ETH",
      type: "SINGLE",
      status: "Interview Scheduled",
      appliedDate: "3 days ago",
    },
  ],
  Active: [
    {
      id: 8,
      title: "Lending Protocol Audit",
      organization: "Secure Finance",
      description:
        "Ongoing security audit for lending protocol smart contracts and documentation.",
      price: "$ 4.5 ETH",
      type: "MILESTONE",
      progress: 65,
      deadline: "5 days left",
    },
    {
      id: 9,
      title: "Web3 Wallet Integration",
      organization: "Wallet Connect",
      description:
        "Integrate multiple wallet providers into existing DeFi application.",
      price: "$ 1.8 ETH",
      type: "SINGLE",
      progress: 80,
      deadline: "2 days left",
    },
    {
      id: 10,
      title: "GameFi Token Economics",
      organization: "Game Protocol",
      description:
        "Design and implement tokenomics for play-to-earn gaming platform.",
      price: "$ 3.7 ETH",
      type: "MILESTONE",
      progress: 40,
      deadline: "1 week left",
    },
  ],
  Completed: [
    {
      id: 11,
      title: "Flash Loan Arbitrage Bot",
      organization: "Arbitrage Labs",
      description:
        "Developed automated arbitrage bot using flash loans across DEX platforms.",
      price: "$ 2.9 ETH",
      type: "SINGLE",
      completedDate: "1 week ago",
      rating: 5,
    },
    {
      id: 12,
      title: "Multi-sig Wallet Contract",
      organization: "Security First",
      description:
        "Created secure multi-signature wallet with advanced permission controls.",
      price: "$ 3.6 ETH",
      type: "MILESTONE",
      completedDate: "2 weeks ago",
      rating: 5,
    },
    {
      id: 13,
      title: "Prediction Market Platform",
      organization: "Predict Protocol",
      description:
        "Built decentralized prediction market with automated settlement system.",
      price: "$ 4.1 ETH",
      type: "MILESTONE",
      completedDate: "3 weeks ago",
      rating: 4,
    },
    {
      id: 14,
      title: "Liquidity Pool Analytics",
      organization: "Analytics Pro",
      description:
        "Developed comprehensive analytics dashboard for liquidity pool performance.",
      price: "$ 2.2 ETH",
      type: "SINGLE",
      completedDate: "1 month ago",
      rating: 5,
    },
  ],
};

export default function TaskOverview() {
  const [activeTab, setActiveTab] = useState("Available");

  const getTabIcon = (tabName: string) => {
    switch (tabName) {
      case "Available":
        return Search;
      case "Pending":
        return Clock;
      case "Active":
        return Play;
      case "Completed":
        return CheckCircle;
      default:
        return Search;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Typing:", e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Search submitted");
  };

  const renderTaskCard = (task: {
    id: number;
    title: string;
    description: string;
    organization: string;
    type: string;
    price: string;
    duration?: string;
    status?: string;
    appliedDate?: string;
    progress?: number;
    deadline?: string;
    rating?: number;
    completedDate?: string;
    urgent?: boolean;
  }) => {
    return (
      <Card
        key={task.id}
        className="bg-[var(--color-surface)]/90 border-[var(--color-border)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-primary)]/10 transition-all duration-500 hover:scale-[1.03] cursor-pointer group backdrop-blur-lg relative overflow-hidden shadow-xl rounded-3xl"
      >
        {task.urgent && (
          <div className="absolute top-4 right-4 z-10 animate-pulse">
            <Badge className="bg-[var(--color-error)]/30 text-[var(--color-error)] border-[var(--color-error)]/40 border rounded-full text-xs font-bold shadow-md">
              Urgent
            </Badge>
          </div>
        )}
        <CardContent className="p-6">
          <div className="flex">
            <div className="flex-1 pr-4">
              <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-1 group-hover:text-[var(--color-primary)] transition-colors duration-300 font-display">
                {task.title}
              </h3>
              <p className="text-sm font-medium text-[var(--color-muted)] mb-3 font-sans">
                {task.organization}
              </p>
              <p className="text-sm text-[var(--color-muted)]/80 mb-4 leading-relaxed font-sans">
                {task.description}
              </p>

              {/* Status-specific content */}
              {activeTab === "Available" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-[var(--color-muted)] text-xs">
                    <span>Duration: {task.duration}</span>
                  </div>
                  <p className="text-lg font-bold text-[var(--color-primary)] font-display drop-shadow-md">
                    {task.price}
                  </p>
                  <Button className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-surface)] rounded-lg py-2 transition-all duration-300 font-display font-bold shadow-md hover:shadow-lg">
                    Request to Join
                  </Button>
                </div>
              )}

              {activeTab === "Pending" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="border-[var(--color-primary)]/30 text-[var(--color-primary)] bg-[var(--color-primary)]/10 font-bold"
                    >
                      {task.status}
                    </Badge>
                    <span className="text-xs text-[var(--color-muted)]">
                      Applied {task.appliedDate}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-[var(--color-primary)] font-display drop-shadow-md">
                    {task.price}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-primary)]/10 rounded-lg py-2 bg-transparent font-sans shadow-sm"
                  >
                    View Application
                  </Button>
                </div>
              )}

              {activeTab === "Active" && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-muted)]">Progress</span>
                      <span className="text-[var(--color-primary)] font-bold">{task.progress}%</span>
                    </div>
                    <div className="w-full bg-[var(--color-border)]/40 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)] h-2 rounded-full transition-all duration-300 shadow-md"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-[var(--color-muted)]">
                      {task.deadline}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-[var(--color-primary)] font-display drop-shadow-md">
                    {task.price}
                  </p>
                  <Button className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-surface)] rounded-lg py-2 font-display font-bold shadow-md hover:shadow-lg">
                    Continue Work
                  </Button>
                </div>
              )}

              {activeTab === "Completed" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < (task.rating || 0)
                            ? "text-[var(--color-primary)] fill-[var(--color-primary)] drop-shadow-md"
                            : "text-[var(--color-muted)]"
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[var(--color-muted)]">
                      Completed {task.completedDate}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-[var(--color-primary)] font-display drop-shadow-md">
                    {task.price}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-primary)]/10 rounded-lg py-2 bg-transparent font-sans shadow-sm"
                  >
                    View Details
                  </Button>
                </div>
              )}
            </div>

            {/* Vertical Text */}
            <div className="flex items-center">
              <div className="transform rotate-90 origin-center">
                <span className="text-xs font-bold text-[var(--color-muted)] tracking-wider whitespace-nowrap font-sans">
                  {task.type}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-background)] via-[var(--color-surface)] to-[var(--color-background)] text-[var(--color-foreground)] font-sans">
      {/* Top Bar */}
      <header className="bg-[var(--color-surface)]/95 backdrop-blur-xl border-b border-[var(--color-border)] shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Left: Menu and Search */}
            <div className="flex items-center gap-4 flex-1">
              <div className="flex-1 max-w-md relative">
                <PlaceholdersAndVanishInput
                  placeholders={[
                    "Find freelance gigs...",
                    "Search by domain or org...",
                    "Secure your contracts...",
                    "Track payments live...",
                    "Search tasks or clients...",
                  ]}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-10 border-b border-[var(--color-border)] pb-6">
          <h1 className="text-4xl font-bold text-[var(--color-foreground)] mb-2 font-display">Task Overview</h1>
          <p className="text-[var(--color-muted)] text-lg font-sans">
            Manage all your tasks in one place
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-10">
          <div className="bg-[var(--color-surface)]/80 rounded-2xl p-1 inline-flex border border-[var(--color-border)] shadow-md">
            {tabs.map((tab) => {
              const IconComponent = getTabIcon(tab.name);
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 font-sans ${activeTab === tab.name
                    ? "bg-[var(--color-success)] text-[var(--color-surface)] shadow-lg scale-105"
                    : "text-[var(--color-muted)] hover:text-[var(--color-success)] hover:bg-[var(--color-success)]/10"
                    }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.name}
                  {tab.count && (
                    <span
                      className={`ml-1 px-2 py-0.5 rounded-full text-xs ${activeTab === tab.name ? "bg-[var(--color-surface)]/20" : "bg-[var(--color-surface)]/10"
                        }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {taskData[activeTab as keyof typeof taskData]?.map(renderTaskCard)}
        </div>

        {/* More Button */}
        <div className="text-center">
          <Button
            variant="outline"
            className="border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-success)]/10 font-bold px-8 py-3 rounded-xl bg-transparent font-sans shadow-md"
          >
            Load More Tasks
          </Button>
        </div>
      </main>
    </div>
  );
}
