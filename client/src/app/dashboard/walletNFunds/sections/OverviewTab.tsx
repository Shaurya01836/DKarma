import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Clock, Plus, ArrowUpRight, ArrowDownLeft, PieChart, Target } from "lucide-react"
import type { WalletBalance, Transaction, BudgetAllocation } from "@/types"
import { formatCurrency, formatDate } from "@/utils"

interface OverviewTabProps {
  balance: WalletBalance
  recentTransactions: Transaction[]
  budgetAllocations: BudgetAllocation[]
}

export default function OverviewTab({ recentTransactions, budgetAllocations }: OverviewTabProps) {
  const totalAllocated = budgetAllocations.reduce((sum, allocation) => sum + allocation.allocatedAmount, 0)
  const totalSpent = budgetAllocations.reduce((sum, allocation) => sum + allocation.spentAmount, 0)
  const spendingPercentage = totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0

  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Button className="h-20 flex-col gap-2 bg-gradient-to-br from-emerald-600/20 to-emerald-500/10 hover:from-emerald-600/30 hover:to-emerald-500/20 border border-emerald-500/30 text-white hover:text-white transition-all duration-300">
          <Plus className="w-6 h-6" />
          <span className="font-semibold">Add Funds</span>
        </Button>
        <Button className="h-20 flex-col gap-2 bg-gradient-to-br from-blue-600/20 to-blue-500/10 hover:from-blue-600/30 hover:to-blue-500/20 border border-blue-500/30 text-white hover:text-white transition-all duration-300">
          <ArrowUpRight className="w-6 h-6" />
          <span className="font-semibold">Withdraw Funds</span>
        </Button>
        <Button className="h-20 flex-col gap-2 bg-gradient-to-br from-violet-600/20 to-violet-500/10 hover:from-violet-600/30 hover:to-violet-500/20 border border-violet-500/30 text-white hover:text-white transition-all duration-300">
          <PieChart className="w-6 h-6" />
          <span className="font-semibold">View Analytics</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Spending Analytics */}
        <Card className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl text-white">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              Spending Analytics
            </CardTitle>
            <CardDescription className="text-gray-300">Your spending patterns and budget usage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-300">Budget Utilization</span>
                <span className="text-sm font-bold text-white">{Math.round(spendingPercentage)}%</span>
              </div>
              <Progress value={spendingPercentage} className="h-3 bg-gray-800" />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Spent: {formatCurrency(totalSpent)}</span>
                <span>Allocated: {formatCurrency(totalAllocated)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-800/30 rounded-lg p-3">
                <div className="text-gray-400 mb-1">This Month</div>
                <div className="text-white font-semibold">{formatCurrency(1250)}</div>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-3">
                <div className="text-gray-400 mb-1">Last Month</div>
                <div className="text-white font-semibold">{formatCurrency(980)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl text-white">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Clock className="w-6 h-6 text-emerald-400" />
              </div>
              Recent Activity
            </CardTitle>
            <CardDescription className="text-gray-300">Latest transactions and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTransactions.slice(0, 4).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                      transaction.amount >= 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {transaction.amount >= 0 ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{transaction.description}</div>
                    <div className="text-xs text-gray-400">{formatDate(transaction.timestamp)}</div>
                  </div>
                </div>
                <div
                  className={`text-sm font-semibold ${transaction.amount >= 0 ? "text-emerald-400" : "text-red-400"}`}
                >
                  {formatCurrency(transaction.amount)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Budget Allocations */}
      <Card className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl text-white">
            <div className="p-2 bg-violet-500/20 rounded-lg">
              <Target className="w-6 h-6 text-violet-400" />
            </div>
            Active Budget Allocations
          </CardTitle>
          <CardDescription className="text-gray-300">Track your project budgets and spending</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgetAllocations
              .filter((b) => b.status === "ACTIVE")
              .map((allocation) => {
                const progress = (allocation.spentAmount / allocation.allocatedAmount) * 100
                return (
                  <div key={allocation.id} className="bg-gray-800/30 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-white">{allocation.projectTitle}</h4>
                        <p className="text-sm text-gray-400">Created {formatDate(allocation.createdDate)}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-white">
                          {formatCurrency(allocation.spentAmount)} / {formatCurrency(allocation.allocatedAmount)}
                        </div>
                        <div className="text-xs text-gray-400">
                          {formatCurrency(allocation.remainingAmount)} remaining
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Progress</span>
                        <span className="text-white font-bold">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2 bg-gray-800" />
                    </div>
                  </div>
                )
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
