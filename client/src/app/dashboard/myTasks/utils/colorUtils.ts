import type { Priority, TaskStatus, ProposalStatus } from "../types"

export const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case "LOW":
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-emerald-500/10"
    case "MEDIUM":
      return "bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-amber-500/10"
    case "HIGH":
      return "bg-orange-500/15 text-orange-300 border-orange-500/40 shadow-orange-500/10"
    case "URGENT":
      return "bg-red-500/15 text-red-300 border-red-500/40 shadow-red-500/10"
  }
}

export const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case "OPEN":
      return "bg-sky-500/15 text-sky-300 border-sky-500/40 shadow-sky-500/10"
    case "IN PROGRESS":
      return "bg-violet-500/15 text-violet-300 border-violet-500/40 shadow-violet-500/10"
    case "REVIEW":
      return "bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-amber-500/10"
    case "COMPLETED":
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-emerald-500/10"
    case "DISPUTE":
      return "bg-red-500/15 text-red-300 border-red-500/40 shadow-red-500/10"
    case "MILESTONE REJECTED":
      return "bg-red-500/15 text-red-300 border-red-500/40 shadow-red-500/10"
  }
}

export const getProposalStatusColor = (status: ProposalStatus) => {
  switch (status) {
    case "PENDING":
      return "bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-amber-500/10"
    case "ACCEPTED":
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-emerald-500/10"
    case "REJECTED":
      return "bg-red-500/15 text-red-300 border-red-500/40 shadow-red-500/10"
    case "SHORTLISTED":
      return "bg-sky-500/15 text-sky-300 border-sky-500/40 shadow-sky-500/10"
  }
}
