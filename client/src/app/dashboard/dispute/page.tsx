"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, AlertTriangle, CheckCircle, Scale, BarChart3, Users, Gavel } from "lucide-react"
import { mockDisputes, mockDisputeStats } from "./data/mockData"
import DisputeOverviewTab from "./sections/DisputeOverviewTab"
import OngoingDisputesTab from "./sections/OngoingDisputesTab"
import ResolvedDisputesTab from "./sections/ResolvedDisputesTab"
import VoteHistoryTab from "./sections/VoteHistoryTab"
import { formatCurrency } from "@/utils"

export default function DisputeCenter() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const ongoingCount = mockDisputes.filter(
    (d) =>
      d.status === "ONGOING" ||
      d.status === "AWAITING_EVIDENCE" ||
      d.status === "WITNESS_VOTING" ||
      d.status === "ARBITRATOR_REVIEW",
  ).length

  const resolvedCount = mockDisputes.filter((d) => d.status === "RESOLVED").length
  const voteHistoryCount = mockDisputes.filter((d) => d.votes && d.votes.length > 0).length

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: BarChart3,
      description: "Dashboard & Analytics",
      count: null,
      color: "blue",
    },
    {
      id: "ongoing",
      label: "Ongoing Disputes",
      icon: AlertTriangle,
      description: "Active Cases",
      count: ongoingCount,
      color: "amber",
    },
    {
      id: "resolved",
      label: "Resolved Disputes",
      icon: CheckCircle,
      description: "Completed Cases",
      count: resolvedCount,
      color: "emerald",
    },
    {
      id: "vote-history",
      label: "Vote History",
      icon: Users,
      description: "Community Voting",
      count: voteHistoryCount,
      color: "violet",
    },
  ]

  const getTabColorClasses = (color: string, isActive: boolean) => {
    const colors = {
      blue: isActive
        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25"
        : "text-gray-300 hover:text-white hover:bg-blue-800/20",
      amber: isActive
        ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-500/25"
        : "text-gray-300 hover:text-white hover:bg-amber-800/20",
      emerald: isActive
        ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/25"
        : "text-gray-300 hover:text-white hover:bg-emerald-800/20",
      violet: isActive
        ? "bg-gradient-to-r from-violet-600 to-violet-500 text-white shadow-lg shadow-violet-500/25"
        : "text-gray-300 hover:text-white hover:bg-violet-800/20",
    }
    return colors[color as keyof typeof colors]
  }

  return (
  <div className="min-h-screen text-[var(--color-foreground)] font-sans">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
          <div className="space-y-2">
           <h1 className="text-4xl font-bold text-[var(--color-foreground)] font-display mb-1">
              Dispute Center
            </h1>
            <p className="text-[var(--color-muted)] text-lg font-sans">
              Manage disputes, track resolutions, and access community arbitration
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-200 font-semibold">
              <Plus className="w-4 h-4 mr-2" />
              File New Dispute
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 border-amber-700/30 backdrop-blur-sm hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-amber-300 text-sm font-semibold tracking-wide">ONGOING DISPUTES</p>
                  <p className="text-4xl font-bold text-white">{mockDisputeStats.ongoingDisputes}</p>
                  <p className="text-amber-200/70 text-xs">Requiring attention</p>
                </div>
                <div className="bg-amber-500/20 p-4 rounded-xl border border-amber-500/30">
                  <AlertTriangle className="w-7 h-7 text-amber-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border-emerald-700/30 backdrop-blur-sm hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-emerald-300 text-sm font-semibold tracking-wide">RESOLVED DISPUTES</p>
                  <p className="text-4xl font-bold text-white">{mockDisputeStats.resolvedDisputes}</p>
                  <p className="text-emerald-200/70 text-xs">Successfully closed</p>
                </div>
                <div className="bg-emerald-500/20 p-4 rounded-xl border border-emerald-500/30">
                  <CheckCircle className="w-7 h-7 text-emerald-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-700/30 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-blue-300 text-sm font-semibold tracking-wide">SUCCESS RATE</p>
                  <p className="text-4xl font-bold text-white">
                    {mockDisputeStats.resolvedDisputes > 0
                      ? Math.round((mockDisputeStats.wonDisputes / mockDisputeStats.resolvedDisputes) * 100)
                      : 0}
                    %
                  </p>
                  <p className="text-blue-200/70 text-xs">Cases won</p>
                </div>
                <div className="bg-blue-500/20 p-4 rounded-xl border border-blue-500/30">
                  <Scale className="w-7 h-7 text-blue-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-violet-900/30 to-violet-800/20 border-violet-700/30 backdrop-blur-sm hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-violet-300 text-sm font-semibold tracking-wide">AMOUNT RECOVERED</p>
                  <p className="text-4xl font-bold text-white">
                    {formatCurrency(mockDisputeStats.totalAmountRecovered)}
                  </p>
                  <p className="text-violet-200/70 text-xs">Total recovered</p>
                </div>
                <div className="bg-violet-500/20 p-4 rounded-xl border border-violet-500/30">
                  <Gavel className="w-7 h-7 text-violet-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search disputes by project, freelancer, or dispute ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-gray-800/50 border-gray-600 focus:border-blue-500 text-white placeholder:text-gray-400 text-base"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-52 h-12 bg-gray-800/50 border-gray-600 text-white">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ONGOING">Ongoing</SelectItem>
                  <SelectItem value="AWAITING_EVIDENCE">Awaiting Evidence</SelectItem>
                  <SelectItem value="WITNESS_VOTING">Witness Voting</SelectItem>
                  <SelectItem value="ARBITRATOR_REVIEW">Arbitrator Review</SelectItem>
                  <SelectItem value="RESOLVED">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Tab Navigation */}
        <div className="mb-8">
          <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-2 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-3 px-4 py-4 rounded-xl font-semibold transition-all duration-300 group ${getTabColorClasses(tab.color, isActive)}`}
                  >
                    <div
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        isActive ? "bg-white/20" : "bg-gray-700/50 group-hover:bg-gray-600/50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{tab.label}</span>
                        {tab.count !== null && tab.count > 0 && (
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${isActive ? "bg-white/20" : "bg-gray-700/50"}`}
                          >
                            {tab.count}
                          </span>
                        )}
                      </div>
                      <div
                        className={`text-xs transition-all duration-300 ${
                          isActive ? "text-white/80" : "text-gray-400 group-hover:text-gray-300"
                        }`}
                      >
                        {tab.description}
                      </div>
                    </div>
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/5 to-white/10 animate-pulse" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-500">
          {activeTab === "overview" && <DisputeOverviewTab disputes={mockDisputes} stats={mockDisputeStats} />}
          {activeTab === "ongoing" && <OngoingDisputesTab disputes={mockDisputes} />}
          {activeTab === "resolved" && <ResolvedDisputesTab disputes={mockDisputes} />}
          {activeTab === "vote-history" && <VoteHistoryTab disputes={mockDisputes} />}
        </div>
      </div>
    </div>
  )
}
