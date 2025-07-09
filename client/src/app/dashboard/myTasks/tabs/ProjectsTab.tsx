"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Users, MessageSquare, CheckCircle, DollarSign, Calendar, User } from "lucide-react"
import type { Task } from "@/types"
import { getStatusColor, getPriorityColor } from "@/utils"

interface ProjectsTabProps {
  tasks: Task[]
}

export default function ProjectsTab({ tasks }: ProjectsTabProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || task.status === filterStatus
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="space-y-6">
      {/* Enhanced Filters */}
      <Card className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search projects by title or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-gray-800/50 border-gray-600 focus:border-blue-500 text-white placeholder:text-gray-400 text-base"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-52 h-12 bg-gray-800/50 border-gray-600 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="OPEN">Open</SelectItem>
                <SelectItem value="IN PROGRESS">In Progress</SelectItem>
                <SelectItem value="REVIEW">Review</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-full md:w-52 h-12 bg-gray-800/50 border-gray-600 text-white">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="URGENT">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Projects List */}
      <div className="space-y-6">
        {filteredTasks.map((task) => (
          <Card
            key={task.id}
            className="bg-gray-900/40 border-gray-700/50 hover:bg-gray-900/60 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 backdrop-blur-sm"
          >
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-bold text-xl text-white">{task.title}</h3>
                    <Badge className={`${getStatusColor(task.status)} border font-medium`}>{task.status}</Badge>
                    <Badge className={`${getPriorityColor(task.priority)} border font-medium`}>{task.priority}</Badge>
                  </div>

                  <p className="text-gray-300 text-base leading-relaxed line-clamp-2">{task.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {task.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs border-gray-600 text-gray-300 bg-gray-800/30 hover:bg-gray-700/50 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-8 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      <span className="font-semibold">${task.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span>Due {new Date(task.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-violet-400" />
                      <span>{task.proposalsCount} proposals</span>
                    </div>
                    {task.assignedTo && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-amber-400" />
                        <span>{task.assignedTo}</span>
                      </div>
                    )}
                  </div>

                  {task.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300 font-medium">Progress</span>
                        <span className="text-white font-bold">{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} className="h-3 bg-gray-800" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3 lg:w-52">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  {task.status === "OPEN" && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-gray-600 hover:border-emerald-500 hover:bg-emerald-500/10 bg-transparent text-gray-200 hover:text-emerald-300 font-semibold"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      View Proposals ({task.proposalsCount})
                    </Button>
                  )}
                  {task.status === "IN PROGRESS" && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-gray-600 hover:border-amber-500 hover:bg-amber-500/10 bg-transparent text-gray-200 hover:text-amber-300 font-semibold"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message Freelancer
                    </Button>
                  )}
                  {task.status === "REVIEW" && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-gray-600 hover:border-emerald-500 hover:bg-emerald-500/10 bg-transparent text-gray-200 hover:text-emerald-300 font-semibold"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve Work
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
