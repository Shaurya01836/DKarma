"use client"
import { useState, useEffect } from "react"
import { TrendingUp, Wallet, Award, ArrowRight, Clock, MapPin, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useUser } from "@/hooks/useUser"
import { useAuth } from "@/context/AuthContext"

const jobsData = [
  {
    id: 1,
    title: "Smart Contract Development",
    organization: "DeFi Protocol Labs",
    payment: "₹45,000",
    type: "Milestone",
    duration: "2-3 weeks",
    location: "Remote",
    tags: ["Solidity", "Web3", "Smart Contracts"],
    urgent: true,
  },
  {
    id: 2,
    title: "React Frontend for NFT Marketplace",
    organization: "CryptoArt Studio",
    payment: "₹32,000",
    type: "Single Task",
    duration: "1-2 weeks",
    location: "Remote",
    tags: ["React", "TypeScript", "Web3"],
    urgent: false,
  },
  {
    id: 3,
    title: "DApp Integration & Testing",
    organization: "Blockchain Ventures",
    payment: "₹28,500",
    type: "Milestone",
    duration: "3-4 weeks",
    location: "Hybrid",
    tags: ["JavaScript", "Testing", "DApp"],
    urgent: false,
  },
  {
    id: 4,
    title: "Token Economics Design",
    organization: "GameFi Protocol",
    payment: "₹55,000",
    type: "Single Task",
    duration: "1 week",
    location: "Remote",
    tags: ["Economics", "Tokenomics", "Research"],
    urgent: true,
  },
  {
    id: 5,
    title: "Cross-chain Bridge Development",
    organization: "Multi-Chain Labs",
    payment: "₹67,000",
    type: "Milestone",
    duration: "4-5 weeks",
    location: "Remote",
    tags: ["Solidity", "Bridge", "Multi-chain"],
    urgent: false,
  },
  {
    id: 6,
    title: "Web3 Wallet Integration",
    organization: "Wallet Connect Inc",
    payment: "₹22,000",
    type: "Single Task",
    duration: "1 week",
    location: "Remote",
    tags: ["React", "Wallet", "Integration"],
    urgent: false,
  },
]

