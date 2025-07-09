import type { TransactionType, TransactionStatus, PaymentMethodType } from "@/types"

export const getTransactionTypeColor = (type: TransactionType) => {
  switch (type) {
    case "DEPOSIT":
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
    case "WITHDRAWAL":
      return "bg-red-500/15 text-red-300 border-red-500/40"
    case "ESCROW_LOCK":
      return "bg-amber-500/15 text-amber-300 border-amber-500/40"
    case "ESCROW_RELEASE":
      return "bg-blue-500/15 text-blue-300 border-blue-500/40"
    case "REFUND":
      return "bg-violet-500/15 text-violet-300 border-violet-500/40"
    case "PAYMENT":
      return "bg-orange-500/15 text-orange-300 border-orange-500/40"
    case "FEE":
      return "bg-gray-500/15 text-gray-300 border-gray-500/40"
    case "BONUS":
      return "bg-green-500/15 text-green-300 border-green-500/40"
  }
}

export const getTransactionStatusColor = (status: TransactionStatus) => {
  switch (status) {
    case "PENDING":
      return "bg-amber-500/15 text-amber-300 border-amber-500/40"
    case "COMPLETED":
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
    case "FAILED":
      return "bg-red-500/15 text-red-300 border-red-500/40"
    case "CANCELLED":
      return "bg-gray-500/15 text-gray-300 border-gray-500/40"
  }
}

export const getPaymentMethodIcon = (type: PaymentMethodType) => {
  switch (type) {
    case "CREDIT_CARD":
      return "💳"
    case "BANK_ACCOUNT":
      return "🏦"
    case "PAYPAL":
      return "💰"
    case "CRYPTO":
      return "₿"
  }
}


export const getTransactionIcon = (type: TransactionType) => {
  switch (type) {
    case "DEPOSIT":
      return "↓"
    case "WITHDRAWAL":
      return "↑"
    case "ESCROW_LOCK":
      return "🔒"
    case "ESCROW_RELEASE":
      return "🔓"
    case "REFUND":
      return "↩"
    case "PAYMENT":
      return "💸"
    case "FEE":
      return "📋"
    case "BONUS":
      return "🎁"
  }
}
