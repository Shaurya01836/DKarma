"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ChevronDown,
  Star,
  Users,
  Briefcase,
  ExternalLink,
  Search,
  ImageIcon,
  Server,
  Building2,
  TrendingUp,
  Award,
  Globe,
} from "lucide-react"

// Sample organization data
const organizations = [
  {
    id: 1,
    name: "Edu Chain",
    description: "Issue, attest and verify credentials on blockchain",
    logo: "/placeholder.svg?height=60&width=60",
    rating: 4.8,
    activeTasks: 12,
    followers: "4.2k",
    tags: ["Web3", "Solidity", "Smart Contract"],
    category: "Infrastructure",
    founded: "2022",
    totalProjects: 45,
  },
  {
    id: 2,
    name: "DeFi Protocol",
    description: "Decentralized finance infrastructure and lending solutions",
    logo: "/placeholder.svg?height=60&width=60",
    rating: 4.9,
    activeTasks: 8,
    followers: "12.5k",
    tags: ["DeFi", "React", "TypeScript"],
    category: "DeFi",
    founded: "2021",
    totalProjects: 78,
  },
  {
    id: 3,
    name: "NFT Marketplace",
    description: "Digital art and collectibles platform with advanced features",
    logo: "/placeholder.svg?height=60&width=60",
    rating: 4.7,
    activeTasks: 15,
    followers: "8.1k",
    tags: ["NFT", "Web3", "UI/UX"],
    category: "NFT",
    founded: "2021",
    totalProjects: 32,
  },
  {
    id: 4,
    name: "DAO Governance",
    description: "Decentralized autonomous organization tools and voting systems",
    logo: "/placeholder.svg?height=60&width=60",
    rating: 4.6,
    activeTasks: 6,
    followers: "3.8k",
    tags: ["DAO", "Governance", "Smart Contract"],
    category: "DAO",
    founded: "2022",
    totalProjects: 23,
  },
  {
    id: 5,
    name: "Crypto Exchange",
    description: "Next-generation trading platform with advanced security",
    logo: "/placeholder.svg?height=60&width=60",
    rating: 4.8,
    activeTasks: 20,
    followers: "15.2k",
    tags: ["Trading", "Backend", "Security"],
    category: "Trading",
    founded: "2020",
    totalProjects: 89,
  },
  {
    id: 6,
    name: "Web3 Infrastructure",
    description: "Blockchain development tools and APIs for developers",
    logo: "/placeholder.svg?height=60&width=60",
    rating: 4.9,
    activeTasks: 11,
    followers: "6.7k",
    tags: ["Infrastructure", "API", "DevTools"],
    category: "Infrastructure",
    founded: "2021",
    totalProjects: 56,
  },
  {
    id: 7,
    name: "Metaverse Studio",
    description: "Virtual world creation and immersive experiences",
    logo: "/placeholder.svg?height=60&width=60",
    rating: 4.5,
    activeTasks: 9,
    followers: "5.3k",
    tags: ["Metaverse", "3D", "Unity"],
    category: "Metaverse",
    founded: "2022",
    totalProjects: 18,
  },
  {
    id: 8,
    name: "Layer 2 Solutions",
    description: "Scaling solutions for Ethereum and other blockchains",
    logo: "/placeholder.svg?height=60&width=60",
    rating: 4.7,
    activeTasks: 14,
    followers: "9.1k",
    tags: ["Layer2", "Ethereum", "Scaling"],
    category: "Infrastructure",
    founded: "2021",
    totalProjects: 41,
  },
]

const categories = [
  { name: "All", icon: Search },
  { name: "DeFi", icon: Star },
  { name: "DAO", icon: Users },
  { name: "NFT", icon: ImageIcon },
  { name: "Infrastructure", icon: Server },
  { name: "Trading", icon: Briefcase },
]

const sortOptions = ["Most Active", "Top Rated", "Newest", "Most Followers"]

const mockStats = {
  totalOrganizations: 156,
  activeOrganizations: 89,
  averageRating: 4.7,
  totalProjects: 1247,
}

function getCategoryCount(category: string) {
  if (category === "All") return organizations.length
  return organizations.filter((org) => org.category === category).length
}

