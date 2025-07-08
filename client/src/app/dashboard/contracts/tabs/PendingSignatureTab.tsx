"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, FileSignature, Clock, DollarSign, Calendar, Star, AlertCircle } from "lucide-react"
import type { Contract } from "../types/contracts"
import { getContractStatusColor, formatCurrency, formatDate } from "../utils/contractUtils"

interface PendingSignatureTabProps {
  contracts: Contract[]
  onSignContract: (contractId: string) => void
  onViewContract: (contractId: string) => void
}

export default function PendingSignatureTab({ contracts, onSignContract, onViewContract }: PendingSignatureTabProps) {
  const pendingContracts = contracts.filter((c) => c.status === "PENDING_SIGNATURE")

  return (
    <div className="space-y-6">
      {pendingContracts.length > 0 && (
        <Card className="bg-amber-900/20 border-amber-700/40 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-amber-300 font-medium">Contracts Awaiting Your Signature</p>
                <p className="text-amber-200/70 text-sm">
                  You have {pendingContracts.length} contract{pendingContracts.length !== 1 ? "s" : ""} waiting for your
                  signature
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {pendingContracts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {pendingContracts.map((contract) => (
            <Card
              key={contract.id}
              className="bg-gray-900/40 border-gray-700/50 hover:bg-gray-900/60 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 backdrop-blur-sm"
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
                  <Badge className={`${getContractStatusColor(contract.status)} border font-medium animate-pulse`}>
                    PENDING SIGNATURE
                  </Badge>
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
                  <h5 className="text-sm font-medium text-white mb-2">Key Terms:</h5>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Payment: {contract.terms.paymentTerms}</li>
                    <li>• Revisions: {contract.terms.revisions} included</li>
                    <li>• Timeline: {contract.terms.timeline}</li>
                  </ul>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 bg-transparent text-gray-200 hover:text-blue-300 font-medium"
                    onClick={() => onViewContract(contract.id)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Review Terms
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 font-medium"
                    onClick={() => onSignContract(contract.id)}
                  >
                    <FileSignature className="w-4 h-4 mr-2" />
                    Sign Contract
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-gray-900/30 border-gray-800 border-dashed">
          <CardContent className="p-12 text-center">
            <FileSignature className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Pending Signatures</h3>
            <p className="text-gray-500">All your contracts are up to date</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
