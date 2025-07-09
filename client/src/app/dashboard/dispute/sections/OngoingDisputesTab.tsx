import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Eye, Upload, MessageSquare, Clock, DollarSign, AlertTriangle, FileText, Users, Gavel } from "lucide-react"
import type { Dispute } from "@/types"
import {
  getDisputeStatusColor,
  getDisputeReasonColor,
  getPriorityColor,
  formatCurrency,
  formatDate,
  getDisputeReasonLabel,
  getDisputeStatusLabel,
  calculateDisputeProgress,
} from "@/utils"

interface OngoingDisputesTabProps {
  disputes: Dispute[]
}

export default function OngoingDisputesTab({ disputes }: OngoingDisputesTabProps) {
  const ongoingDisputes = disputes.filter(
    (d) =>
      d.status === "ONGOING" ||
      d.status === "AWAITING_EVIDENCE" ||
      d.status === "WITNESS_VOTING" ||
      d.status === "ARBITRATOR_REVIEW" ||
      d.status === "ESCALATED",
  )

  const getActionButton = (dispute: Dispute) => {
    switch (dispute.status) {
      case "AWAITING_EVIDENCE":
        return (
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 font-medium">
            <Upload className="w-4 h-4 mr-2" />
            Submit Evidence
          </Button>
        )
      case "WITNESS_VOTING":
        return (
          <Button size="sm" className="bg-violet-600 hover:bg-violet-700 font-medium">
            <Users className="w-4 h-4 mr-2" />
            View Voting
          </Button>
        )
      case "ARBITRATOR_REVIEW":
        return (
          <Button size="sm" className="bg-orange-600 hover:bg-orange-700 font-medium">
            <Gavel className="w-4 h-4 mr-2" />
            Arbitrator Review
          </Button>
        )
      default:
        return (
          <Button
            variant="outline"
            size="sm"
            className="border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 bg-transparent text-gray-200 hover:text-blue-300 font-medium"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Message
          </Button>
        )
    }
  }

  return (
    <div className="space-y-6">
      {ongoingDisputes.length > 0 && (
        <Card className="bg-amber-900/20 border-amber-700/40 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-amber-300 font-medium">Active Disputes Requiring Attention</p>
                <p className="text-amber-200/70 text-sm">
                  You have {ongoingDisputes.length} ongoing dispute{ongoingDisputes.length !== 1 ? "s" : ""} that may
                  require your action
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {ongoingDisputes.length > 0 ? (
        <div className="space-y-6">
          {ongoingDisputes.map((dispute) => {
            const progress = calculateDisputeProgress(dispute.status)

            return (
              <Card
                key={dispute.id}
                className="bg-gray-900/40 border-gray-700/50 hover:bg-gray-900/60 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 border-2 border-gray-600">
                        <AvatarImage src={dispute.freelancerAvatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gray-700 text-white font-semibold">
                          {dispute.freelancerName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-white text-lg">{dispute.projectTitle}</h3>
                        <p className="text-gray-400 text-sm">vs {dispute.freelancerName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-400">{dispute.lastActivity}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-xs text-gray-400">ID: {dispute.id}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={`${getDisputeStatusColor(dispute.status)} border font-medium`}>
                        {getDisputeStatusLabel(dispute.status)}
                      </Badge>
                      <Badge className={`${getPriorityColor(dispute.priority)} border font-medium`}>
                        {dispute.priority}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-5">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`${getDisputeReasonColor(dispute.reason)} border text-xs`}>
                        {getDisputeReasonLabel(dispute.reason)}
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">{dispute.description}</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      <span className="text-gray-400">Amount:</span>
                      <span className="text-white font-semibold">{formatCurrency(dispute.amount)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400">Initiated:</span>
                      <span className="text-white font-semibold">{formatDate(dispute.initiatedDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-violet-400" />
                      <span className="text-gray-400">Evidence:</span>
                      <span className="text-white font-semibold">{dispute.evidence.length} files</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-amber-400" />
                      <span className="text-gray-400">Messages:</span>
                      <span className="text-white font-semibold">{dispute.messages.length}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300 font-medium">Dispute Progress</span>
                      <span className="text-white font-bold">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2 bg-gray-800" />
                    <div className="text-xs text-gray-400">Current stage: {getDisputeStatusLabel(dispute.status)}</div>
                  </div>

                  {dispute.arbitratorName && (
                    <div className="bg-orange-900/20 rounded-lg p-3 border border-orange-700/30">
                      <div className="flex items-center gap-2 mb-1">
                        <Gavel className="w-4 h-4 text-orange-400" />
                        <span className="text-sm font-medium text-orange-300">Arbitrator Assigned</span>
                      </div>
                      <p className="text-xs text-orange-200/70">{dispute.arbitratorName} is reviewing this case</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    {getActionButton(dispute)}
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 bg-transparent text-gray-200 hover:text-blue-300 font-medium"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 hover:border-emerald-500 hover:bg-emerald-500/10 bg-transparent text-gray-200 hover:text-emerald-300 font-medium"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Chat
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
            <AlertTriangle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Ongoing Disputes</h3>
            <p className="text-gray-500">You dont have any active disputes at the moment</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
