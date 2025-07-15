"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const summary = [
  {
    label: "Available Balance",
    value: "8.3 ETH",
    sub: "Ready to withdraw",
  },
  {
    label: "Escrowed Funds",
    value: "12.5 ETH",
    sub: "Pending task completion",
  },
  {
    label: "Total Earnings",
    value: "20.8 ETH",
    sub: "All time earnings",
  },
];

const tabs = ["Recent Transactions", "Earning Analytics"];

export default function Payments() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="min-h-screen text-[var(--color-foreground)] font-sans">
      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-b border-[var(--color-border)] pb-4">
          <div>
            <h1 className="text-4xl font-bold text-[var(--color-foreground)] font-display mb-1">Payments</h1>
            <p className="text-[var(--color-muted)] text-lg font-sans">Manage your earnings and withdrawals</p>
          </div>
          <Button className="bg-[var(--color-muted)]/40 text-[var(--color-foreground)] font-bold px-6 py-2 rounded-xl shadow-none hover:bg-[var(--color-muted)]/60" variant="ghost">
            Withdrawal Funds
          </Button>
        </div>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {summary.map((s, i) => (
            <Card key={i} className="bg-[var(--color-surface)]/90 border border-[var(--color-border)] shadow-xl rounded-2xl">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="text-lg font-semibold text-[var(--color-muted)] mb-2">{s.label}</div>
                <div className="text-2xl font-bold text-[var(--color-foreground)] mb-1 font-display">{s.value}</div>
                <div className="text-base font-bold text-[var(--color-muted)]">{s.sub}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Tabs */}
        <div className="flex bg-[var(--color-muted)]/20 rounded-xl mb-8 overflow-hidden">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-6 py-3 text-lg font-bold transition-all duration-300 ${
                activeTab === tab
                  ? "bg-[var(--color-muted)]/40 text-[var(--color-foreground)] rounded-xl"
                  : "text-[var(--color-foreground)]/70 hover:bg-[var(--color-muted)]/30"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Transaction History */}
        <Card className="bg-[var(--color-surface)]/90 border border-[var(--color-border)] shadow-xl rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-[var(--color-foreground)] font-display mb-6">Transaction History</h2>
            <div className="space-y-6">
              {/* Placeholder cards for transactions */}
              <div className="h-20 bg-[var(--color-muted)]/30 rounded-xl mb-2 animate-pulse" />
              <div className="h-20 bg-[var(--color-muted)]/30 rounded-xl mb-2 animate-pulse" />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
} 