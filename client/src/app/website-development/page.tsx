"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Star, Shield, Globe, CreditCard, Users, Code, Zap, CheckCircle, ArrowRight, Sparkles } from "lucide-react"

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
  },
  {
    id: 7,
    name: "Michael Brown",
    avatar: "/placeholder.svg?height=80&width=80",
    skills: ["React", "Chainlink", "GraphQL", "Node.js"],
    rating: 4.8,
    reviews: 89,
    hourlyRate: "$78/hr",
    verified: true,
  },
  {
    id: 8,
    name: "Anna Silva",
    avatar: "/placeholder.svg?height=80&width=80",
    skills: ["Svelte", "Arweave", "IPFS", "Tailwind"],
    rating: 4.7,
    reviews: 76,
    hourlyRate: "$72/hr",
    verified: true,
  },
]

export default function Web3ServicePage() {
  const [projectDescription, setProjectDescription] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 blur-3xl"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-8">
            {/* Tech Illustration */}
            <div className="relative mx-auto w-32 h-32 mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700 backdrop-blur-xl">
                <Code className="h-16 w-16 text-blue-400 mx-auto" />
              </div>
            </div>

            {/* Hero Text */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  Website Development
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Services
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Get modern, secure, and scalable websites built by verified Web3 developers.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Hire Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-500/50 text-blue-400 hover:bg-blue-500/10 bg-transparent px-8 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                Post a Job
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-purple-400 hover:bg-purple-500/10 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                Browse Freelancers
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Top Freelancers Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Top Freelancers
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Connect with our elite Web3 developers who deliver exceptional results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </div>
      </section>

      {/* Get Started Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Kickstart Your Web3 Project
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Let us help you connect with the right developer for your next big idea.
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
                      placeholder="Tell us about your Web3 project, requirements, timeline, and budget..."
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      className="bg-gray-900/50 border-2 border-gray-600/50 focus:border-blue-500/50 text-white placeholder-gray-500 min-h-[120px] rounded-2xl text-lg p-4 backdrop-blur-sm transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 py-6 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Connect with an Expert
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
              <p className="text-gray-400">Get matched with developers within 24 hours</p>
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
              <p className="text-gray-400">Protected payments and verified developers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
