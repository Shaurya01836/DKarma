"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const disputes = [
  {
    id: 1,
    title: "Smart Contract Security Audit",
    organization: "DeFi Protocol",
    reason: "Incomplete deliverables",
    status: "Voting",
    progress: 65,
    evidence: ["test_results.json"],
    created: "2 days ago",
    resolution: null,
  },
  {
    id: 2,
    title: "Mobile App Development",
    organization: "GameFi Startup",
    reason: "Late delivery",
    status: "Resolved",
    progress: 100,
    evidence: [],
    created: "5 days ago",
    resolution: {
      title: "Dispute Resolved",
      details: [
        "Resolution: Favor Freelancer",
        "Payment released with 10% penalty to organization",
      ],
    },
  },
];

export default function DisputeCenter() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-background)] via-[var(--color-surface)] to-[var(--color-background)] text-[var(--color-foreground)] font-sans">
      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-b border-[var(--color-border)] pb-4">
          <div>
            <h1 className="text-4xl font-bold text-[var(--color-foreground)] font-display mb-1">Dispute Center</h1>
            <p className="text-[var(--color-muted)] text-lg font-sans">Manage and participate in task disputes</p>
          </div>
          <span className="text-lg font-semibold text-[var(--color-muted)]">Total {disputes.length}</span>
        </div>
        {/* Dispute Cards */}
        <div className="space-y-8">
          {disputes.map((d) => (
            <Card key={d.id} className="bg-[var(--color-surface)]/90 border border-[var(--color-border)] shadow-xl rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-[var(--color-foreground)] font-display">{d.title}</h2>
                  <Badge className={`px-4 py-1 rounded-full text-base font-bold ${d.status === "Voting" ? "bg-[var(--color-muted)]/30 text-[var(--color-foreground)]" : "bg-[var(--color-success)]/30 text-[var(--color-success)]"}`}>{d.status}</Badge>
                </div>
                <div className="text-[var(--color-muted)] text-sm mb-4 font-sans">
                  Organization: {d.organization} • Reason: {d.reason}
                </div>
                {/* Progress Bar */}
                <div className="w-full h-3 bg-[var(--color-border)]/60 rounded-full mb-4 overflow-hidden">
                  <div
                    className="h-3 bg-gradient-to-r from-[var(--color-success)] to-[var(--color-primary)] rounded-full transition-all duration-300"
                    style={{ width: `${d.progress}%` }}
                  ></div>
                </div>
                {/* Evidence Files */}
                {d.evidence.length > 0 && (
                  <div className="mb-4">
                    <span className="font-semibold text-[var(--color-foreground)] text-sm">Evidence Files:</span>
                    <div className="flex gap-2 mt-2">
                      {d.evidence.map((file, i) => (
                        <span key={i} className="bg-[var(--color-muted)]/30 text-[var(--color-foreground)] px-3 py-1 rounded-lg text-xs font-mono font-semibold">
                          {file}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {/* Resolution */}
                {d.resolution && (
                  <div className="bg-[var(--color-muted)]/40 text-[var(--color-foreground)] rounded-xl p-4 mb-2 mt-2 text-sm font-sans">
                    <div className="font-bold mb-1">{d.resolution.title}</div>
                    {d.resolution.details.map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                )}
                <div className="text-xs text-[var(--color-muted)] text-right mt-2">Created {d.created}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
} 