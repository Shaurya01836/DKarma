"use client"

import { useState } from "react"
import { notFound, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Star,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Code,
  Video,
  Cpu,
  BarChart2,
  BookOpen,
  Home,
  Search,
  Users,
  TrendingUp,
  Award,
  Clock,
} from "lucide-react"

const serviceConfig = {
  "website-development": {
    title: "Website Development",
    subtitle: "Get modern, secure, and scalable websites built by verified Web3 developers.",
    icon: <Code className="h-16 w-16 text-blue-400 mx-auto" />,
    gradient: "from-blue-500 to-purple-500",
    heroBg: "from-blue-600/10 via-purple-600/10 to-cyan-600/10",
    color: "blue",
  },
  "video-editing": {
    title: "Video Editing",
    subtitle: "Professional video editing services for all your needs.",
    icon: <Video className="h-16 w-16 text-purple-400 mx-auto" />,
    gradient: "from-purple-500 to-pink-500",
    heroBg: "from-purple-600/10 via-pink-600/10 to-blue-600/10",
    color: "purple",
  },
  "software-development": {
    title: "Software Development",
    subtitle: "Custom software solutions tailored to your business.",
    icon: <Cpu className="h-16 w-16 text-cyan-400 mx-auto" />,
    gradient: "from-cyan-500 to-blue-500",
    heroBg: "from-cyan-600/10 via-blue-600/10 to-purple-600/10",
    color: "cyan",
  },
  seo: {
    title: "SEO",
    subtitle: "Boost your website's visibility with expert SEO services.",
    icon: <BarChart2 className="h-16 w-16 text-green-400 mx-auto" />,
    gradient: "from-green-500 to-blue-500",
    heroBg: "from-green-600/10 via-blue-600/10 to-purple-600/10",
    color: "green",
  },
  "architecture-interior-design": {
    title: "Architecture & Interior Design",
    subtitle: "Innovative architecture and interior design solutions.",
    icon: <Home className="h-16 w-16 text-pink-400 mx-auto" />,
    gradient: "from-pink-500 to-purple-500",
    heroBg: "from-pink-600/10 via-purple-600/10 to-blue-600/10",
    color: "pink",
  },
  "book-design": {
    title: "Book Design",
    subtitle: "Creative and professional book design services.",
    icon: <BookOpen className="h-16 w-16 text-yellow-400 mx-auto" />,
    gradient: "from-yellow-500 to-blue-500",
    heroBg: "from-yellow-600/10 via-blue-600/10 to-purple-600/10",
    color: "yellow",
  },
} as const

type ServiceSlug = keyof typeof serviceConfig

const freelancers = [
  {
    id: 1,
    name: "Alex Chen",
    avatar: "/placeholder.svg?height=80&width=80",
    skills: ["React", "Solidity", "Web3.js", "TypeScript"],
    rating: 4.9,
    reviews: 127,
    hourlyRate: "$85/hr",
    verified: true,
    completedProjects: 45,
    responseTime: "2 hours",
  },
  {
    id: 2,
    name: "Sarah Kim",
    avatar: "/placeholder.svg?height=80&width=80",
    skills: ["Next.js", "Ethers.js", "IPFS", "Tailwind"],
    rating: 4.8,
    reviews: 94,
    hourlyRate: "$75/hr",
    verified: true,
    completedProjects: 32,
    responseTime: "1 hour",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    avatar: "/placeholder.svg?height=80&width=80",
    skills: ["TypeScript", "Hardhat", "DeFi", "React"],
    rating: 5.0,
    reviews: 156,
    hourlyRate: "$95/hr",
    verified: true,
    completedProjects: 67,
    responseTime: "30 mins",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    avatar: "/placeholder.svg?height=80&width=80",
    skills: ["Vue.js", "Smart Contracts", "NFT", "Web3.js"],
    rating: 4.7,
    reviews: 83,
    hourlyRate: "$70/hr",
    verified: true,
    completedProjects: 28,
    responseTime: "3 hours",
  },
  {
    id: 5,
    name: "David Park",
    avatar: "/placeholder.svg?height=80&width=80",
    skills: ["React", "Polygon", "DApps", "Solidity"],
    rating: 4.9,
    reviews: 112,
    hourlyRate: "$80/hr",
    verified: true,
    completedProjects: 41,
    responseTime: "1 hour",
  },
  {
    id: 6,
    name: "Lisa Wang",
    avatar: "/placeholder.svg?height=80&width=80",
    skills: ["Angular", "Web3.js", "Metamask", "CSS"],
    rating: 4.6,
    reviews: 67,
    hourlyRate: "$65/hr",
    verified: true,
    completedProjects: 23,
    responseTime: "4 hours",
  },
]

