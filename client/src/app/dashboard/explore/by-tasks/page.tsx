"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Clock, DollarSign, Briefcase, TrendingUp } from "lucide-react"

const taskData = [
  {
    id: 1,
    title: "Smart Contract Security Audit",
    organization: "DeFi Protocol",
    description: "Comprehensive security audit for our new lending protocol smart contracts.",
    price: "3.5 ETH",
    type: "MILESTONE",
    urgent: true,
    duration: "2-3 weeks",
    skills: ["Solidity", "Security", "DeFi"],
    difficulty: "Expert",
  },
  {
    id: 2,
    title: "NFT Marketplace Frontend",
    organization: "CryptoArt Studio",
    description: "Build a modern React frontend for NFT trading platform with Web3 integration.",
    price: "2.8 ETH",
    type: "SINGLE",
    urgent: false,
    duration: "1-2 weeks",
    skills: ["React", "Web3", "TypeScript"],
    difficulty: "Intermediate",
  },
  {
    id: 3,
    title: "DeFi Yield Farming Protocol",
    organization: "Yield Labs",
    description: "Develop smart contracts for automated yield farming and liquidity mining.",
    price: "4.2 ETH",
    type: "MILESTONE",
    urgent: true,
    duration: "3-4 weeks",
    skills: ["Solidity", "DeFi", "Smart Contracts"],
    difficulty: "Expert",
  },
  {
    id: 4,
    title: "Cross-chain Bridge Development",
    organization: "Bridge Protocol",
    description: "Create secure cross-chain bridge for token transfers between networks.",
    price: "5.1 ETH",
    type: "MILESTONE",
    urgent: false,
    duration: "4-5 weeks",
    skills: ["Blockchain", "Security", "Cross-chain"],
    difficulty: "Expert",
  },
  {
    id: 5,
    title: "DAO Governance Interface",
    organization: "Governance Labs",
    description: "Create intuitive interface for decentralized governance and voting mechanisms.",
    price: "3.2 ETH",
    type: "SINGLE",
    urgent: false,
    duration: "2-3 weeks",
    skills: ["React", "Governance", "UI/UX"],
    difficulty: "Intermediate",
  },
  {
    id: 6,
    title: "Token Analytics Dashboard",
    organization: "Analytics Pro",
    description: "Build comprehensive analytics dashboard for token performance and metrics.",
    price: "2.9 ETH",
    type: "SINGLE",
    urgent: true,
    duration: "1-2 weeks",
    skills: ["Analytics", "Charts", "React"],
    difficulty: "Intermediate",
  },
]

const mockStats = {
  totalTasks: 156,
  urgentTasks: 23,
  averageReward: 3.4,
  completionRate: 94,
}

