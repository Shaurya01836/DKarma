import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Download, Calendar, DollarSign, Clock, Star, Award } from "lucide-react"
import type { Contract } from "../types/contracts"
import { getContractStatusColor, formatCurrency, formatDate } from "../utils/contractUtils"

interface CompletedContractsTabProps {
  contracts: Contract[]
}

export default function CompletedContractsTab({ contracts }: CompletedContractsTabProps) {
  const completedContracts = contracts.filter((c) => c.status === "COMPLETED")

  return (
    <div className="space-y-6">
      {completedContracts.length > 0 && (
        <Card className="bg-emerald-900/20 border-emerald-700/40 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-emerald-300 font-medium">Successfully Completed Projects</p>
                <p className="text-emerald-200/70 text-sm">
                  You have completed {completedContracts.length} project{completedContracts.length !== 1 ? "s" : ""}{" "}
                  successfully
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {completedContracts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {completedContracts.map((contract) => (
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
                        <span className="text-xs text-gray-400">Completed</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={`${getContractStatusColor(contract.status)} border font-medium`}>COMPLETED</Badge>
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
                    <span className="text-gray-400">Completed:</span>
                    <span className="text-white font-semibold">{formatDate(contract.endDate!)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span className="text-gray-400">Started:</span>
                    <span className="text-white font-semibold">{formatDate(contract.startDate)}</span>
                  </div>
                </div>

                <div className="bg-emerald-900/20 rounded-lg p-3 border border-emerald-700/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-300">Project Completed Successfully</span>
                  </div>
                  <p className="text-xs text-emerald-200/70">
                    All deliverables were completed on time and met the project requirements.
                  </p>
                </div>

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
                    className="flex-1 border-gray-600 hover:border-emerald-500 hover:bg-emerald-500/10 bg-transparent text-gray-200 hover:text-emerald-300 font-medium"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-gray-900/30 border-gray-800 border-dashed">
          <CardContent className="p-12 text-center">
            <Award className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Completed Contracts</h3>
            <p className="text-gray-500">Your completed projects will appear here</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
