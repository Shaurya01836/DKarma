import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Download, Archive, CheckCircle, DollarSign, Calendar, Clock } from "lucide-react"
import type { Dispute } from "@/types"
import { getDisputeReasonColor, formatCurrency, formatDate, getDisputeReasonLabel } from "@/utils"

interface ResolvedDisputesTabProps {
  disputes: Dispute[]
}

export default function ResolvedDisputesTab({ disputes }: ResolvedDisputesTabProps) {
  const resolvedDisputes = disputes.filter((d) => d.status === "RESOLVED")

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case "FULL_REFUND":
        return "text-emerald-400"
      case "PARTIAL_REFUND":
        return "text-blue-400"
      case "NO_REFUND":
        return "text-red-400"
      case "TASK_COMPLETION_REQUIRED":
        return "text-amber-400"
      case "PAYMENT_RELEASED":
        return "text-violet-400"
      case "CONTRACT_TERMINATED":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getOutcomeLabel = (outcome: string) => {
    return outcome
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase())
  }

  const calculateResolutionTime = (initiated: string, resolved: string) => {
    const start = new Date(initiated)
    const end = new Date(resolved)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-6">
      {resolvedDisputes.length > 0 && (
        <Card className="bg-emerald-900/20 border-emerald-700/40 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-emerald-300 font-medium">Dispute Resolution History</p>
                <p className="text-emerald-200/70 text-sm">
                  You have successfully resolved {resolvedDisputes.length} dispute
                  {resolvedDisputes.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {resolvedDisputes.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {resolvedDisputes.map((dispute) => {
            const resolutionTime = dispute.resolvedDate
              ? calculateResolutionTime(dispute.initiatedDate, dispute.resolvedDate)
              : 0

            return (
              <Card
                key={dispute.id}
                className="bg-gray-900/40 border-gray-700/50 hover:bg-gray-900/60 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 border-2 border-gray-600">
                        <AvatarImage src={dispute.freelancerAvatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gray-700 text-white font-semibold text-sm">
                          {dispute.freelancerName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-white">{dispute.projectTitle}</h3>
                        <p className="text-gray-400 text-sm">vs {dispute.freelancerName}</p>
                      </div>
                    </div>
                    <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/40 border font-medium">
                      RESOLVED
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <Badge className={`${getDisputeReasonColor(dispute.reason)} border text-xs mb-2`}>
                      {getDisputeReasonLabel(dispute.reason)}
                    </Badge>
                    <p className="text-gray-300 text-sm line-clamp-2">{dispute.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      <span className="text-gray-400">Amount:</span>
                      <span className="text-white font-semibold">{formatCurrency(dispute.amount)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-white font-semibold">{resolutionTime} days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-violet-400" />
                      <span className="text-gray-400">Resolved:</span>
                      <span className="text-white font-semibold">{formatDate(dispute.resolvedDate!)}</span>
                    </div>
                  </div>

                  {dispute.outcome && (
                    <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/50">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-medium text-emerald-300">Resolution Outcome</span>
                      </div>
                      <p className={`text-sm font-semibold ${getOutcomeColor(dispute.outcome)}`}>
                        {getOutcomeLabel(dispute.outcome)}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 bg-transparent text-gray-200 hover:text-blue-300 font-medium"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 hover:border-emerald-500 hover:bg-emerald-500/10 bg-transparent text-gray-200 hover:text-emerald-300 font-medium"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 hover:border-amber-500 hover:bg-amber-500/10 bg-transparent text-gray-200 hover:text-amber-300 font-medium"
                    >
                      <Archive className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="bg-gray-900/30 border-gray-800 border-dashed">
          <CardContent className="p-12 text-center">
            <CheckCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Resolved Disputes</h3>
            <p className="text-gray-500">Your resolved disputes will appear here</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
