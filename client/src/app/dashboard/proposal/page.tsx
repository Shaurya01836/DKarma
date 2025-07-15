"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const proposals = [
  {
    id: 1,
    title: "Smart Contract Security Audit",
    organization: "DeFi Protocol",
    status: "Pending",
    progress: 65,
    price: "$ 3.5 ETH",
    created: "2 days ago",
    action: "Check Status",
  },
  {
    id: 2,
    title: "Mobile App Development",
    organization: "GameFi Startup",
    status: "Accepted",
    progress: 100,
    price: "$ 3.5 ETH",
    created: "5 days ago",
    action: "Start Work",
  },
  {
    id: 3,
    title: "NFT Marketplace Frontend",
    organization: "CryptoArt Studio",
    status: "Pending",
    progress: 40,
    price: "$ 2.8 ETH",
    created: "1 day ago",
    action: "Check Status",
  },
];

export default function ProposalRequested() {
  return (
    <div className="min-h-screen text-[var(--color-foreground)] font-sans">
      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-b border-[var(--color-border)] pb-4">
          <div>
            <h1 className="text-4xl font-bold text-[var(--color-foreground)] font-display mb-1">Proposal Requested</h1>
            <p className="text-[var(--color-muted)] text-lg font-sans">Your Proposals for tasks</p>
          </div>
          <span className="text-lg font-semibold text-[var(--color-muted)]">Total {proposals.length}</span>
        </div>
        {/* Proposal Cards */}
        <div className="space-y-8">
          {proposals.map((p) => (
            <Card key={p.id} className="bg-[var(--color-surface)]/90 border border-[var(--color-border)] shadow-xl rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-[var(--color-foreground)] font-display">{p.title}</h2>
                  <Badge className={`px-4 py-1 rounded-full text-base font-bold ${p.status === "Accepted" ? "bg-[var(--color-success)]/30 text-[var(--color-success)]" : "bg-[var(--color-muted)]/30 text-[var(--color-foreground)]"}`}>{p.status}</Badge>
                </div>
                <div className="text-[var(--color-muted)] text-sm mb-4 font-sans">
                  Organization: {p.organization}
                </div>
                {/* Progress Bar */}
                <div className="w-full h-3 bg-[var(--color-border)]/60 rounded-full mb-4 overflow-hidden">
                  <div
                    className="h-3 bg-gradient-to-r from-[var(--color-success)] to-[var(--color-primary)] rounded-full transition-all duration-300"
                    style={{ width: `${p.progress}%` }}
                  ></div>
                </div>
                {/* Price */}
                {p.price && (
                  <div className="mb-4 text-base font-bold text-[var(--color-foreground)] font-display">{p.price}</div>
                )}
                {/* Action Button */}
                <Button
                  className="w-full bg-[var(--color-muted)]/40 text-[var(--color-foreground)] font-bold text-lg py-3 rounded-xl mt-2 shadow-none hover:bg-[var(--color-muted)]/60"
                  variant="ghost"
                >
                  {p.action}
                </Button>
                <div className="text-xs text-[var(--color-muted)] text-right mt-2">Created {p.created}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
} 