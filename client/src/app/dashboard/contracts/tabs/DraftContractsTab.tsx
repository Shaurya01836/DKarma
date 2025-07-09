import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Edit, Send, Calendar, DollarSign, Clock, Star, FileText } from "lucide-react"
import type { Contract } from "@/types"
import { getContractStatusColor, formatCurrency, formatDate } from "@/utils"

interface DraftContractsTabProps {
  contracts: Contract[]
}

export default function DraftContractsTab({ contracts }: DraftContractsTabProps) {
  const draftContracts = contracts.filter((c) => c.status === "DRAFT")

  return (
    <div className="space-y-6">
      {draftContracts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {draftContracts.map((contract) => (
            <Card
              key={contract.id}
              className="bg-gray-900/40 border-gray-700/50 hover:bg-gray-900/60 transition-all duration-300 hover:shadow-xl hover:shadow-gray-500/5 backdrop-blur-sm"
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
                  <Badge className={`${getContractStatusColor(contract.status)} border font-medium`}>DRAFT</Badge>
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
                    <span className="text-gray-400">Start Date:</span>
                    <span className="text-white font-semibold">{formatDate(contract.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span className="text-gray-400">Created:</span>
                    <span className="text-white font-semibold">{formatDate(contract.createdDate)}</span>
                  </div>
                </div>

                <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-300">Draft Status</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    This contract is still in draft mode. Review and send it to the freelancer when ready.
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 bg-transparent text-gray-200 hover:text-blue-300 font-medium"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 hover:border-amber-500 hover:bg-amber-500/10 bg-transparent text-gray-200 hover:text-amber-300 font-medium"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 font-medium">
                    <Send className="w-4 h-4 mr-2" />
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-gray-900/30 border-gray-800 border-dashed">
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Draft Contracts</h3>
            <p className="text-gray-500 mb-6">Create a new contract to get started</p>
            <Button className="bg-blue-600 hover:bg-blue-700">Create New Contract</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
