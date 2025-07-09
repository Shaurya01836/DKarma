export type ContractStatus = "DRAFT" | "PENDING_SIGNATURE" | "ACTIVE" | "COMPLETED" | "DISPUTED" | "CANCELLED"
export type PaymentStatus = "PENDING" | "PARTIAL" | "COMPLETED" | "OVERDUE"
export type ContractType = "FIXED_PRICE" | "HOURLY" | "MILESTONE_BASED"

export interface Contract {
  id: string
  freelancerId: string
  freelancerName: string
  freelancerAvatar?: string
  freelancerRating: number
  taskTitle: string
  description: string
  amount: number
  currency: string
  duration: string
  status: ContractStatus
  paymentStatus: PaymentStatus
  contractType: ContractType
  startDate: string
  endDate?: string
  signedDate?: string
  createdDate: string
  milestones?: Milestone[]
  terms: ContractTerms
  attachments?: Attachment[]
  lastActivity: string
}

export interface Milestone {
  id: string
  title: string
  description: string
  amount: number
  dueDate: string
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "REJECTED"
  deliverables: string[]
}

export interface ContractTerms {
  scopeOfWork: string
  paymentTerms: string
  deliverables: string[]
  timeline: string
  revisions: number
  cancellationPolicy: string
  intellectualProperty: string
  confidentiality: string
}

export interface Attachment {
  id: string
  name: string
  type: string
  size: string
  url: string
  uploadedDate: string
}
