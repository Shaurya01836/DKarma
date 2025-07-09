import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, XCircle, DollarSign, Timer, Star } from "lucide-react"
import type { Proposal } from "@/types"
import { getProposalStatusColor } from "@/utils"

interface ProposalsTabProps {
  proposals: Proposal[]
}

export default function ProposalsTab({ proposals }: ProposalsTabProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {proposals.map((proposal) => (
        <Card
          key={proposal.id}
          className="bg-gray-900/40 border-gray-700/50 hover:bg-gray-900/60 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 backdrop-blur-sm"
        >
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-lg text-white line-clamp-2 leading-tight">{proposal.taskTitle}</CardTitle>
                <Badge className={`${getProposalStatusColor(proposal.status)} border font-medium w-fit`}>
                  {proposal.status}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12 border-2 border-gray-600">
                <AvatarImage src={proposal.freelancerAvatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gray-700 text-white font-semibold">
                  {proposal.proposedBy
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-white text-base">{proposal.proposedBy}</p>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{proposal.freelancerRating}</span>
                  </div>
                  <span className="text-gray-500">•</span>
                  <span>{proposal.completedProjects} projects</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-300 line-clamp-3 leading-relaxed">{proposal.description}</p>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-emerald-300">
                <DollarSign className="w-5 h-5" />
                <span className="font-bold text-lg">${proposal.bidAmount.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Timer className="w-4 h-4" />
                <span className="text-sm font-medium">{proposal.deliveryTime}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 bg-transparent text-gray-200 hover:text-blue-300 font-medium"
              >
                <Eye className="w-4 h-4 mr-1" />
                View
              </Button>
              {proposal.status === "PENDING" && (
                <>
                  <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700 font-medium">
                    Accept
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500 text-red-300 hover:bg-red-500/10 bg-transparent hover:text-red-200"
                  >
                    <XCircle className="w-4 h-4" />
                  </Button>
                </>
              )}
              {proposal.status === "SHORTLISTED" && (
                <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 font-medium">
                  Interview
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
