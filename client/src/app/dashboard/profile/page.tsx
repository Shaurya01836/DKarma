"use client"

import { useState } from "react"
import {
  User,
  Github,
  Linkedin,
  Globe,
  Trash2,
  Plus,
  X,
  Star,
  ExternalLink,
  Eye,
  EyeOff,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Award,
  Briefcase,
  Settings,
  Shield,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const workingDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export default function FreelancerProfile() {
  const [isAvailable, setIsAvailable] = useState(true)
  const [selectedSkills, setSelectedSkills] = useState(["React", "Web3", "Solidity", "TypeScript"])
  const [selectedDays, setSelectedDays] = useState(["Mon", "Tue", "Wed", "Thu", "Fri"])
  const [showPassword, setShowPassword] = useState(false)
  const [enable2FA, setEnable2FA] = useState(false)

  const [projects] = useState([
    {
      id: 1,
      title: "DeFi Lending Protocol",
      description: "Built comprehensive lending protocol with smart contracts",
      tags: ["Solidity", "React", "Web3"],
      link: "github.com/example/defi",
    },
    {
      id: 2,
      title: "NFT Marketplace",
      description: "Full-stack NFT marketplace with minting capabilities",
      tags: ["Next.js", "TypeScript", "IPFS"],
      link: "nft-marketplace.com",
    },
  ])

  const [workHistory] = useState([
    {
      id: 1,
      title: "Smart Contract Audit",
      organization: "DeFi Labs",
      payment: "₹45,000",
      rating: 5,
      date: "Dec 2023",
    },
    {
      id: 2,
      title: "Frontend Development",
      organization: "CryptoStart",
      payment: "₹32,000",
      rating: 5,
      date: "Nov 2023",
    },
  ])

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const toggleDay = (day: string) => {
    setSelectedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Sticky Save Button */}
      {/* <div className="fixed top-6 right-6 z-50 pr-6 pt-4">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-2xl rounded-xl px-6 py-3">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div> */}

      {/* Hero Profile Section */}
      <div className="relative bg-gradient-to-br from-[#111111] to-[#0a0a0a] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center space-y-8">
            {/* Profile Avatar & Status */}
            <div className="relative inline-block">
              <Avatar className="w-32 h-32 border-4 border-white/20 shadow-2xl">
                <AvatarImage src="/placeholder.svg?height=128&width=128" />
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-4xl">
                  NJ
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2">
              </div>
            </div>

            {/* Name & Title */}
            <div className="space-y-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Nitin Jain
              </h1>
              <div className="flex items-center justify-center gap-2">
                <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30 px-4 py-2 text-lg">
                  Web3 Developer
                </Badge>
                <Badge
                  className={`px-4 py-2 text-lg ${isAvailable ? "bg-green-600/20 text-green-400 border-green-500/30" : "bg-gray-600/20 text-gray-400 border-gray-500/30"}`}
                >
                  {isAvailable ? "Available" : "Busy"}
                </Badge>
              </div>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Experienced Web3 developer specializing in smart contracts, DeFi protocols, and full-stack dApp
                development
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-emerald-400">₹2.8L</div>
                <div className="text-gray-400">Total Earned</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-blue-400">47</div>
                <div className="text-gray-400">Projects Done</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-yellow-400 flex items-center gap-1">
                  4.9 <Star className="w-6 h-6 fill-yellow-400" />
                </div>
                <div className="text-gray-400">Average Rating</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-purple-400">₹1.2K</div>
                <div className="text-gray-400">Hourly Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white/5 border border-white/10 rounded-2xl p-1 mb-8">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-white data-[state=active]:text-black rounded-xl"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="work"
              className="data-[state=active]:bg-white data-[state=active]:text-black rounded-xl"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Work
            </TabsTrigger>
            <TabsTrigger
              value="portfolio"
              className="data-[state=active]:bg-white data-[state=active]:text-black rounded-xl"
            >
              <Award className="w-4 h-4 mr-2" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger
              value="payment"
              className="data-[state=active]:bg-white data-[state=active]:text-black rounded-xl"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Payment
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-white data-[state=active]:text-black rounded-xl"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Full Name</label>
                      <Input
                        defaultValue="Nitin Jain"
                        className="bg-white/5 border-white/20 text-white focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Username</label>
                      <Input
                        defaultValue="@nitindev"
                        className="bg-white/5 border-white/20 text-white focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </label>
                      <Input
                        type="email"
                        defaultValue="nitin@example.com"
                        className="bg-white/5 border-white/20 text-white focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone
                      </label>
                      <Input
                        defaultValue="+91 9876543210"
                        className="bg-white/5 border-white/20 text-white focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Location
                      </label>
                      <Input
                        defaultValue="Bangalore, India"
                        className="bg-white/5 border-white/20 text-white focus:border-blue-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Details */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Professional Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Bio</label>
                    <Textarea
                      placeholder="Tell us about yourself..."
                      defaultValue="Experienced Web3 developer with 5+ years in blockchain technology."
                      className="bg-white/5 border-white/20 text-white focus:border-blue-500 min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Skills</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkills.map((skill) => (
                        <Badge
                          key={skill}
                          className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                          onClick={() => toggleSkill(skill)}
                        >
                          {skill}
                          <X className="w-3 h-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Experience</label>
                      <select className="w-full p-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm">
                        <option value="5-10">5-10 years</option>
                        <option value="2-5">2-5 years</option>
                        <option value="1-2">1-2 years</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Domain</label>
                      <select className="w-full p-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm">
                        <option value="web3">Web3 & Blockchain</option>
                        <option value="frontend">Frontend Development</option>
                        <option value="fullstack">Full Stack Development</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Availability */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Availability & Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Available for Work</span>
                      <Switch
                        checked={isAvailable}
                        onCheckedChange={setIsAvailable}
                        className="data-[state=checked]:bg-green-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Hourly Rate</label>
                      <div className="relative">
                        <Input
                          defaultValue="1200"
                          className="bg-white/5 border-white/20 text-white focus:border-blue-500 pl-8"
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-300 mb-3 block">Working Days</label>
                    <div className="flex flex-wrap gap-2">
                      {workingDays.map((day) => (
                        <Badge
                          key={day}
                          variant={selectedDays.includes(day) ? "default" : "outline"}
                          className={`cursor-pointer ${
                            selectedDays.includes(day)
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "border-white/20 text-gray-300 hover:bg-white/10"
                          }`}
                          onClick={() => toggleDay(day)}
                        >
                          {day}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Work Tab */}
          <TabsContent value="work" className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-white">Work History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workHistory.map((job) => (
                    <div key={job.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                          <p className="text-gray-400">{job.organization}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-semibold">{job.payment}</div>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < job.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                              />
                            ))}
                          </div>
                          <div className="text-gray-500 text-sm">{job.date}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl text-white">Portfolio Projects</CardTitle>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-gray-300 mb-3 text-sm">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-blue-400 text-sm">{project.link}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Payment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">UPI ID / Bank Account</label>
                    <Input
                      placeholder="Enter UPI ID"
                      className="bg-white/5 border-white/20 text-white focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Withdrawal Preference</label>
                    <select className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white">
                      <option value="monthly">Monthly</option>
                      <option value="weekly">Weekly</option>
                      <option value="on-demand">On Demand</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Social Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      GitHub
                    </label>
                    <Input
                      placeholder="github.com/username"
                      className="bg-white/5 border-white/20 text-white focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </label>
                    <Input
                      placeholder="linkedin.com/in/username"
                      className="bg-white/5 border-white/20 text-white focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Website
                    </label>
                    <Input
                      placeholder="yourwebsite.com"
                      className="bg-white/5 border-white/20 text-white focus:border-blue-500"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Change Password</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        className="bg-white/5 border-white/20 text-white focus:border-blue-500 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-white">Two-Factor Authentication</h3>
                      <p className="text-gray-400 text-sm">Extra security for your account</p>
                    </div>
                    <Switch
                      checked={enable2FA}
                      onCheckedChange={setEnable2FA}
                      className="data-[state=checked]:bg-green-600"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-900/10 border-red-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-red-400 flex items-center gap-2">
                    <Trash2 className="w-5 h-5" />
                    Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-400 text-sm">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="destructive" className="bg-red-600 hover:bg-red-700 w-full">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
