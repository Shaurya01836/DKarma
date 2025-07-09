import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Eye, MessageSquare, Calendar, DollarSign, Clock, Star, FileText } from "lucide-react"
import type { Contract } from "@/types"
import { getContractStatusColor, getPaymentStatusColor, formatCurrency, formatDate } from "@/utils"

interface ActiveContractsTabProps {
  contracts: Contract[]
}

export default function ActiveContractsTab({ contracts }: ActiveContractsTabProps) {
  const activeContracts = contracts.filter((c) => c.status === "ACTIVE")

  return (
    <div className="space-y-6">
      {activeContracts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {activeContracts.map((contract) => {
            const completedMilestones = contract.milestones?.filter((m) => m.status === "COMPLETED").length || 0
            const totalMilestones = contract.milestones?.length || 0
            const progress = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0

            return (
              <Card
                key={contract.id}
                className="bg-gray-900/40 border-gray-700/50 hover:bg-gray-900/60 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12 border-2 border-gray-600">
                        <AvatarImage src={contract.freelancerAvatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gray-700 text-white font-semibold">
                          {contract.freelancerName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-white text-lg">{contract.freelancerName}</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm text-gray-300">{contract.freelancerRating}</span>
                          </div>
                          <span className="text-gray-500">•</span>
                          <span className="text-xs text-gray-400">{contract.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={`${getContractStatusColor(contract.status)} border font-medium`}>
                        {contract.status}
                      </Badge>
                      <Badge className={`${getPaymentStatusColor(contract.paymentStatus)} border font-medium`}>
                        {contract.paymentStatus}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-5">
                  <div>
                    <h4 className="font-semibold text-white mb-2">{contract.taskTitle}</h4>
                    <p className="text-gray-300 text-sm line-clamp-2">{contract.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      <span className="text-gray-400">Amount:</span>
                      <span className="text-white font-semibold">{formatCurrency(contract.amount)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-white font-semibold">{contract.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-violet-400" />
                      <span className="text-gray-400">Started:</span>
                      <span className="text-white font-semibold">{formatDate(contract.startDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-amber-400" />
                      <span className="text-gray-400">Type:</span>
                      <span className="text-white font-semibold">{contract.contractType.replace("_", " ")}</span>
                    </div>
                  </div>

                  {contract.milestones && contract.milestones.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-300">Progress</span>
                        <span className="text-sm font-bold text-white">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2 bg-gray-800" />
                      <div className="text-xs text-gray-400">
                        {completedMilestones} of {totalMilestones} milestones completed
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 font-medium">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-gray-600 hover:border-emerald-500 hover:bg-emerald-500/10 bg-transparent text-gray-200 hover:text-emerald-300 font-medium"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
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
            <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Active Contracts</h3>
            <p className="text-gray-500 mb-6">You dont have any active contracts at the moment</p>
            <Button className="bg-blue-600 hover:bg-blue-700">Browse Freelancers</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