export default function WorkTask() {
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterDifficulty, setFilterDifficulty] = useState("all")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const filteredTasks = taskData.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.organization.toLowerCase().includes(search.toLowerCase()) ||
      task.skills.some((skill) => skill.toLowerCase().includes(search.toLowerCase()))

    const matchesType = filterType === "all" || task.type === filterType
    const matchesDifficulty = filterDifficulty === "all" || task.difficulty === filterDifficulty

    return matchesSearch && matchesType && matchesDifficulty
  })

  return (
    <div className="min-h-screen text-[var(--color-foreground)] font-sans">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-[var(--color-foreground)] font-display mb-1">Explore Tasks</h1>
            <p className="text-[var(--color-muted)] text-lg font-sans">
              Discover opportunities that match your expertise and interests
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 font-semibold">
              <Briefcase className="w-4 h-4 mr-2" />
              Post a Task
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-700/30 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-blue-300 text-sm font-semibold tracking-wide">TOTAL TASKS</p>
                  <p className="text-4xl font-bold text-white">{mockStats.totalTasks}</p>
                  <p className="text-blue-200/70 text-xs">Available now</p>
                </div>
                <div className="bg-blue-500/20 p-4 rounded-xl border border-blue-500/30">
                  <Briefcase className="w-7 h-7 text-blue-300" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 border-amber-700/30 backdrop-blur-sm hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-amber-300 text-sm font-semibold tracking-wide">URGENT TASKS</p>
                  <p className="text-4xl font-bold text-white">{mockStats.urgentTasks}</p>
                  <p className="text-amber-200/70 text-xs">High priority</p>
                </div>
                <div className="bg-amber-500/20 p-4 rounded-xl border border-amber-500/30">
                  <Clock className="w-7 h-7 text-amber-300" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border-emerald-700/30 backdrop-blur-sm hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-emerald-300 text-sm font-semibold tracking-wide">AVG REWARD</p>
                  <p className="text-4xl font-bold text-white">{mockStats.averageReward} ETH</p>
                  <p className="text-emerald-200/70 text-xs">Per task</p>
                </div>
                <div className="bg-emerald-500/20 p-4 rounded-xl border border-emerald-500/30">
                  <DollarSign className="w-7 h-7 text-emerald-300" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-violet-900/30 to-violet-800/20 border-violet-700/30 backdrop-blur-sm hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-violet-300 text-sm font-semibold tracking-wide">SUCCESS RATE</p>
                  <p className="text-4xl font-bold text-white">{mockStats.completionRate}%</p>
                  <p className="text-violet-200/70 text-xs">Task completion</p>
                </div>
                <div className="bg-violet-500/20 p-4 rounded-xl border border-violet-500/30">
                  <TrendingUp className="w-7 h-7 text-violet-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search tasks, organizations, or skills..."
                    value={search}
                    onChange={handleChange}
                    className="pl-12 h-12 bg-gray-800/50 border-gray-600 focus:border-emerald-500 text-white placeholder:text-gray-400 text-base"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full md:w-40 h-12 bg-gray-800/50 border-gray-600 text-white">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="SINGLE">Single Task</SelectItem>
                    <SelectItem value="MILESTONE">Milestone</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                  <SelectTrigger className="w-full md:w-40 h-12 bg-gray-800/50 border-gray-600 text-white">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400 font-sans">
            Showing <span className="text-white font-semibold">{filteredTasks.length}</span> tasks
            {search && (
              <>
                {' '}for <span className="text-blue-300 font-semibold">&quot;{search}&quot;</span>
              </>
            )}
          </p>
        </div>

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {filteredTasks.map((task) => (
            <Card
              key={task.id}
              className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm hover:shadow-lg hover:shadow-gray-500/10 transition-all duration-300 hover:border-gray-600/50 group"
            >
              {task.urgent && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30 border rounded-full text-xs font-semibold animate-pulse">
                    Urgent
                  </Badge>
                </div>
              )}
              <CardContent className="p-6">
                <div className="flex">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-[var(--color-foreground)] group-hover:text-blue-300 transition-colors duration-300 font-display">
                        {task.title}
                      </h3>
                      <Badge
                        variant="outline"
                        className={`text-xs font-semibold ${
                          task.difficulty === "Expert"
                            ? "border-red-500/30 text-red-300 bg-red-500/10"
                            : task.difficulty === "Intermediate"
                              ? "border-amber-500/30 text-amber-300 bg-amber-500/10"
                              : "border-emerald-500/30 text-emerald-300 bg-emerald-500/10"
                        }`}
                      >
                        {task.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm font-semibold text-[var(--color-muted)] mb-3 font-sans">{task.organization}</p>
                    <p className="text-sm text-[var(--color-muted)] mb-4 leading-relaxed font-sans">{task.description}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {task.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="border-gray-600 text-gray-300 bg-gray-800/50 text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-[var(--color-muted)] text-xs">
                        <span>Duration: {task.duration}</span>
                      </div>
                      <p className="text-2xl font-bold text-emerald-300 font-display">{task.price}</p>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 font-semibold">
                        Request to Join
                      </Button>
                    </div>
                  </div>
                  {/* Vertical Text */}
                  <div className="flex items-center">
                    <div className="transform rotate-90 origin-center">
                      <span className="text-xs font-bold text-gray-500 tracking-wider whitespace-nowrap font-sans">
                        {task.type}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {filteredTasks.length > 0 && (
          <div className="text-center">
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-blue-800/20 hover:border-blue-500/50 font-semibold px-8 py-3 rounded-xl bg-transparent font-sans shadow-md"
            >
              Load More Tasks
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
              <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 font-display">No tasks found</h3>
              <p className="text-gray-400 font-sans">
                Try adjusting your search criteria or filters to find more tasks.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
