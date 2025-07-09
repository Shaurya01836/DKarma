"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Eye, ArrowUpDown } from "lucide-react"
import type { Transaction } from "@/types"
import {
  getTransactionTypeColor,
  getTransactionStatusColor,
  formatCurrency,
  formatDate,
  getTransactionIcon,
} from "@/utils"

interface TransactionsTabProps {
  transactions: Transaction[]
}

export default function TransactionsTab({ transactions }: TransactionsTabProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.projectTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.freelancerName?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || transaction.type === filterType
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      case "amount":
        return Math.abs(b.amount) - Math.abs(a.amount)
      case "type":
        return a.type.localeCompare(b.type)
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search transactions by description, project, or freelancer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-gray-800/50 border-gray-600 focus:border-blue-500 text-white placeholder:text-gray-400 text-base"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48 h-12 bg-gray-800/50 border-gray-600 text-white">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="DEPOSIT">Deposits</SelectItem>
                  <SelectItem value="WITHDRAWAL">Withdrawals</SelectItem>
                  <SelectItem value="ESCROW_LOCK">Escrow Locks</SelectItem>
                  <SelectItem value="ESCROW_RELEASE">Escrow Releases</SelectItem>
                  <SelectItem value="REFUND">Refunds</SelectItem>
                  <SelectItem value="PAYMENT">Payments</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48 h-12 bg-gray-800/50 border-gray-600 text-white">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 h-12 bg-gray-800/50 border-gray-600 text-white">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="type">Type</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="h-12 border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 bg-transparent text-gray-200 hover:text-blue-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-emerald-900/20 border-emerald-700/40 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="text-emerald-300 text-sm font-medium">Total Deposits</div>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(transactions.filter((t) => t.type === "DEPOSIT").reduce((sum, t) => sum + t.amount, 0))}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-900/20 border-red-700/40 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="text-red-300 text-sm font-medium">Total Withdrawals</div>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(
                Math.abs(transactions.filter((t) => t.type === "WITHDRAWAL").reduce((sum, t) => sum + t.amount, 0)),
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-900/20 border-blue-700/40 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="text-blue-300 text-sm font-medium">Total Payments</div>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(
                Math.abs(transactions.filter((t) => t.type === "PAYMENT").reduce((sum, t) => sum + t.amount, 0)),
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-violet-900/20 border-violet-700/40 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="text-violet-300 text-sm font-medium">Total Refunds</div>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(transactions.filter((t) => t.type === "REFUND").reduce((sum, t) => sum + t.amount, 0))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions List */}
      <Card className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-white">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                      transaction.amount >= 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-white">{transaction.description}</span>
                      <Badge className={`${getTransactionTypeColor(transaction.type)} border text-xs`}>
                        {transaction.type.replace("_", " ")}
                      </Badge>
                      <Badge className={`${getTransactionStatusColor(transaction.status)} border text-xs`}>
                        {transaction.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{formatDate(transaction.timestamp)}</span>
                      {transaction.projectTitle && (
                        <>
                          <span>•</span>
                          <span>{transaction.projectTitle}</span>
                        </>
                      )}
                      {transaction.freelancerName && (
                        <>
                          <span>•</span>
                          <span>{transaction.freelancerName}</span>
                        </>
                      )}
                      {transaction.paymentMethod && (
                        <>
                          <span>•</span>
                          <span>{transaction.paymentMethod}</span>
                        </>
                      )}
                    </div>
                    {transaction.fee && (
                      <div className="text-xs text-gray-500">Fee: {formatCurrency(transaction.fee)}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div
                      className={`text-lg font-bold ${transaction.amount >= 0 ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {formatCurrency(transaction.amount)}
                    </div>
                    {transaction.reference && <div className="text-xs text-gray-400">Ref: {transaction.reference}</div>}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 bg-transparent text-gray-200 hover:text-blue-300"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