const statsData = [
  {
    label: "Active Tasks",
    value: "12",
    subtext: "In Progress",
    icon: TrendingUp,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Total Earnings",
    value: "₹28,500",
    subtext: "This Month",
    icon: Wallet,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    label: "Dkarma Score",
    value: "4.5",
    subtext: "Out of 5.0",
    icon: Award,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
]

const motivationalQuotes = [
  "Opportunities don't happen. You create them.",
  "Success is not for the lazy.",
  "Web3 is the future. Be a part of it!",
  "Every contract is a step closer to your dream.",
  "Stay curious, stay building!",
]

export default function FreelancerDashboard() {
  const { user } = useAuth();
  const { profile, loading } = useUser()
  console.log("🔥 profile", profile)

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

  // Get user's display name
  const getUserDisplayName = () => {
    if (loading) return "Loading...";
if (profile?.displayName) return profile.displayName;
if (profile?.walletAddress) return `${profile.walletAddress.slice(0, 6)}...${profile.walletAddress.slice(-4)}`;
    if (user?.displayName) return user.displayName;
    return "User";
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] relative overflow-x-hidden font-sans">
      {/* Animated background sparkles */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-20 animate-pulse bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[var(--color-primary)] via-transparent to-transparent" />
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-[color:var(--color-surface)/0.8] backdrop-blur-2xl shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4">

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-14 space-y-16 relative z-10">
        {/* Welcome Section */}
        <section className="text-center space-y-6">
          <div className="space-y-3">
            <h1 className="text-5xl md:text-6xl font-bold flex items-center justify-center gap-2 drop-shadow-lg font-display text-[var(--color-foreground)]">
              {getGreeting()}, <span className="text-[var(--color-primary)]">{getUserDisplayName()}</span>
              <Sparkles className="w-7 h-7 text-[var(--color-success)] animate-spin-slow" />
            </h1>
            <p className="text-xl text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed font-sans">
              Ready to tackle some amazing <span className="text-[var(--color-success)] font-semibold">WEB3</span> projects today?
            </p>
          </div>
        </section>

        {/* Motivational Quote */}
        <section className="flex justify-center">
          <div className={`bg-gradient-to-r from-[var(--color-primary-hover)]/40 via-[var(--color-primary)]/20 to-[var(--color-secondary)]/30 px-8 py-4 rounded-2xl shadow-xl flex items-center gap-3 transition-opacity duration-500 ${quoteFade ? 'opacity-100' : 'opacity-0'} backdrop-blur-md border border-[var(--color-border)]`}>
            <Sparkles className="w-5 h-5 text-[var(--color-primary)] animate-pulse" />
            <span className="italic text-[var(--color-foreground)]/80 text-lg font-medium font-sans">{motivationalQuotes[quoteIdx]}</span>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {statsData.map((stat, index) => (
            <Card
              key={index}
              className="bg-[var(--color-surface)]/90 border-[var(--color-border)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-primary)]/10 transition-all duration-500 hover:scale-[1.04] backdrop-blur-lg shadow-xl group cursor-pointer rounded-3xl"
            >
              <CardContent className="p-8">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <p className="text-[var(--color-muted)] text-sm font-medium uppercase tracking-wider group-hover:text-[var(--color-primary)] transition-colors font-sans">{stat.label}</p>
                    <p className="text-4xl font-bold text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors drop-shadow-md font-display">{stat.value}</p>
                    <p className="text-[var(--color-muted)] text-sm font-sans">{stat.subtext}</p>
                  </div>
                  <div className={`p-4 rounded-2xl ${stat.bgColor} ${stat.color} shadow-md group-hover:scale-110 transition-transform bg-[var(--color-surface)]/80`}>
                    <stat.icon className="w-7 h-7" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Jobs for You Section */}
        <section className="space-y-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold flex items-center gap-2 text-[var(--color-foreground)] font-display">
                Jobs for you <TrendingUp className="w-6 h-6 text-[var(--color-success)] animate-bounce" />
              </h2>
              <p className="text-[var(--color-muted)] text-lg font-sans">Curated opportunities based on your skills</p>
            </div>
            <Button
              variant="outline"
              className="border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/40 transition-all duration-300 rounded-2xl bg-transparent px-6 py-3 text-base font-medium shadow-lg font-sans"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {jobsData.slice(0, visibleJobs).map((job) => (
              <Card
                key={job.id}
                className="bg-[var(--color-surface)]/90 border-[var(--color-border)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-primary)]/10 transition-all duration-500 hover:scale-[1.03] cursor-pointer group backdrop-blur-lg relative overflow-hidden shadow-xl rounded-3xl"
              >
                {job.urgent && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-[var(--color-error)]/20 text-[var(--color-error)] border-[var(--color-error)]/30 border rounded-full text-xs font-medium animate-pulse">
                      Urgent
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-bold text-xl text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors duration-300 leading-tight font-display">
                      {job.title}
                    </h3>
                    <p className="text-[var(--color-muted)] font-medium font-sans">{job.organization}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-[var(--color-primary)] font-display">{job.payment}</span>
                      <Badge
                        variant="secondary"
                        className={
                          job.type === "Milestone"
                            ? "bg-[var(--color-primary)]/20 text-[var(--color-primary)] border-[var(--color-primary)]/30 border rounded-full px-3 py-1 text-sm font-medium font-sans"
                            : "bg-[var(--color-secondary)]/20 text-[var(--color-secondary)] border-[var(--color-secondary)]/30 border rounded-full px-3 py-1 text-sm font-medium font-sans"
                        }
                      >
                        {job.type}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-[var(--color-muted)] text-sm font-sans">
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
                        className="text-xs border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-300 rounded-full px-3 py-1 font-medium font-sans"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Load More Button */}
        {visibleJobs < jobsData.length && (
          <div className="flex justify-center">
            <Button
              onClick={handleLoadMore}
              className="bg-[var(--color-success)] hover:bg-[var(--color-primary-hover)] transition-all duration-300 rounded-2xl px-8 py-4 text-lg font-bold shadow-xl tracking-wide text-[var(--color-surface)] font-display"
            >
              More
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
