"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, FileText, FileSignature, CheckCircle, Edit, AlertTriangle, DollarSign } from "lucide-react"
import { mockContracts } from "./data/contractsData"
import ActiveContractsTab from "./tabs/ActiveContractsTab"
import PendingSignatureTab from "./tabs/PendingSignatureTab"
import CompletedContractsTab from "./tabs/CompletedContractsTab"
import DraftContractsTab from "./tabs/DraftContractsTab"

export default function ContractsAndAgreements() {
  const [activeTab, setActiveTab] = useState("active")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Calculate stats
  const activeContracts = mockContracts.filter((c) => c.status === "ACTIVE").length
  const pendingSignature = mockContracts.filter((c) => c.status === "PENDING_SIGNATURE").length
  const completedContracts = mockContracts.filter((c) => c.status === "COMPLETED").length
  const draftContracts = mockContracts.filter((c) => c.status === "DRAFT").length
  const totalValue = mockContracts.reduce((sum, contract) => sum + contract.amount, 0)

  const handleSignContract = (contractId: string) => {
    console.log("Signing contract:", contractId)
    // Handle contract signing logic
  }

  const handleViewContract = (contractId: string) => {
    console.log("Viewing contract:", contractId)
    // Handle contract viewing logic
  }

  const tabs = [
    {
      id: "active",
      label: "Active Contracts",
      icon: FileText,
      description: "Currently Running",
      count: activeContracts,
      color: "emerald",
    },
    {
      id: "pending",
      label: "Pending Signature",
      icon: FileSignature,
      description: "Awaiting Your Signature",
      count: pendingSignature,
      color: "amber",
    },
    {
      id: "completed",
      label: "Completed",
      icon: CheckCircle,
      description: "Successfully Finished",
      count: completedContracts,
      color: "blue",
    },
    {
      id: "drafts",
      label: "Drafts",
      icon: Edit,
      description: "Work in Progress",
      count: draftContracts,
      color: "gray",
    },
  ]

  const getTabColorClasses = (color: string, isActive: boolean) => {
    const colors = {
      emerald: isActive
        ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/25"
        : "text-gray-300 hover:text-white hover:bg-emerald-800/20",
      amber: isActive
        ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-500/25"
        : "text-gray-300 hover:text-white hover:bg-amber-800/20",
      blue: isActive
        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25"
        : "text-gray-300 hover:text-white hover:bg-blue-800/20",
      gray: isActive
        ? "bg-gradient-to-r from-gray-600 to-gray-500 text-white shadow-lg shadow-gray-500/25"
        : "text-gray-300 hover:text-white hover:bg-gray-800/60",
    }
    return colors[color as keyof typeof colors]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-background)] via-[var(--color-surface)] to-[var(--color-background)] text-[var(--color-foreground)] font-sans">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-[var(--color-foreground)] font-display mb-1">
              Contracts & Agreements
            </h1>
            <p className="text-[var(--color-muted)] text-lg font-sans">
              Manage your project contracts, agreements, and legal documents
            </p>
          </div>
          <div className="flex gap-3">
        
            <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 font-semibold">
              <Plus className="w-4 h-4 mr-2" />
              Create Contract
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border-emerald-700/30 backdrop-blur-sm hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-emerald-300 text-sm font-semibold tracking-wide">ACTIVE CONTRACTS</p>
                  <p className="text-4xl font-bold text-white">{activeContracts}</p>
                  <p className="text-emerald-200/70 text-xs">Currently running</p>
                </div>
                <div className="bg-emerald-500/20 p-4 rounded-xl border border-emerald-500/30">
                  <FileText className="w-7 h-7 text-emerald-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 border-amber-700/30 backdrop-blur-sm hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-amber-300 text-sm font-semibold tracking-wide">PENDING SIGNATURE</p>
                  <p className="text-4xl font-bold text-white">{pendingSignature}</p>
                  <p className="text-amber-200/70 text-xs">Awaiting your action</p>
                </div>
                <div className="bg-amber-500/20 p-4 rounded-xl border border-amber-500/30">
                  <AlertTriangle className="w-7 h-7 text-amber-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-700/30 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-blue-300 text-sm font-semibold tracking-wide">COMPLETED</p>
                  <p className="text-4xl font-bold text-white">{completedContracts}</p>
                  <p className="text-blue-200/70 text-xs">Successfully finished</p>
                </div>
                <div className="bg-blue-500/20 p-4 rounded-xl border border-blue-500/30">
                  <CheckCircle className="w-7 h-7 text-blue-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-violet-900/30 to-violet-800/20 border-violet-700/30 backdrop-blur-sm hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-violet-300 text-sm font-semibold tracking-wide">TOTAL VALUE</p>
                  <p className="text-4xl font-bold text-white">${totalValue.toLocaleString()}</p>
                  <p className="text-violet-200/70 text-xs">All contracts combined</p>
                </div>
                <div className="bg-violet-500/20 p-4 rounded-xl border border-violet-500/30">
                  <DollarSign className="w-7 h-7 text-violet-300" />
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
                    placeholder="Search contracts by freelancer name, project title..."
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
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="PENDING_SIGNATURE">Pending Signature</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="DRAFT">Draft</SelectItem>
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
                        {tab.count > 0 && (
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
          {activeTab === "active" && <ActiveContractsTab contracts={mockContracts} />}
          {activeTab === "pending" && (
            <PendingSignatureTab
              contracts={mockContracts}
              onSignContract={handleSignContract}
              onViewContract={handleViewContract}
            />
          )}
          {activeTab === "completed" && <CompletedContractsTab contracts={mockContracts} />}
          {activeTab === "drafts" && <DraftContractsTab contracts={mockContracts} />}
        </div>
      </div>
    </div>
  )
}
