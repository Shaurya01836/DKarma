"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Filter, ChevronDown, Star, Users, Briefcase, ExternalLink } from "lucide-react"

// Sample organization data
const organizations = [
	{
		id: 1,
		name: "Edu Chain",
		description: "Issue, attest and verify credentials",
		logo: "/placeholder.svg?height=60&width=60",
		rating: 4.8,
		activeTasks: 12,
		followers: "4.2k",
		tags: ["Web3", "Solidity", "Smart Contract"],
	},
	{
		id: 2,
		name: "DeFi Protocol",
		description: "Decentralized finance infrastructure",
		logo: "/placeholder.svg?height=60&width=60",
		rating: 4.9,
		activeTasks: 8,
		followers: "12.5k",
		tags: ["DeFi", "React", "TypeScript"],
	},
	{
		id: 3,
		name: "NFT Marketplace",
		description: "Digital art and collectibles platform",
		logo: "/placeholder.svg?height=60&width=60",
		rating: 4.7,
		activeTasks: 15,
		followers: "8.1k",
		tags: ["NFT", "Web3", "UI/UX"],
	},
	{
		id: 4,
		name: "DAO Governance",
		description: "Decentralized autonomous organization tools",
		logo: "/placeholder.svg?height=60&width=60",
		rating: 4.6,
		activeTasks: 6,
		followers: "3.8k",
		tags: ["DAO", "Governance", "Smart Contract"],
	},
	{
		id: 5,
		name: "Crypto Exchange",
		description: "Next-generation trading platform",
		logo: "/placeholder.svg?height=60&width=60",
		rating: 4.8,
		activeTasks: 20,
		followers: "15.2k",
		tags: ["Trading", "Backend", "Security"],
	},
	{
		id: 6,
		name: "Web3 Infrastructure",
		description: "Blockchain development tools and APIs",
		logo: "/placeholder.svg?height=60&width=60",
		rating: 4.9,
		activeTasks: 11,
		followers: "6.7k",
		tags: ["Infrastructure", "API", "DevTools"],
	},
	{
		id: 7,
		name: "Metaverse Studio",
		description: "Virtual world creation and experiences",
		logo: "/placeholder.svg?height=60&width=60",
		rating: 4.5,
		activeTasks: 9,
		followers: "5.3k",
		tags: ["Metaverse", "3D", "Unity"],
	},
	{
		id: 8,
		name: "Layer 2 Solutions",
		description: "Scaling solutions for Ethereum",
		logo: "/placeholder.svg?height=60&width=60",
		rating: 4.7,
		activeTasks: 14,
		followers: "9.1k",
		tags: ["Layer2", "Ethereum", "Scaling"],
	},
]

const categories = ["All", "DeFi", "DAOs", "NFT", "Infra", "Trading"]
const sortOptions = ["Most Active", "Top Rated", "Newest", "Most Followers"]

