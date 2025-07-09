import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, ThumbsUp, ThumbsDown, Minus, X } from "lucide-react"
import type { Dispute, Vote } from "@/types"
import {
  getVoteTypeColor,
  formatCurrency,
  formatDate,
  getDisputeReasonLabel,
  calculateVoteResults,
} from "@/utils"


interface VoteHistoryTabProps {
  disputes: Dispute[]
}

const getVoteIcon = (vote: Vote["vote"]) => {
  switch (vote) {
    case "FOR_CLIENT":
      return <ThumbsUp className="w-4 h-4" />
    case "FOR_FREELANCER":
      return <ThumbsDown className="w-4 h-4" />
    case "NEUTRAL":
      return <Minus className="w-4 h-4" />
    case "ABSTAIN":
      return <X className="w-4 h-4" />
    default:
      return <Minus className="w-4 h-4" />
  }
}

const getVoteLabel = (vote: Vote["vote"]) => {
  switch (vote) {
    case "FOR_CLIENT":
      return "Voted For You"
    case "FOR_FREELANCER":
      return "Voted Against"
    case "NEUTRAL":
      return "Neutral Vote"
    case "ABSTAIN":
      return "Abstained"
    default:
      return vote
  }
}

export default function VoteHistoryTab({ disputes }: VoteHistoryTabProps) {
  const disputesWithVotes = disputes.filter((d) => d.votes && d.votes.length > 0)

  return (
    <div className="space-y-6">
      {disputesWithVotes.length > 0 ? (
        disputesWithVotes.map((dispute) => {
          const voteResults = calculateVoteResults(dispute.votes!)
          const clientWinning = voteResults.forClient > voteResults.forFreelancer

          return (
            <Card
              key={dispute.id}
              className="bg-gray-900/40 border-gray-700/50 hover:bg-gray-900/60 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 backdrop-blur-sm"
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
                      <Badge className="bg-blue-500/15 text-blue-300 border-blue-500/40 border text-xs mt-1">
                        {getDisputeReasonLabel(dispute.reason)}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{formatCurrency(dispute.amount)}</div>
                    <div className="text-xs text-gray-400">Dispute Amount</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-5">
                {/* Vote Results Summary */}
                <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white">Vote Results</h4>
                    <Badge
                      className={
                        clientWinning
                          ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
                          : "bg-red-500/15 text-red-300 border-red-500/40"
                      }
                    >
                      {clientWinning ? "Leading" : "Behind"}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-3 text-sm">
                    <div className="text-center">
                      <div className="text-emerald-400 font-bold text-lg">{voteResults.forClient}</div>
                      <div className="text-gray-400">For You</div>
                    </div>
                    <div className="text-center">
                      <div className="text-red-400 font-bold text-lg">{voteResults.forFreelancer}</div>
                      <div className="text-gray-400">Against</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400 font-bold text-lg">{voteResults.neutral}</div>
                      <div className="text-gray-400">Neutral</div>
                    </div>
                    <div className="text-center">
                      <div className="text-amber-400 font-bold text-lg">{voteResults.abstain}</div>
                      <div className="text-gray-400">Abstain</div>
                    </div>
                  </div>
                </div>

                {/* Individual Votes */}
                <div className="space-y-3">
                  <h5 className="font-medium text-white">Individual Votes ({dispute.votes!.length})</h5>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {dispute.votes!.map((vote) => (
                      <div key={vote.id} className="flex items-center justify-between p-3 bg-gray-800/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${getVoteTypeColor(vote.vote)} border`}>
                            {getVoteIcon(vote.vote)}
                          </div>
                          <div>
                            <div className="font-medium text-white">{vote.voterName}</div>
                            <div className="text-xs text-gray-400">
                              {vote.voterType} • {formatDate(vote.timestamp)}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={`${getVoteTypeColor(vote.vote)} border text-xs`}>
                            {getVoteLabel(vote.vote)}
                          </Badge>
                          {vote.reasoning && (
                            <div className="text-xs text-gray-400 mt-1 max-w-48 truncate">
                              {vote.reasoning}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 bg-transparent text-gray-200 hover:text-blue-300 font-medium"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Full Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })
      ) : (
        <Card className="bg-gray-900/30 border-gray-800 border-dashed">
          <CardContent className="p-12 text-center">
            <ThumbsUp className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Vote History</h3>
            <p className="text-gray-500">Disputes with community voting will appear here</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