export default function ServicePage() {
  const params = useParams()
  const service = params["service"] as ServiceSlug | undefined
  const data = service ? serviceConfig[service] : undefined
  const [projectDescription, setProjectDescription] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterExperience, setFilterExperience] = useState("all")
  const [activeTab, setActiveTab] = useState("freelancers")

  if (!data) return notFound()

  const tabs = [
    {
      id: "freelancers",
      label: "Top Freelancers",
      icon: Users,
      description: "Browse Experts",
      count: freelancers.length,
      color: data.color,
    },
    {
      id: "projects",
      label: "Recent Projects",
      icon: TrendingUp,
      description: "Success Stories",
      count: 24,
      color: data.color,
    },
    {
      id: "reviews",
      label: "Client Reviews",
      icon: Award,
      description: "Testimonials",
      count: 156,
      color: data.color,
    },
  ]

  const getTabColorClasses = (color: string, isActive: boolean) => {
    const colors = {
      blue: isActive
        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25"
        : "text-gray-300 hover:text-white hover:bg-blue-800/20",
      purple: isActive
        ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/25"
        : "text-gray-300 hover:text-white hover:bg-purple-800/20",
      cyan: isActive
        ? "bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25"
        : "text-gray-300 hover:text-white hover:bg-cyan-800/20",
      green: isActive
        ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-500/25"
        : "text-gray-300 hover:text-white hover:bg-green-800/20",
      pink: isActive
        ? "bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-lg shadow-pink-500/25"
        : "text-gray-300 hover:text-white hover:bg-pink-800/20",
      yellow: isActive
        ? "bg-gradient-to-r from-yellow-600 to-yellow-500 text-white shadow-lg shadow-yellow-500/25"
        : "text-gray-300 hover:text-white hover:bg-yellow-800/20",
    }
    return colors[color as keyof typeof colors]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-[var(--color-foreground)] font-sans">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-[var(--color-foreground)] font-display mb-1">{data.title}</h1>
            <p className="text-[var(--color-muted)] text-lg font-sans">{data.subtitle}</p>
          </div>
          <div className="flex gap-3">
            <Button
              className={`bg-gradient-to-r ${data.gradient} hover:shadow-lg transition-all duration-200 font-semibold`}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Hire Now
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800/50 bg-transparent">
              Post a Job
            </Button>
          </div>
        </div>

        {/* Banner */}
        <div className="mb-10 w-full max-w-6xl mx-auto rounded-3xl bg-gradient-to-r from-blue-900/60 via-gray-900/90 to-purple-900/60 p-10 flex flex-col md:flex-row items-center gap-8 shadow-2xl border border-gray-800">
          <div className="flex-shrink-0 flex items-center justify-center w-32 h-32 rounded-2xl bg-gray-900/80 border border-gray-800 mr-0 md:mr-8 mb-6 md:mb-0">
            {data.icon}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Welcome to the {data.title} Service Center</h2>
            <p className="text-[var(--color-muted)] text-lg">Find top talent, post your project, and get started with confidence. Our platform ensures quality, security, and fast results for your {data.title.toLowerCase()} needs.</p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search freelancers by name, skills, or expertise..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-gray-800/50 border-gray-600 focus:border-blue-500 text-white placeholder:text-gray-400 text-base"
                  />
                </div>
              </div>
              <Select value={filterExperience} onValueChange={setFilterExperience}>
                <SelectTrigger className="w-full md:w-52 h-12 bg-gray-800/50 border-gray-600 text-white">
                  <SelectValue placeholder="Filter by experience" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Tab Navigation */}
        <div className="mb-8">
          <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-2 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-3 px-4 py-4 rounded-xl font-semibold transition-all duration-300 group ${getTabColorClasses(tab.color, isActive)}`}
                  >
                    <div
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        isActive ? "bg-white/20" : "bg-gray-700/50 group-hover:bg-gray-600/50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{tab.label}</span>
                        {tab.count > 0 && (
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${isActive ? "bg-white/20" : "bg-gray-700/50"}`}
                          >
                            {tab.count}
                          </span>
                        )}
                      </div>
                      <div
                        className={`text-xs transition-all duration-300 ${
                          isActive ? "text-white/80" : "text-gray-400 group-hover:text-gray-300"
                        }`}
                      >
                        {tab.description}
                      </div>
                    </div>
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/5 to-white/10 animate-pulse" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-500">
          {activeTab === "freelancers" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {freelancers.map((freelancer) => (
                <Card
                  key={freelancer.id}
                  className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-blue-500/10 rounded-2xl overflow-hidden"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="relative mx-auto mb-4">
                      <Avatar className="w-20 h-20 ring-2 ring-blue-500/30 group-hover:ring-blue-400/60 transition-all duration-300">
                        <AvatarImage src={freelancer.avatar || "/placeholder.svg"} alt={freelancer.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                          {freelancer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {freelancer.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-white text-lg font-semibold">{freelancer.name}</CardTitle>
                    <div className="flex items-center justify-center gap-1 text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-white font-medium">{freelancer.rating}</span>
                      <span className="text-gray-400 text-sm">({freelancer.reviews})</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-0">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {freelancer.skills.slice(0, 3).map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs px-2 py-1 rounded-lg"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {freelancer.skills.length > 3 && (
                        <Badge
                          variant="secondary"
                          className="bg-gray-600/20 text-gray-400 border border-gray-600/30 text-xs px-2 py-1 rounded-lg"
                        >
                          +{freelancer.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="text-center space-y-3">
                      <p className="text-2xl font-bold text-green-400">{freelancer.hourlyRate}</p>
                      <Button className="w-full bg-gradient-to-r from-blue-500/80 to-purple-500/80 hover:from-blue-500 hover:to-purple-500 text-white border-0 rounded-xl transition-all duration-300">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "projects" && (
            <div className="text-center py-20">
              <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-12">
                <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Recent Projects</h3>
                <p className="text-gray-400">Project showcase coming soon...</p>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="text-center py-20">
              <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-12">
                <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Client Reviews</h3>
                <p className="text-gray-400">Client testimonials coming soon...</p>
              </div>
            </div>
          )}
        </div>

        {/* Get Started Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className={`bg-gradient-to-r ${data.gradient} bg-clip-text text-transparent`}>
                  Start Your Project Today
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Connect with top-rated freelancers and bring your vision to life.
              </p>
            </div>
            <Card className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden">
              <CardContent className="p-8 lg:p-12">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label htmlFor="project-description" className="block text-lg font-medium text-gray-300">
                      Describe your project...
                    </label>
                    <div className="relative">
                      <Textarea
                        id="project-description"
                        placeholder="Tell us about your project requirements, timeline, and budget..."
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        className="bg-gray-900/50 border-2 border-gray-600/50 focus:border-blue-500/50 text-white placeholder-gray-500 min-h-[120px] rounded-2xl text-lg p-4 backdrop-blur-sm transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/10"
                      />
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className={`w-full bg-gradient-to-r ${data.gradient} hover:shadow-lg hover:shadow-blue-500/25 text-white border-0 py-6 text-lg font-semibold rounded-2xl transition-all duration-300`}
                  >
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Get Started Now
                  </Button>
                </div>
              </CardContent>
            </Card>
            {/* Trust Indicators */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 mb-4 backdrop-blur-sm">
                  <Zap className="h-8 w-8 text-blue-400 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Fast Matching</h3>
                <p className="text-gray-400">Get matched with experts within 24 hours</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 mb-4 backdrop-blur-sm">
                  <Shield className="h-8 w-8 text-purple-400 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Quality Assured</h3>
                <p className="text-gray-400">100% satisfaction guarantee on all projects</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-2xl p-6 mb-4 backdrop-blur-sm">
                  <CheckCircle className="h-8 w-8 text-green-400 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Secure Process</h3>
                <p className="text-gray-400">Protected payments and verified freelancers</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
