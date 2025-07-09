import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Clock, Plus, AlertTriangle, CheckCircle, Scale, FileText, Users } from "lucide-react"
import type { Dispute, DisputeStats } from "@/types"
import { formatCurrency } from "@/utils"

interface DisputeOverviewTabProps {
  disputes: Dispute[]
  stats: DisputeStats
}

export default function DisputeOverviewTab({ disputes, stats }: DisputeOverviewTabProps) {
  const recentDisputes = disputes.slice(0, 5)
  const successRate = stats.totalDisputes > 0 ? (stats.wonDisputes / stats.resolvedDisputes) * 100 : 0

  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Button className="h-20 flex-col gap-2 bg-gradient-to-br from-red-600/20 to-red-500/10 hover:from-red-600/30 hover:to-red-500/20 border border-red-500/30 text-white hover:text-white transition-all duration-300">
          <Plus className="w-6 h-6" />
          <span className="font-semibold">File New Dispute</span>
        </Button>
        <Button className="h-20 flex-col gap-2 bg-gradient-to-br from-blue-600/20 to-blue-500/10 hover:from-blue-600/30 hover:to-blue-500/20 border border-blue-500/30 text-white hover:text-white transition-all duration-300">
          <FileText className="w-6 h-6" />
          <span className="font-semibold">Dispute Guidelines</span>
        </Button>
        <Button className="h-20 flex-col gap-2 bg-gradient-to-br from-violet-600/20 to-violet-500/10 hover:from-violet-600/30 hover:to-violet-500/20 border border-violet-500/30 text-white hover:text-white transition-all duration-300">
          <Users className="w-6 h-6" />
          <span className="font-semibold">Community Support</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Dispute Analytics */}
        <Card className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl text-white">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              Dispute Analytics
            </CardTitle>
            <CardDescription className="text-gray-300">Your dispute resolution performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-300">Success Rate</span>
                <span className="text-sm font-bold text-white">{Math.round(successRate)}%</span>
              </div>
              <Progress value={successRate} className="h-3 bg-gray-800" />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Won: {stats.wonDisputes}</span>
                <span>Total Resolved: {stats.resolvedDisputes}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-800/30 rounded-lg p-3">
                <div className="text-gray-400 mb-1">Avg. Resolution</div>
                <div className="text-white font-semibold">{stats.averageResolutionTime} days</div>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-3">
                <div className="text-gray-400 mb-1">Amount Recovered</div>
                <div className="text-white font-semibold">{formatCurrency(stats.totalAmountRecovered)}</div>
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
              Recent Dispute Activity
            </CardTitle>
            <CardDescription className="text-gray-300">Latest updates from your disputes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentDisputes.map((dispute) => (
              <div key={dispute.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                      dispute.status === "RESOLVED"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {dispute.status === "RESOLVED" ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertTriangle className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white line-clamp-1">{dispute.projectTitle}</div>
                    <div className="text-xs text-gray-400">{dispute.lastActivity}</div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-white">{formatCurrency(dispute.amount)}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Dispute Process Guide */}
      <Card className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl text-white">
            <div className="p-2 bg-violet-500/20 rounded-lg">
              <Scale className="w-6 h-6 text-violet-400" />
            </div>
            How Dispute Resolution Works
          </CardTitle>
          <CardDescription className="text-gray-300">Understanding the dispute resolution process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="font-semibold text-white">1. File Dispute</h4>
              <p className="text-sm text-gray-400">Submit your dispute with evidence and detailed description</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6 text-amber-400" />
              </div>
              <h4 className="font-semibold text-white">2. Evidence Review</h4>
              <p className="text-sm text-gray-400">Both parties submit evidence and supporting documents</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-violet-400" />
              </div>
              <h4 className="font-semibold text-white">3. Community Vote</h4>
              <p className="text-sm text-gray-400">Qualified community members review and vote on the case</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <h4 className="font-semibold text-white">4. Resolution</h4>
              <p className="text-sm text-gray-400">Final decision is made and appropriate action is taken</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
