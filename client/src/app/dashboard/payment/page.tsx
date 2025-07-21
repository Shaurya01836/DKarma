"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import {
  Wallet,
  TrendingUp,
  DollarSign,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Filter,
  Download,
  CreditCard,
} from "lucide-react"

const summary = [
  {
    label: "Available Balance",
    value: "8.3 ETH",
    sub: "Ready to withdraw",
    icon: Wallet,
    color: "emerald",
    change: "+2.1 ETH",
  },
  {
    label: "Escrowed Funds",
    value: "12.5 ETH",
    sub: "Pending task completion",
    icon: Clock,
    color: "amber",
    change: "+0.8 ETH",
  },
  {
    label: "Total Earnings",
    value: "20.8 ETH",
    sub: "All time earnings",
    icon: TrendingUp,
    color: "blue",
    change: "+15.2%",
  },
]

const transactions = [
  {
    id: 1,
    type: "earning",
    title: "Smart Contract Audit Completed",
    organization: "DeFi Protocol",
    amount: "+3.5 ETH",
    status: "completed",
    date: "2024-01-15",
    time: "14:30",
  },
  {
    id: 2,
    type: "withdrawal",
    title: "Withdrawal to Wallet",
    organization: "0x742d...4e2f",
    amount: "-2.0 ETH",
    status: "completed",
    date: "2024-01-14",
    time: "09:15",
  },
  {
    id: 3,
    type: "earning",
    title: "NFT Marketplace Frontend",
    organization: "CryptoArt Studio",
    amount: "+2.8 ETH",
    status: "pending",
    date: "2024-01-13",
    time: "16:45",
  },
  {
    id: 4,
    type: "escrow",
    title: "DeFi Yield Farming Protocol",
    organization: "Yield Labs",
    amount: "4.2 ETH",
    status: "escrowed",
    date: "2024-01-12",
    time: "11:20",
  },
  {
    id: 5,
    type: "earning",
    title: "Cross-chain Bridge Development",
    organization: "Bridge Protocol",
    amount: "+5.1 ETH",
    status: "completed",
    date: "2024-01-10",
    time: "13:00",
  },
]

const tabs = [
  { id: "transactions", label: "Recent Transactions", icon: CreditCard },
  { id: "analytics", label: "Earning Analytics", icon: TrendingUp },
]

const mockStats = {
  totalTransactions: 156,
  monthlyEarnings: 15.7,
  averageTaskValue: 3.2,
  successfulWithdrawals: 98,
}

export default function Payments() {
  const [activeTab, setActiveTab] = useState("transactions")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
      case "pending":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30"
      case "escrowed":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "earning":
        return <ArrowDownLeft className="w-4 h-4 text-emerald-300" />
      case "withdrawal":
        return <ArrowUpRight className="w-4 h-4 text-red-300" />
      case "escrow":
        return <Clock className="w-4 h-4 text-blue-300" />
      default:
        return <DollarSign className="w-4 h-4 text-gray-300" />
    }
  }

  const getTabColorClasses = (isActive: boolean) => {
    return isActive
      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25"
      : "text-gray-300 hover:text-white hover:bg-blue-800/20"
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white font-display mb-1">Payments</h1>
            <p className="text-gray-400 text-lg font-sans">Manage your earnings, withdrawals, and payment history</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700/50 font-semibold bg-transparent"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 font-semibold">
              <Wallet className="w-4 h-4 mr-2" />
              Withdraw Funds
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {summary.map((item, index) => {
            const Icon = item.icon
            const colorClasses = {
              emerald: "from-emerald-900/30 to-emerald-800/20 border-emerald-700/30 shadow-emerald-500/10",
              amber: "from-amber-900/30 to-amber-800/20 border-amber-700/30 shadow-amber-500/10",
              blue: "from-blue-900/30 to-blue-800/20 border-blue-700/30 shadow-blue-500/10",
            }
            const iconColors = {
              emerald: "bg-emerald-500/20 border-emerald-500/30 text-emerald-300",
              amber: "bg-amber-500/20 border-amber-500/30 text-amber-300",
              blue: "bg-blue-500/20 border-blue-500/30 text-blue-300",
            }
            const textColors = {
              emerald: "text-emerald-300",
              amber: "text-amber-300",
              blue: "text-blue-300",
            }

            return (
              <Card
                key={index}
                className={`bg-gradient-to-br ${colorClasses[item.color as keyof typeof colorClasses]} backdrop-blur-sm hover:shadow-lg hover:${colorClasses[item.color as keyof typeof colorClasses].split(" ")[3]} transition-all duration-300`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p
                        className={`${textColors[item.color as keyof typeof textColors]} text-sm font-semibold tracking-wide`}
                      >
                        {item.label.toUpperCase()}
                      </p>
                      <p className="text-4xl font-bold text-white">{item.value}</p>
                      <p className="text-white/70 text-xs">{item.sub}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <span className={`text-xs font-semibold ${textColors[item.color as keyof typeof textColors]}`}>
                          {item.change}
                        </span>
                        <span className="text-xs text-white/50">this month</span>
                      </div>
                    </div>
                    <div className={`${iconColors[item.color as keyof typeof iconColors]} p-4 rounded-xl border`}>
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <Card className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-white">{mockStats.totalTransactions}</p>
              <p className="text-xs text-gray-400">Total Transactions</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-white">{mockStats.monthlyEarnings} ETH</p>
              <p className="text-xs text-gray-400">Monthly Earnings</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-white">{mockStats.averageTaskValue} ETH</p>
              <p className="text-xs text-gray-400">Avg Task Value</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-white">{mockStats.successfulWithdrawals}%</p>
              <p className="text-xs text-gray-400">Success Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="mb-8">
          <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-2 shadow-2xl">
            <div className="grid grid-cols-2 gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 group ${getTabColorClasses(isActive)}`}
                  >
                    <div
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        isActive ? "bg-white/20" : "bg-gray-700/50 group-hover:bg-gray-600/50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-left flex-1">
                      <span className="text-sm font-bold">{tab.label}</span>
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
        {activeTab === "transactions" && (
          <Card className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white font-display">Transaction History</h2>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700/50 bg-transparent"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700/50 bg-transparent"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Date Range
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600/50">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{transaction.title}</h3>
                        <p className="text-sm text-gray-400">{transaction.organization}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{transaction.date}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{transaction.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={`${getStatusColor(transaction.status)} border font-semibold`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </Badge>
                      <div className="text-right">
                        <p
                          className={`font-bold ${
                            transaction.type === "withdrawal" ? "text-red-300" : "text-emerald-300"
                          }`}
                        >
                          {transaction.amount}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-blue-800/20 hover:border-blue-500/50 font-semibold px-8 py-3 rounded-xl bg-transparent"
                >
                  Load More Transactions
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "analytics" && (
          <Card className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-white font-display mb-6">Earning Analytics</h2>
              <div className="text-center py-16">
                <TrendingUp className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2 font-display">Analytics Coming Soon</h3>
                <p className="text-gray-400 font-sans">
                  Detailed earning analytics and insights will be available here.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
