export type DisputeStatus =
  | "ONGOING"
  | "AWAITING_EVIDENCE"
  | "WITNESS_VOTING"
  | "ARBITRATOR_REVIEW"
  | "RESOLVED"
  | "ESCALATED"

export type DisputeReason =
  | "DELIVERABLES_NOT_MET"
  | "PAYMENT_DISPUTE"
  | "QUALITY_CONCERNS"
  | "MISSED_DEADLINES"
  | "COMMUNICATION_BREAKDOWN"
  | "SCOPE_DISAGREEMENT"
  | "UNSATISFACTORY_WORK"
  | "CONTRACT_VIOLATION"

export type DisputeOutcome =
  | "FULL_REFUND"
  | "PARTIAL_REFUND"
  | "NO_REFUND"
  | "TASK_COMPLETION_REQUIRED"
  | "PAYMENT_RELEASED"
  | "CONTRACT_TERMINATED"
  | "MEDIATION_REQUIRED"

export type VoteType = "FOR_CLIENT" | "FOR_FREELANCER" | "NEUTRAL" | "ABSTAIN"

export type EvidenceType = "DOCUMENT" | "IMAGE" | "VIDEO" | "COMMUNICATION" | "DELIVERABLE"

export interface Dispute {
  id: string
  projectId: string
  projectTitle: string
  freelancerId: string
  freelancerName: string
  freelancerAvatar?: string
  clientId: string
  reason: DisputeReason
  description: string
  status: DisputeStatus
  outcome?: DisputeOutcome
  amount: number
  currency: string
  initiatedDate: string
  resolvedDate?: string
  lastActivity: string
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
  evidence: Evidence[]
  messages: DisputeMessage[]
  votes?: Vote[]
  arbitratorId?: string
  arbitratorName?: string
  timeline: DisputeTimelineEvent[]
}

export interface Evidence {
  id: string
  type: EvidenceType
  title: string
  description: string
  fileUrl?: string
  fileName?: string
  fileSize?: string
  submittedBy: "CLIENT" | "FREELANCER" | "ARBITRATOR"
  submittedDate: string
  isVerified: boolean
}

export interface DisputeMessage {
  id: string
  senderId: string
  senderName: string
  senderType: "CLIENT" | "FREELANCER" | "ARBITRATOR" | "SYSTEM"
  message: string
  timestamp: string
  attachments?: string[]
  isPrivate: boolean
}

export interface Vote {
  id: string
  voterId: string
  voterName: string
  voterType: "WITNESS" | "ARBITRATOR" | "COMMUNITY"
  vote: VoteType
  reasoning?: string
  timestamp: string
  weight: number
}

export interface DisputeTimelineEvent {
  id: string
  type: "INITIATED" | "EVIDENCE_SUBMITTED" | "VOTE_CAST" | "STATUS_CHANGED" | "MESSAGE_SENT" | "RESOLVED"
  description: string
  timestamp: string
  actor: string
  actorType: "CLIENT" | "FREELANCER" | "ARBITRATOR" | "SYSTEM"
}

export interface DisputeStats {
  totalDisputes: number
  ongoingDisputes: number
  resolvedDisputes: number
  wonDisputes: number
  lostDisputes: number
  averageResolutionTime: number
  totalAmountDisputed: number
  totalAmountRecovered: number
}
