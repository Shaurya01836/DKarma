"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Clock } from "lucide-react"

const proposals = [
  {
    id: 1,
    title: "Smart Contract Security Audit",
    organization: "DeFi Protocol",
    status: "Pending",
    progress: 65,
    price: "3.5 ETH",
    created: "2 days ago",
    action: "Check Status",
  },
  {
    id: 2,
    title: "Mobile App Development",
    organization: "GameFi Startup",
    status: "Accepted",
    progress: 100,
    price: "3.5 ETH",
    created: "5 days ago",
    action: "Start Work",
  },
  {
    id: 3,
    title: "NFT Marketplace Frontend",
    organization: "CryptoArt Studio",
    status: "Pending",
    progress: 40,
    price: "2.8 ETH",
    created: "1 day ago",
    action: "Check Status",
  },
]

export default function ProposalRequested() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
      case "Pending":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const getProgressColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "from-emerald-600 to-emerald-500"
      case "Pending":
        return "from-amber-600 to-amber-500"
      default:
        return "from-blue-600 to-blue-500"
    }
  }

  const getActionButtonStyle = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
      case "Pending":
        return "bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
      default:
        return "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Accepted":
        return <CheckCircle className="w-5 h-5 mr-2" />
      case "Pending":
        return <Clock className="w-5 h-5 mr-2" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen text-[var(--color-foreground)] font-sans relative overflow-hidden">
      {/* Animated background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 " />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent animate-pulse" />
      </div>

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-[var(--color-foreground)] font-display mb-1">Proposal Requests</h1>
            <p className="text-[var(--color-muted)] text-lg font-sans">Your proposals for tasks</p>
          </div>
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl px-6 py-3">
            <span className="text-lg font-semibold text-white">
              Total: <span className="text-blue-300">{proposals.length}</span>
            </span>
          </div>
        </div>

        {/* Proposal Cards */}
        <div className="space-y-6">
          {proposals.map((p) => (
            <Card
              key={p.id}
              className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:border-blue-500/50"
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-white font-display">{p.title}</h2>
                      <Badge className={`border rounded-full ${getStatusColor(p.status)}`}>{p.status}</Badge>
                    </div>
                    <div className="text-gray-400 text-sm font-sans">
                      Organization: <span className="text-gray-300">{p.organization}</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-emerald-300 font-display whitespace-nowrap">{p.price}</div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className={p.status === "Accepted" ? "text-emerald-300 font-bold" : "text-amber-300 font-bold"}>
                      {p.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${getProgressColor(p.status)} h-2 rounded-full transition-all duration-300 shadow-md`}
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <Button
                    className={`w-full md:w-auto ${getActionButtonStyle(p.status)} transition-all duration-200 font-semibold`}
                  >
                    {getStatusIcon(p.status)}
                    {p.action}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <div className="text-sm text-gray-500">Created {p.created}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {proposals.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
              <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 font-display">No proposals yet</h3>
              <p className="text-gray-400 font-sans">
                You haven&apos;t submitted any proposals yet. Browse available tasks to get started.
              </p>
              <Button className="mt-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 font-semibold">
                Browse Tasks
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
