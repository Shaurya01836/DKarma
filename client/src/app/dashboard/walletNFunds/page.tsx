"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Search,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Shield,
  CreditCard,
  Target,
  History,
  PieChart,
} from "lucide-react"
import {
  mockWalletBalance,
  mockTransactions,
  mockPaymentMethods,
  mockBudgetAllocations,
  mockAutoPayments,
} from "./data/mockData"
import OverviewTab from "./sections/OverviewTab"
import TransactionsTab from "./sections/TransactionsTab"
import PaymentMethodsTab from "./sections/PaymentMethodsTab"
import BudgetTab from "./sections/BudgetTab"
import { formatCurrency } from "@/utils"

export default function WalletAndFunds() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPeriod, setFilterPeriod] = useState("all")

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: PieChart,
      description: "Dashboard & Analytics",
      color: "blue",
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: History,
      description: "Transaction History",
      color: "emerald",
    },
    {
      id: "payment-methods",
      label: "Payment Methods",
      icon: CreditCard,
      description: "Manage Payment Options",
      color: "violet",
    },
    {
      id: "budget",
      label: "Budget & Planning",
      icon: Target,
      description: "Budget Management",
      color: "amber",
    },
  ]

  const getTabColorClasses = (color: string, isActive: boolean) => {
    const colors = {
      blue: isActive
        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25"
        : "text-gray-300 hover:text-white hover:bg-blue-800/20",
      emerald: isActive
        ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/25"
        : "text-gray-300 hover:text-white hover:bg-emerald-800/20",
      violet: isActive
        ? "bg-gradient-to-r from-violet-600 to-violet-500 text-white shadow-lg shadow-violet-500/25"
        : "text-gray-300 hover:text-white hover:bg-violet-800/20",
      amber: isActive
        ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-500/25"
        : "text-gray-300 hover:text-white hover:bg-amber-800/20",
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
              Wallet & Funds
            </h1>
            <p className="text-[var(--color-muted)] text-lg font-sans">
              Manage your finances, track spending, and control your project budgets
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 font-semibold">
              <Plus className="w-4 h-4 mr-2" />
              Add Funds
            </Button>
            <Button
              variant="outline"
              className="border-gray-600 hover:border-red-400 bg-gray-800/50 backdrop-blur-sm text-gray-200 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
            >
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Withdraw
            </Button>
          </div>
        </div>

        {/* Wallet Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-700/30 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-blue-300 text-sm font-semibold tracking-wide">TOTAL BALANCE</p>
                  <p className="text-3xl font-bold text-white">{formatCurrency(mockWalletBalance.totalBalance)}</p>
                  <p className="text-blue-200/70 text-xs">Available funds</p>
                </div>
                <div className="bg-blue-500/20 p-4 rounded-xl border border-blue-500/30">
                  <Wallet className="w-7 h-7 text-blue-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border-emerald-700/30 backdrop-blur-sm hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-emerald-300 text-sm font-semibold tracking-wide">AVAILABLE</p>
                  <p className="text-3xl font-bold text-white">{formatCurrency(mockWalletBalance.availableBalance)}</p>
                  <p className="text-emerald-200/70 text-xs">Ready to spend</p>
                </div>
                <div className="bg-emerald-500/20 p-4 rounded-xl border border-emerald-500/30">
                  <ArrowDownLeft className="w-7 h-7 text-emerald-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 border-amber-700/30 backdrop-blur-sm hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-amber-300 text-sm font-semibold tracking-wide">ESCROWED</p>
                  <p className="text-3xl font-bold text-white">{formatCurrency(mockWalletBalance.escrowedFunds)}</p>
                  <p className="text-amber-200/70 text-xs">Locked in projects</p>
                </div>
                <div className="bg-amber-500/20 p-4 rounded-xl border border-amber-500/30">
                  <Shield className="w-7 h-7 text-amber-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-violet-900/30 to-violet-800/20 border-violet-700/30 backdrop-blur-sm hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-violet-300 text-sm font-semibold tracking-wide">PENDING</p>
                  <p className="text-3xl font-bold text-white">
                    {formatCurrency(mockWalletBalance.pendingWithdrawals)}
                  </p>
                  <p className="text-violet-200/70 text-xs">Processing withdrawals</p>
                </div>
                <div className="bg-violet-500/20 p-4 rounded-xl border border-violet-500/30">
                  <ArrowUpRight className="w-7 h-7 text-violet-300" />
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
                    placeholder="Search transactions, projects, or freelancers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-gray-800/50 border-gray-600 focus:border-blue-500 text-white placeholder:text-gray-400 text-base"
                  />
                </div>
              </div>
              <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                <SelectTrigger className="w-full md:w-52 h-12 bg-gray-800/50 border-gray-600 text-white">
                  <SelectValue placeholder="Filter by period" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
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
                      <div className="text-sm font-bold">{tab.label}</div>
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
          {activeTab === "overview" && (
            <OverviewTab
              balance={mockWalletBalance}
              recentTransactions={mockTransactions}
              budgetAllocations={mockBudgetAllocations}
            />
          )}
          {activeTab === "transactions" && <TransactionsTab transactions={mockTransactions} />}
          {activeTab === "payment-methods" && <PaymentMethodsTab paymentMethods={mockPaymentMethods} />}
          {activeTab === "budget" && (
            <BudgetTab budgetAllocations={mockBudgetAllocations} autoPayments={mockAutoPayments} />
          )}
        </div>
      </div>
    </div>
  )
}