export default function ExploreOrganizations() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [sortBy, setSortBy] = useState("Most Active")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOrgs = organizations.filter((org) => {
    const matchesCategory = activeCategory === "All" || org.category === activeCategory
    const matchesSearch =
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const getTabColorClasses = (isActive: boolean) => {
    return isActive
      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25"
      : "text-gray-300 hover:text-white hover:bg-blue-800/20"
  }

  return (
    <div className="min-h-screen text-[var(--color-foreground)] font-sans">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-[var(--color-foreground)] font-display mb-1">Explore Organizations</h1>
            <p className="text-[var(--color-muted)] text-lg font-sans">
              Discover opportunities from leading Web3 companies and projects
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 font-semibold">
              <Building2 className="w-4 h-4 mr-2" />
              Register Organization
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-700/30 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-blue-300 text-sm font-semibold tracking-wide">TOTAL ORGANIZATIONS</p>
                  <p className="text-4xl font-bold text-white">{mockStats.totalOrganizations}</p>
                  <p className="text-blue-200/70 text-xs">Registered companies</p>
                </div>
                <div className="bg-blue-500/20 p-4 rounded-xl border border-blue-500/30">
                  <Building2 className="w-7 h-7 text-blue-300" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border-emerald-700/30 backdrop-blur-sm hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-emerald-300 text-sm font-semibold tracking-wide">ACTIVE ORGANIZATIONS</p>
                  <p className="text-4xl font-bold text-white">{mockStats.activeOrganizations}</p>
                  <p className="text-emerald-200/70 text-xs">Currently hiring</p>
                </div>
                <div className="bg-emerald-500/20 p-4 rounded-xl border border-emerald-500/30">
                  <TrendingUp className="w-7 h-7 text-emerald-300" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 border-amber-700/30 backdrop-blur-sm hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-amber-300 text-sm font-semibold tracking-wide">AVERAGE RATING</p>
                  <p className="text-4xl font-bold text-white">{mockStats.averageRating}</p>
                  <p className="text-amber-200/70 text-xs">Community rating</p>
                </div>
                <div className="bg-amber-500/20 p-4 rounded-xl border border-amber-500/30">
                  <Award className="w-7 h-7 text-amber-300" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-violet-900/30 to-violet-800/20 border-violet-700/30 backdrop-blur-sm hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-violet-300 text-sm font-semibold tracking-wide">TOTAL PROJECTS</p>
                  <p className="text-4xl font-bold text-white">{mockStats.totalProjects}</p>
                  <p className="text-violet-200/70 text-xs">Completed projects</p>
                </div>
                <div className="bg-violet-500/20 p-4 rounded-xl border border-violet-500/30">
                  <Globe className="w-7 h-7 text-violet-300" />
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
                    placeholder="Search organizations, descriptions, or technologies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-gray-800/50 border-gray-600 focus:border-emerald-500 text-white placeholder:text-gray-400 text-base"
                  />
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full md:w-52 h-12 bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50"
                  >
                    Sort by: {sortBy}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 border-gray-600">
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option}
                      onClick={() => setSortBy(option)}
                      className="text-white hover:bg-gray-700 focus:bg-gray-700"
                    >
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Tab Navigation */}
        <div className="mb-8">
          <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-2 shadow-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {categories.map((category) => {
                const Icon = category.icon
                const isActive = activeCategory === category.name
                const count = getCategoryCount(category.name)
                return (
                  <button
                    key={category.name}
                    onClick={() => setActiveCategory(category.name)}
                    className={`relative flex items-center gap-3 px-4 py-4 rounded-xl font-semibold transition-all duration-300 group ${getTabColorClasses(isActive)}`}
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
                        <span className="text-sm font-bold">{category.name}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${isActive ? "bg-white/20" : "bg-gray-700/50"}`}
                        >
                          {count}
                        </span>
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

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400 font-sans">
            Showing <span className="text-white font-semibold">{filteredOrgs.length}</span> organizations
            {searchQuery && (
              <>
                {' '}for <span className="text-blue-300 font-semibold">&quot;{searchQuery}&quot;</span>
              </>
            )}
          </p>
        </div>

        {/* Organization Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredOrgs.map((org, index) => (
            <Card
              key={org.id}
              className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm hover:shadow-lg hover:shadow-gray-500/10 transition-all duration-300 hover:border-gray-600/50 group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ExternalLink className="absolute top-4 right-4 w-5 h-5 text-gray-400 group-hover:text-blue-300 transition-colors duration-200 z-10" />
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  {/* Logo/Avatar */}
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-500 text-white text-2xl font-bold shadow-lg mb-4">
                    {org.name.charAt(0)}
                  </div>

                  {/* Organization Info */}
                  <h3 className="text-xl font-bold text-white mb-2 font-display group-hover:text-blue-300 transition-colors duration-300">
                    {org.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 font-sans line-clamp-2">{org.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {org.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-gray-600 text-gray-300 bg-gray-800/50 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex w-full text-sm text-gray-400 mb-4 items-center justify-between px-4">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-white">{org.rating}</span>
                      </div>
                      <span className="text-xs">Rating</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-1 mb-1">
                        <Briefcase className="w-4 h-4" />
                        <span className="font-bold text-white">{org.activeTasks}</span>
                      </div>
                      <span className="text-xs">Active</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-1 mb-1">
                        <Users className="w-4 h-4" />
                        <span className="font-bold text-white">{org.followers}</span>
                      </div>
                      <span className="text-xs">Followers</span>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="flex justify-between w-full text-xs text-gray-500 mb-4">
                    <span>Founded {org.founded}</span>
                    <span>{org.totalProjects} projects</span>
                  </div>

                  {/* Action Button */}
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 font-semibold">
                    View Organization
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {filteredOrgs.length > 0 && (
          <div className="text-center">
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-blue-800/20 hover:border-blue-500/50 font-semibold px-8 py-3 rounded-xl bg-transparent font-sans shadow-md"
            >
              Load More Organizations
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredOrgs.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-900/40 border-gray-700/50 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
              <Building2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 font-display">No organizations found</h3>
              <p className="text-gray-400 font-sans">
                Try adjusting your search criteria or category filters to find more organizations.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
