"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Wallet, Award, ArrowRight, Clock, MapPin, Sparkles, Building2, Users, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const jobsData = [
  {
    id: 1,
    title: "Smart Contract Development",
    organization: "DeFi Protocol Labs",
    payment: "3.5 ETH",
    type: "Milestone",
    duration: "2-3 weeks",
    location: "Remote",
    tags: ["Solidity", "Web3", "Smart Contracts"],
    urgent: true,
    difficulty: "Expert",
  },
  {
    id: 2,
    title: "React Frontend for NFT Marketplace",
    organization: "CryptoArt Studio",
    payment: "2.8 ETH",
    type: "Single Task",
    duration: "1-2 weeks",
    location: "Remote",
    tags: ["React", "TypeScript", "Web3"],
    urgent: false,
    difficulty: "Intermediate",
  },
  {
    id: 3,
    title: "DApp Integration & Testing",
    organization: "Blockchain Ventures",
    payment: "2.1 ETH",
    type: "Milestone",
    duration: "3-4 weeks",
    location: "Hybrid",
    tags: ["JavaScript", "Testing", "DApp"],
    urgent: false,
    difficulty: "Intermediate",
  },
  {
    id: 4,
    title: "Token Economics Design",
    organization: "GameFi Protocol",
    payment: "4.2 ETH",
    type: "Single Task",
    duration: "1 week",
    location: "Remote",
    tags: ["Economics", "Tokenomics", "Research"],
    urgent: true,
    difficulty: "Expert",
  },
  {
    id: 5,
    title: "Cross-chain Bridge Development",
    organization: "Multi-Chain Labs",
    payment: "5.1 ETH",
    type: "Milestone",
    duration: "4-5 weeks",
    location: "Remote",
    tags: ["Solidity", "Bridge", "Multi-chain"],
    urgent: false,
    difficulty: "Expert",
  },
  {
    id: 6,
    title: "Web3 Wallet Integration",
    organization: "Wallet Connect Inc",
    payment: "1.8 ETH",
    type: "Single Task",
    duration: "1 week",
    location: "Remote",
    tags: ["React", "Wallet", "Integration"],
    urgent: false,
    difficulty: "Beginner",
  },
]

const statsData = [
  {
    label: "Active Tasks",
    value: "12",
    subtext: "In Progress",
    icon: TrendingUp,
    color: "emerald",
    change: "+3 this week",
  },
  {
    label: "Total Earnings",
    value: "28.5 ETH",
    subtext: "This Month",
    icon: Wallet,
    color: "blue",
    change: "+15.2%",
  },
  {
    label: "Success Rate",
    value: "94%",
    subtext: "Completion Rate",
    icon: Award,
    color: "amber",
    change: "+2% this month",
  },
  {
    label: "Active Bids",
    value: "8",
    subtext: "Pending Response",
    icon: Target,
    color: "violet",
    change: "5 new today",
  },
]

const quickStats = [
  { label: "Profile Views", value: "156", change: "+12%" },
  { label: "Skill Rating", value: "4.8", change: "+0.2" },
  { label: "Response Time", value: "2h", change: "-30min" },
  { label: "Projects", value: "47", change: "+3" },
]

const motivationalQuotes = [
  "Opportunities don't happen. You create them.",
  "Success is not for the lazy.",
  "Web3 is the future. Be a part of it!",
  "Every contract is a step closer to your dream.",
  "Stay curious, stay building!",
]

