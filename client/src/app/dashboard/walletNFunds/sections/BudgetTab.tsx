import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Target, TrendingUp, AlertTriangle, CheckCircle, Pause } from "lucide-react"
import type { BudgetAllocation, AutoPayment } from "@/types"
import { formatCurrency, formatDate } from "@/utils"

interface BudgetTabProps {
  budgetAllocations: BudgetAllocation[]
  autoPayments: AutoPayment[]
}

export default function BudgetTab({ budgetAllocations, autoPayments }: BudgetTabProps) {
  const totalAllocated = budgetAllocations.reduce((sum, allocation) => sum + allocation.allocatedAmount, 0)
  const totalSpent = budgetAllocations.reduce((sum, allocation) => sum + allocation.spentAmount, 0)
  const totalRemaining = budgetAllocations.reduce((sum, allocation) => sum + allocation.remainingAmount, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
      case "COMPLETED":
        return "bg-blue-500/15 text-blue-300 border-blue-500/40"
      case "PAUSED":
        return "bg-amber-500/15 text-amber-300 border-amber-500/40"
      default:
        return "bg-gray-500/15 text-gray-300 border-gray-500/40"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <TrendingUp className="w-4 h-4" />
      case "COMPLETED":
        return <CheckCircle className="w-4 h-4" />
      case "PAUSED":
        return <Pause className="w-4 h-4" />
      default:
        return <Target className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-700/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-blue-300 text-sm font-semibold tracking-wide">TOTAL ALLOCATED</p>
                <p className="text-3xl font-bold text-white">{formatCurrency(totalAllocated)}</p>
                <p className="text-blue-200/70 text-xs">Across all projects</p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-xl border border-blue-500/30">
                <Target className="w-6 h-6 text-blue-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border-emerald-700/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-emerald-300 text-sm font-semibold tracking-wide">TOTAL SPENT</p>
                <p className="text-3xl font-bold text-white">{formatCurrency(totalSpent)}</p>
                <p className="text-emerald-200/70 text-xs">
                  {totalAllocated > 0 ? Math.round((totalSpent / totalAllocated) * 100) : 0}% of budget
                </p>
              </div>
              <div className="bg-emerald-500/20 p-3 rounded-xl border border-emerald-500/30">
                <TrendingUp className="w-6 h-6 text-emerald-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-violet-900/30 to-violet-800/20 border-violet-700/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-violet-300 text-sm font-semibold tracking-wide">REMAINING</p>
                <p className="text-3xl font-bold text-white">{formatCurrency(totalRemaining)}</p>
                <p className="text-violet-200/70 text-xs">Available to spend</p>
              </div>
              <div className="bg-violet-500/20 p-3 rounded-xl border border-violet-500/30">
                <AlertTriangle className="w-6 h-6 text-violet-300" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Budget Allocation */}
      <Card className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Budget Allocations</h3>
              <p className="text-gray-300">Set and track budgets for your projects</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 font-semibold">
              <Plus className="w-4 h-4 mr-2" />
              Create Budget
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Budget Allocations List */}
      <div className="space-y-4">
        {budgetAllocations.map((allocation) => {
          const progress = (allocation.spentAmount / allocation.allocatedAmount) * 100
          const isOverBudget = allocation.spentAmount > allocation.allocatedAmount

          return (
            <Card
              key={allocation.id}
              className="bg-gray-900/40 border-gray-700/50 hover:bg-gray-900/60 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-white text-lg">{allocation.projectTitle}</h3>
                      <Badge className={`${getStatusColor(allocation.status)} border font-medium`}>
                        {getStatusIcon(allocation.status)}
                        <span className="ml-1">{allocation.status}</span>
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm">Created {formatDate(allocation.createdDate)}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {formatCurrency(allocation.spentAmount)} / {formatCurrency(allocation.allocatedAmount)}
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        allocation.remainingAmount > 0 ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {allocation.remainingAmount > 0
                        ? `${formatCurrency(allocation.remainingAmount)} remaining`
                        : `${formatCurrency(Math.abs(allocation.remainingAmount))} over budget`}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Budget Progress</span>
                    <span className={`font-bold ${isOverBudget ? "text-red-400" : "text-white"}`}>
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <Progress
                    value={Math.min(progress, 100)}
                    className={`h-3 bg-gray-800 ${isOverBudget ? "[&>div]:bg-red-500" : ""}`}
                  />
                  {isOverBudget && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Budget exceeded by {Math.round(progress - 100)}%</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 bg-transparent text-gray-200 hover:text-blue-300 font-medium"
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 hover:border-amber-500 hover:bg-amber-500/10 bg-transparent text-gray-200 hover:text-amber-300 font-medium"
                  >
                    Adjust Budget
                  </Button>
                  {allocation.status === "ACTIVE" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 hover:border-red-500 hover:bg-red-500/10 bg-transparent text-gray-200 hover:text-red-300 font-medium"
                    >
                      Pause
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Auto Payments */}
      <Card className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-white">Recurring Payments</CardTitle>
            <Button
              variant="outline"
              className="border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 bg-transparent text-gray-200 hover:text-blue-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Auto Payment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {autoPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-white">{payment.name}</h4>
                    <Badge
                      className={
                        payment.isActive
                          ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
                          : "bg-gray-500/15 text-gray-300 border-gray-500/40"
                      }
                    >
                      {payment.isActive ? "Active" : "Paused"}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-400">
                    {formatCurrency(payment.amount)} • {payment.frequency.toLowerCase()} • Next:{" "}
                    {formatDate(payment.nextPayment)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 bg-transparent text-gray-200 hover:text-blue-300"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={
                      payment.isActive
                        ? "border-amber-500 text-amber-300 hover:bg-amber-500/10 bg-transparent"
                        : "border-emerald-500 text-emerald-300 hover:bg-emerald-500/10 bg-transparent"
                    }
                  >
                    {payment.isActive ? "Pause" : "Resume"}
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