export default function ExploreOrganizations() {
	const [activeCategory, setActiveCategory] = useState("All")
	const [sortBy, setSortBy] = useState("Most Active")
	const [followed, setFollowed] = useState<number[]>([])
	const [search, setSearch] = useState("")

	const handleFollow = (id: number) => {
		setFollowed((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
	}

	const filteredOrgs = organizations.filter((org) =>
		(activeCategory === "All" || org.tags.some((tag) => tag.toLowerCase().includes(activeCategory.toLowerCase()))) &&
		(org.name.toLowerCase().includes(search.toLowerCase()) || org.description.toLowerCase().includes(search.toLowerCase()))
	)

	return (
		<div className="min-h-screen bg-gradient-to-br from-[var(--color-background)] via-[var(--color-surface)] to-[var(--color-background)] text-[var(--color-foreground)] font-sans">
			{/* Header Section */}
			<div className="bg-[var(--color-surface)]/95 backdrop-blur-xl border-b border-[var(--color-border)] shadow-lg">
				<div className="max-w-7xl mx-auto px-6 py-8">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-foreground)] mb-2 font-display">Explore By Organizations</h1>
							<p className="text-lg text-[var(--color-muted)]">Discover opportunities from leading Web3 companies</p>
						</div>
						<div className="flex gap-2">
							<input
								type="text"
								placeholder="Search organizations..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="px-4 py-2 rounded-xl bg-[var(--color-background)]/60 border border-[var(--color-border)] text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-success)] transition-all"
							/>
							<Button
								variant="outline"
								className="bg-transparent border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-success)]/10 hover:text-[var(--color-success)] transition-colors"
							>
								<Filter className="w-4 h-4 mr-2" />
								Filter
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Category Filter and Sort */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
					{/* Category Chips */}
					<div className="flex flex-wrap gap-2">
						{categories.map((category) => (
							<button
								key={category}
								onClick={() => setActiveCategory(category)}
								className={`px-4 py-2 rounded-full text-sm font-medium transition-colors font-sans ${
									activeCategory === category
										? "bg-[var(--color-success)] text-[var(--color-surface)] shadow-md"
										: "bg-[var(--color-surface)]/70 text-[var(--color-muted)] hover:bg-[var(--color-success)]/10 hover:text-[var(--color-success)]"
								}`}
							>
								{category}
							</button>
						))}
					</div>

					{/* Sort Dropdown */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								className="bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-success)]/10 hover:text-[var(--color-success)]"
							>
								Sort by: {sortBy}
								<ChevronDown className="w-4 h-4 ml-2" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="bg-[var(--color-surface)] border-[var(--color-border)]">
							{sortOptions.map((option) => (
								<DropdownMenuItem
									key={option}
									onClick={() => setSortBy(option)}
									className="text-[var(--color-foreground)] hover:bg-[var(--color-success)]/10 hover:text-[var(--color-success)] focus:bg-[var(--color-success)]/10 focus:text-[var(--color-success)]"
								>
									{option}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* Organization Cards Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
					{filteredOrgs.map((org, index) => (
						<div
							key={org.id}
							className="pt-4 bg-[var(--color-surface)]/90 border border-[var(--color-border)] hover:border-[var(--color-success)]/70 hover:bg-[var(--color-success)]/10 transition-all duration-300 hover:scale-[1.035] hover:shadow-2xl backdrop-blur-lg relative overflow-hidden group rounded-2xl shadow-lg flex flex-col justify-between min-h-[320px]"
							style={{ animationDelay: `${index * 100}ms` }}
						>
							{/* Top-right tilted arrow icon */}
							<ExternalLink
								className="absolute top-4 right-4 w-6 h-6 text-[var(--color-success)] opacity-80 cursor-pointer transition-transform transition-colors duration-200 hover:scale-125 hover:text-[var(--color-success)]/90 z-20"
								aria-label="Open organization"
							/>
							<div className="flex flex-col items-center gap-4 mb-4 pt-2">
								<div className="w-16 h-16 rounded-full flex items-center justify-center bg-[var(--color-success)]/80 text-white text-3xl font-extrabold shadow-md mb-2 select-none">
									{org.name.charAt(0)}
								</div>
								<h3 className="text-xl font-bold text-[var(--color-foreground)] mb-1 truncate font-display group-hover:text-[var(--color-success)] transition-colors duration-300 text-center">
									{org.name}
								</h3>
								<p className="text-[var(--color-muted)] text-sm line-clamp-2 font-sans text-center mb-2 px-2">{org.description}</p>
							</div>

							{/* Tags */}
							<div className="flex flex-wrap gap-2 justify-center mb-4">
								{org.tags.map((tag) => (
									<Badge key={tag} variant="secondary" className="bg-[var(--color-background)]/70 text-[var(--color-success)] border-[var(--color-success)]/30 text-xs font-bold px-3 py-1 rounded-full">
										{tag}
									</Badge>
								))}
							</div>

							{/* Stats */}
							<div className="flex items-center justify-center gap-6 text-sm text-[var(--color-muted)] mb-6">
								<div className="flex items-center gap-1">
									<Star className="w-4 h-4 fill-[var(--color-success)] text-[var(--color-success)]" />
									<span className="font-bold text-[var(--color-success)]">{org.rating}</span>
								</div>
								<div className="flex items-center gap-1">
									<Briefcase className="w-4 h-4" />
									<span>{org.activeTasks} active tasks</span>
								</div>
								<div className="flex items-center gap-1">
									<Users className="w-4 h-4" />
									<span>{org.followers} followers</span>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Load More Button */}
				<div className="text-center">
					<Button
						variant="outline"
						size="lg"
						className="border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-success)]/10 font-bold px-8 py-3 rounded-xl bg-transparent font-sans shadow-md w-full sm:w-auto"
					>
						Load More Organizations
					</Button>
				</div>
			</div>
		</div>
	)
}
