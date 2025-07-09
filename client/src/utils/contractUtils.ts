import type { ContractStatus, PaymentStatus } from "@/types"

export const getContractStatusColor = (status: ContractStatus) => {
  switch (status) {
    case "DRAFT":
      return "bg-gray-500/15 text-gray-300 border-gray-500/40"
    case "PENDING_SIGNATURE":
      return "bg-amber-500/15 text-amber-300 border-amber-500/40"
    case "ACTIVE":
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
    case "COMPLETED":
      return "bg-blue-500/15 text-blue-300 border-blue-500/40"
    case "DISPUTED":
      return "bg-red-500/15 text-red-300 border-red-500/40"
    case "CANCELLED":
      return "bg-gray-500/15 text-gray-300 border-gray-500/40"
  }
}

export const getPaymentStatusColor = (status: PaymentStatus) => {
  switch (status) {
    case "PENDING":
      return "bg-amber-500/15 text-amber-300 border-amber-500/40"
    case "PARTIAL":
      return "bg-blue-500/15 text-blue-300 border-blue-500/40"
    case "COMPLETED":
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
    case "OVERDUE":
      return "bg-red-500/15 text-red-300 border-red-500/40"
  }
}

export const getMilestoneStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-gray-500/15 text-gray-300 border-gray-500/40"
    case "IN_PROGRESS":
      return "bg-blue-500/15 text-blue-300 border-blue-500/40"
    case "COMPLETED":
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
    case "REJECTED":
      return "bg-red-500/15 text-red-300 border-red-500/40"
  }
}

