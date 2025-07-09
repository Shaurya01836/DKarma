export type TaskStatus = "OPEN" | "IN PROGRESS" | "COMPLETED" | "DISPUTE" | "MILESTONE REJECTED" | "REVIEW"
export type ProposalStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "SHORTLISTED"
export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT"
export type TaskCategory =
  | "web-development"
  | "mobile-development"
  | "design"
  | "marketing"
  | "writing"
  | "data-analysis"
  | "consulting"

export interface Task {
  id: string
  title: string
  status: TaskStatus
  priority: Priority
  category: TaskCategory
  budget: number
  deadline: string
  description: string
  progress: number
  proposalsCount: number
  assignedTo?: string
  createdAt: string
  tags: string[]
}

export interface Proposal {
  id: string
  taskId: string
  taskTitle: string
  proposedBy: string
  freelancerRating: number
  status: ProposalStatus
  bidAmount: number
  deliveryTime: string
  description: string
  freelancerAvatar?: string
  completedProjects: number
}
