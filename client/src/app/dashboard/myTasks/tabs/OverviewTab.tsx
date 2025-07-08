import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Clock, Plus, MessageSquare, Download } from "lucide-react"
import type { Task } from "../types"
import { getStatusColor } from "../utils/colorUtils"

interface OverviewTabProps {
  tasks: Task[]
}

export default function OverviewTab({ tasks }: OverviewTabProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Progress Overview */}
        <Card className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl text-white">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              Project Progress Overview
            </CardTitle>
            <CardDescription className="text-gray-300">Track the progress of your active projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {tasks.slice(0, 3).map((task) => (
              <div key={task.id} className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-sm font-semibold text-white line-clamp-1">{task.title}</span>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getStatusColor(task.status)} border text-xs font-medium`}>
                        {task.status}
                      </Badge>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-400">{task.assignedTo || "Unassigned"}</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-white bg-gray-800/50 px-2 py-1 rounded-md">
                    {task.progress}%
                  </span>
                </div>
                <Progress value={task.progress} className="h-3 bg-gray-800" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl text-white">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Clock className="w-6 h-6 text-emerald-400" />
              </div>
              Recent Activity
            </CardTitle>
            <CardDescription className="text-gray-300">Latest updates from your projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 bg-emerald-400 rounded-full mt-2 shadow-lg shadow-emerald-400/50"></div>
              <div className="space-y-1">
                <span className="text-sm font-medium text-white">Sarah Chen submitted milestone</span>
                <p className="text-xs text-gray-400">E-commerce Website - 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 shadow-lg shadow-blue-400/50"></div>
              <div className="space-y-1">
                <span className="text-sm font-medium text-white">New proposal received</span>
                <p className="text-xs text-gray-400">SEO Content Writing - 4 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 bg-amber-400 rounded-full mt-2 shadow-lg shadow-amber-400/50"></div>
              <div className="space-y-1">
                <span className="text-sm font-medium text-white">Alex requested feedback</span>
                <p className="text-xs text-gray-400">Mobile App UI Design - 6 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 bg-violet-400 rounded-full mt-2 shadow-lg shadow-violet-400/50"></div>
              <div className="space-y-1">
                <span className="text-sm font-medium text-white">Project completed</span>
                <p className="text-xs text-gray-400">Data Analysis Dashboard - 1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-white">Quick Actions</CardTitle>
          <CardDescription className="text-gray-300">
            Common tasks to help you manage your projects efficiently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Button className="h-24 flex-col gap-3 bg-gradient-to-br from-blue-600/20 to-blue-500/10 hover:from-blue-600/30 hover:to-blue-500/20 border border-blue-500/30 text-white hover:text-white transition-all duration-300">
              <Plus className="w-7 h-7" />
              <span className="font-semibold">Post New Project</span>
            </Button>
            <Button className="h-24 flex-col gap-3 bg-gradient-to-br from-emerald-600/20 to-emerald-500/10 hover:from-emerald-600/30 hover:to-emerald-500/20 border border-emerald-500/30 text-white hover:text-white transition-all duration-300">
              <MessageSquare className="w-7 h-7" />
              <span className="font-semibold">Message Freelancers</span>
            </Button>
            <Button className="h-24 flex-col gap-3 bg-gradient-to-br from-violet-600/20 to-violet-500/10 hover:from-violet-600/30 hover:to-violet-500/20 border border-violet-500/30 text-white hover:text-white transition-all duration-300">
              <Download className="w-7 h-7" />
              <span className="font-semibold">Download Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
