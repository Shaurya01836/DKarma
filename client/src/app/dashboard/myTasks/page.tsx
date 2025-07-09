"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, BarChart3, Layers, Users, PlusCircle, Briefcase, Activity, Award, DollarSign } from "lucide-react"
import { mockTasks, mockProposals } from "./data/mockData"
import OverviewTab from "./tabs/OverviewTab"
import ProjectsTab from "./tabs/ProjectsTab"
import ProposalsTab from "./tabs/ProposalsTab"
import CreateProjectTab from "./tabs/CreateProjectTab"

export default function ClientTaskDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Calculate dashboard stats
  const totalTasks = mockTasks.length
  const activeTasks = mockTasks.filter((t) => t.status === "IN PROGRESS" || t.status === "REVIEW").length
  const completedTasks = mockTasks.filter((t) => t.status === "COMPLETED").length
  const totalBudget = mockTasks.reduce((sum, task) => sum + task.budget, 0)

  const tabs = [
    {
      id: "overview",
      label: "Dashboard",
      icon: BarChart3,
      description: "Overview & Analytics",
    },
    {
      id: "projects",
      label: "My Projects",
      icon: Layers,
      description: "Active & Completed",
    },
    {
      id: "proposals",
      label: "Proposals",
      icon: Users,
      description: "Review & Manage",
    },
    {
      id: "create",
      label: "New Project",
      icon: PlusCircle,
      description: "Create & Publish",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-background)] via-[var(--color-surface)] to-[var(--color-background)] text-[var(--color-foreground)] font-sans">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-[var(--color-foreground)] font-display mb-1">
              TaskFlow Hub
            </h1>
            <p className="text-[var(--color-muted)] text-lg font-sans">
              Manage your projects, track progress, and collaborate with top talent
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 font-semibold">
              <Plus className="w-4 h-4 mr-2" />
              Post New Project
            </Button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-700/30 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-blue-300 text-sm font-semibold tracking-wide">TOTAL PROJECTS</p>
                  <p className="text-2xl font-bold text-white">{totalTasks}</p>
                  <p className="text-blue-200/70 text-xs">All time projects</p>
                </div>
                <div className="bg-blue-500/20 p-4 rounded-xl border border-blue-500/30">
                  <Briefcase className="w-7 h-7 text-blue-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-violet-900/30 to-violet-800/20 border-violet-700/30 backdrop-blur-sm hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-violet-300 text-sm font-semibold tracking-wide">ACTIVE PROJECTS</p>
                  <p className="text-2xl font-bold text-white">{activeTasks}</p>
                  <p className="text-violet-200/70 text-xs">In progress & review</p>
                </div>
                <div className="bg-violet-500/20 p-4 rounded-xl border border-violet-500/30">
                  <Activity className="w-7 h-7 text-violet-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border-emerald-700/30 backdrop-blur-sm hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-emerald-300 text-sm font-semibold tracking-wide">COMPLETED</p>
                  <p className="text-2xl font-bold text-white">{completedTasks}</p>
                  <p className="text-emerald-200/70 text-xs">Successfully delivered</p>
                </div>
                <div className="bg-emerald-500/20 p-4 rounded-xl border border-emerald-500/30">
                  <Award className="w-7 h-7 text-emerald-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 border-amber-700/30 backdrop-blur-sm hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-amber-300 text-sm font-semibold tracking-wide">TOTAL BUDGET</p>
                  <p className="text-2xl font-bold text-white">${totalBudget.toLocaleString()}</p>
                  <p className="text-amber-200/70 text-xs">Investment value</p>
                </div>
                <div className="bg-amber-500/20 p-4 rounded-xl border border-amber-500/30">
                  <DollarSign className="w-7 h-7 text-amber-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="mb-8">
          <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-2 shadow-2xl">
            <div className="flex flex-col sm:flex-row gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 group flex-1 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25 transform scale-[1.02]"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/60"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        isActive ? "bg-white/20" : "bg-gray-700/50 group-hover:bg-gray-600/50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold">{tab.label}</div>
                      <div
                        className={`text-xs transition-all duration-300 ${
                          isActive ? "text-blue-100" : "text-gray-400 group-hover:text-gray-300"
                        }`}
                      >
                        {tab.description}
                      </div>
                    </div>
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/20 to-blue-500/20 animate-pulse" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-500">
          {activeTab === "overview" && <OverviewTab tasks={mockTasks} />}
          {activeTab === "projects" && <ProjectsTab tasks={mockTasks} />}
          {activeTab === "proposals" && <ProposalsTab proposals={mockProposals} />}
          {activeTab === "create" && <CreateProjectTab />}
        </div>
      </div>
    </div>
  )
}
