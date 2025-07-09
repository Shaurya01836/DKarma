export type TransactionType =
  | "DEPOSIT"
  | "WITHDRAWAL"
  | "ESCROW_LOCK"
  | "ESCROW_RELEASE"
  | "REFUND"
  | "PAYMENT"
  | "FEE"
  | "BONUS"

export type TransactionStatus = "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED"
export type FundCategory = "ESCROWED" | "RELEASED" | "REFUNDABLE" | "AVAILABLE"
export type PaymentMethodType = "CREDIT_CARD" | "BANK_ACCOUNT" | "PAYPAL" | "CRYPTO"

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  currency: string
  status: TransactionStatus
  description: string
  projectId?: string
  projectTitle?: string
  freelancerName?: string
  timestamp: string
  fee?: number
  reference?: string
  paymentMethod?: string
}

export interface PaymentMethod {
  id: string
  type: PaymentMethodType
  name: string
  details: string
  isDefault: boolean
  isVerified: boolean
  expiryDate?: string
  lastUsed?: string
  addedDate: string
}

export interface WalletBalance {
  totalBalance: number
  availableBalance: number
  escrowedFunds: number
  releasedFunds: number
  refundableFunds: number
  pendingWithdrawals: number
  currency: string
}

export interface BudgetAllocation {
  id: string
  projectId: string
  projectTitle: string
  allocatedAmount: number
  spentAmount: number
  remainingAmount: number
  status: "ACTIVE" | "COMPLETED" | "PAUSED"
  createdDate: string
}

export interface AutoPayment {
  id: string
  name: string
  amount: number
  frequency: "WEEKLY" | "MONTHLY" | "QUARTERLY"
  nextPayment: string
  paymentMethodId: string
  isActive: boolean
  createdDate: string
}