export default function FreelancerDashboard() {
  const [visibleJobs, setVisibleJobs] = useState(3)
  const [quoteIdx, setQuoteIdx] = useState(0)
  const [quoteFade, setQuoteFade] = useState(true)

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteFade(false)
      setTimeout(() => {
        setQuoteIdx((prev) => (prev + 1) % motivationalQuotes.length)
        setQuoteFade(true)
      }, 400)
    }, 7000)
    return () => clearInterval(quoteInterval)
  }, [])

  const handleLoadMore = () => {
    setVisibleJobs((prev) => Math.min(prev + 3, jobsData.length))
  }

  // Dynamic greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Expert":
        return "border-red-500/30 text-red-300 bg-red-500/10"
      case "Intermediate":
        return "border-amber-500/30 text-amber-300 bg-amber-500/10"
      case "Beginner":
        return "border-emerald-500/30 text-emerald-300 bg-emerald-500/10"
      default:
        return "border-gray-500/30 text-gray-300 bg-gray-500/10"
    }
  }

  return (
    <div className="min-h-screen text-white font-sans relative overflow-hidden">
      {/* Animated background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-gray-950 to-violet-900/20" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent animate-pulse" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Welcome Section */}
        <section className="text-center space-y-6 mb-12">
          <div className="space-y-3">
            <h1 className="text-5xl md:text-6xl font-bold flex items-center justify-center gap-3 font-display text-white">
              {getGreeting()}, <span className="text-blue-400">Alex</span>
              <Sparkles className="w-8 h-8 text-emerald-400 animate-spin" style={{ animationDuration: "3s" }} />
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-sans">
              Ready to tackle some amazing <span className="text-emerald-400 font-semibold">WEB3</span> projects today?
            </p>
          </div>
        </section>

        {/* Motivational Quote */}
        <section className="flex justify-center mb-12">
          <div
            className={`bg-gradient-to-r from-blue-900/40 via-blue-800/20 to-violet-900/30 px-8 py-4 rounded-2xl shadow-xl flex items-center gap-3 transition-opacity duration-500 ${
              quoteFade ? "opacity-100" : "opacity-0"
            } backdrop-blur-md border border-gray-700/50`}
          >
            <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
            <span className="italic text-gray-300 text-lg font-medium font-sans">{motivationalQuotes[quoteIdx]}</span>
          </div>
        </section>

        {/* Main Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statsData.map((stat, index) => {
            const Icon = stat.icon
            const colorClasses = {
              emerald: "from-emerald-900/30 to-emerald-800/20 border-emerald-700/30 shadow-emerald-500/10",
              blue: "from-blue-900/30 to-blue-800/20 border-blue-700/30 shadow-blue-500/10",
              amber: "from-amber-900/30 to-amber-800/20 border-amber-700/30 shadow-amber-500/10",
              violet: "from-violet-900/30 to-violet-800/20 border-violet-700/30 shadow-violet-500/10",
            }
            const iconColors = {
              emerald: "bg-emerald-500/20 border-emerald-500/30 text-emerald-300",
              blue: "bg-blue-500/20 border-blue-500/30 text-blue-300",
              amber: "bg-amber-500/20 border-amber-500/30 text-amber-300",
              violet: "bg-violet-500/20 border-violet-500/30 text-violet-300",
            }
            const textColors = {
              emerald: "text-emerald-300",
              blue: "text-blue-300",
              amber: "text-amber-300",
              violet: "text-violet-300",
            }

            return (
              <Card
                key={index}
                className={`bg-gradient-to-br ${colorClasses[stat.color as keyof typeof colorClasses]} backdrop-blur-sm hover:shadow-lg hover:${colorClasses[stat.color as keyof typeof colorClasses].split(" ")[3]} transition-all duration-300 group`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p
                        className={`${textColors[stat.color as keyof typeof textColors]} text-sm font-semibold tracking-wide`}
                      >
                        {stat.label.toUpperCase()}
                      </p>
                      <p className="text-4xl font-bold text-white">{stat.value}</p>
                      <p className="text-white/70 text-xs">{stat.subtext}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <span className={`text-xs font-semibold ${textColors[stat.color as keyof typeof textColors]}`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className={`${iconColors[stat.color as keyof typeof iconColors]} p-4 rounded-xl border`}>
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </section>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {quickStats.map((stat, index) => (
            <Card key={index} className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                <p className="text-xs text-emerald-300 font-semibold">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Jobs for You Section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold flex items-center gap-3 text-white font-display">
                Recommended Jobs
                <TrendingUp className="w-7 h-7 text-emerald-400 animate-bounce" />
              </h2>
              <p className="text-gray-400 text-lg font-sans">
                Curated opportunities based on your skills and experience
              </p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 font-semibold">
              View All Jobs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobsData.slice(0, visibleJobs).map((job) => (
              <Card
                key={job.id}
                className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm hover:shadow-lg hover:shadow-gray-500/10 transition-all duration-300 hover:border-gray-600/50 group relative"
              >
                {job.urgent && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-red-500/20 text-red-300 border-red-500/30 border rounded-full text-xs font-semibold animate-pulse">
                      Urgent
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg text-white group-hover:text-blue-300 transition-colors duration-300 font-display">
                        {job.title}
                      </h3>
                      <Badge
                        variant="outline"
                        className={`text-xs font-semibold ${getDifficultyColor(job.difficulty)}`}
                      >
                        {job.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Building2 className="w-4 h-4" />
                      <p className="font-medium font-sans">{job.organization}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-emerald-300 font-display">{job.payment}</span>
                      <Badge
                        variant="outline"
                        className={
                          job.type === "Milestone"
                            ? "border-blue-500/30 text-blue-300 bg-blue-500/10"
                            : "border-violet-500/30 text-violet-300 bg-violet-500/10"
                        }
                      >
                        {job.type}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-gray-400 text-sm font-sans">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className="text-xs border-gray-600 text-gray-300 bg-gray-800/50 hover:border-blue-500/50 hover:text-blue-300 transition-all duration-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 font-semibold">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Load More Button */}
        {visibleJobs < jobsData.length && (
          <div className="flex justify-center mt-12">
            <Button
              onClick={handleLoadMore}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-blue-800/20 hover:border-blue-500/50 font-semibold px-8 py-3 rounded-xl bg-transparent font-sans shadow-md"
            >
              Load More Jobs
            </Button>
          </div>
        )}

        {/* Quick Actions */}
        <section className="mt-16">
          <Card className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6 font-display">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 font-semibold h-12">
                  <Users className="w-4 h-4 mr-2" />
                  Update Profile
                </Button>
                <Button className="bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200 font-semibold h-12">
                  <Award className="w-4 h-4 mr-2" />
                  View Achievements
                </Button>
                <Button className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-200 font-semibold h-12">
                  <Wallet className="w-4 h-4 mr-2" />
                  Manage Payments
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
