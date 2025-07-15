"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

const taskData = [
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
];

export default function WorkTask() {
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const filteredTasks = taskData.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.organization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen text-[var(--color-foreground)] font-sans">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-10 border-b border-[var(--color-border)] pb-6">
          <h1 className="text-4xl font-bold text-[var(--color-foreground)] mb-2 font-display">Explore By Tasks</h1>
          <p className="text-[var(--color-muted)] text-lg font-sans">
            Find the perfect project for your skills
          </p>
        </div>
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="flex-1 max-w-2xl">
            <PlaceholdersAndVanishInput
              placeholders={["Search tasks or organizations..."]}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </div>
          <Button
            variant="outline"
            className="border-[var(--color-border)] text-[var(--color-foreground)] font-bold px-8 py-3 rounded-xl bg-transparent font-sans shadow-md h-12"
          >
            Filter
          </Button>
        </div>
        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredTasks.map((task) => (
            <Card
              key={task.id}
              className="bg-[var(--color-surface)]/90 border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-primary)]/10 transition-all duration-500 hover:scale-[1.03] cursor-pointer group backdrop-blur-lg relative overflow-hidden shadow-xl rounded-3xl"
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
          ))}
        </div>
        {/* More Button */}
        <div className="text-center">
          <Button
            variant="outline"
            className="border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-success)]/10 font-bold px-8 py-3 rounded-xl bg-transparent font-sans shadow-md"
          >
            More
          </Button>
        </div>
      </main>
    </div>
  );
}
