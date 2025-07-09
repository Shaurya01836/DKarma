import type { DisputeStatus, DisputeReason, VoteType, Vote } from "@/types"

export const calculateVoteResults = (votes: Vote[]) => {
  const result = {
    forClient: 0,
    forFreelancer: 0,
    neutral: 0,
    abstain: 0,
    total: votes.length,
  }

  for (const v of votes) {
    switch (v.vote) {
      case "FOR_CLIENT":
        result.forClient++
        break
      case "FOR_FREELANCER":
        result.forFreelancer++
        break
      case "NEUTRAL":
        result.neutral++
        break
      case "ABSTAIN":
        result.abstain++
        break
    }
  }

  return result
}


export const getDisputeStatusColor = (status: DisputeStatus) => {
  switch (status) {
    case "ONGOING":
      return "bg-amber-500/15 text-amber-300 border-amber-500/40"
    case "AWAITING_EVIDENCE":
      return "bg-blue-500/15 text-blue-300 border-blue-500/40"
    case "WITNESS_VOTING":
      return "bg-violet-500/15 text-violet-300 border-violet-500/40"
    case "ARBITRATOR_REVIEW":
      return "bg-orange-500/15 text-orange-300 border-orange-500/40"
    case "RESOLVED":
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
    case "ESCALATED":
      return "bg-red-500/15 text-red-300 border-red-500/40"
  }
}

export const getDisputeReasonColor = (reason: DisputeReason) => {
  switch (reason) {
    case "DELIVERABLES_NOT_MET":
      return "bg-red-500/15 text-red-300 border-red-500/40"
    case "PAYMENT_DISPUTE":
      return "bg-amber-500/15 text-amber-300 border-amber-500/40"
    case "QUALITY_CONCERNS":
      return "bg-orange-500/15 text-orange-300 border-orange-500/40"
    case "MISSED_DEADLINES":
      return "bg-violet-500/15 text-violet-300 border-violet-500/40"
    case "COMMUNICATION_BREAKDOWN":
      return "bg-blue-500/15 text-blue-300 border-blue-500/40"
    case "SCOPE_DISAGREEMENT":
      return "bg-gray-500/15 text-gray-300 border-gray-500/40"
    case "UNSATISFACTORY_WORK":
      return "bg-red-500/15 text-red-300 border-red-500/40"
    case "CONTRACT_VIOLATION":
      return "bg-red-500/15 text-red-300 border-red-500/40"
  }
}

export const getVoteTypeColor = (vote: VoteType) => {
  switch (vote) {
    case "FOR_CLIENT":
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
    case "FOR_FREELANCER":
      return "bg-red-500/15 text-red-300 border-red-500/40"
    case "NEUTRAL":
      return "bg-gray-500/15 text-gray-300 border-gray-500/40"
    case "ABSTAIN":
      return "bg-amber-500/15 text-amber-300 border-amber-500/40"
  }
}


export const getDisputeReasonLabel = (reason: DisputeReason) => {
  return reason
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase())
}

export const getDisputeStatusLabel = (status: DisputeStatus) => {
  return status
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase())
}

export const calculateDisputeProgress = (status: DisputeStatus) => {
  switch (status) {
    case "ONGOING":
      return 20
    case "AWAITING_EVIDENCE":
      return 40
    case "WITNESS_VOTING":
      return 60
    case "ARBITRATOR_REVIEW":
      return 80
    case "RESOLVED":
      return 100
    case "ESCALATED":
      return 90
    default:
      return 0
  }
}
