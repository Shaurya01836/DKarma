import { CheckIcon } from "@heroicons/react/20/solid";

const tiers = [
	{
		name: "Hobby",
		id: "tier-hobby",
		href: "#",
		priceMonthly: "$29",
		description:
			"The perfect plan if you're just getting started with our product.",
		features: [
			"25 products",
			"Up to 10,000 subscribers",
			"Advanced analytics",
			"24-hour support response time",
		],
		featured: false,
	},
	{
		name: "Enterprise",
		id: "tier-enterprise",
		href: "#",
		priceMonthly: "$99",
		description: "Dedicated support and infrastructure for your company.",
		features: [
			"Unlimited products",
			"Unlimited subscribers",
			"Advanced analytics",
			"Dedicated support representative",
			"Marketing automations",
			"Custom integrations",
		],
		featured: true,
	},
];

function classNames(...classes: (string | undefined | null | false)[]) {
	return classes.filter(Boolean).join(" ");
}

export default function PricingTable() {
	return (
		<div className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
			<div className="mx-auto max-w-4xl text-center mb-6">
				<h2 className="font-display text-4xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-primary-hover to-primary inline-block tracking-tight">
					Pricing
				</h2>
				<div className="flex justify-center mt-2 mb-2">
					<span className="block w-16 h-1 rounded-full bg-gradient-to-r from-[var(--color-primary)] via-primary-hover to-primary opacity-70"></span>
				</div>
				<p className="text-2xl sm:text-4xl font-semibold text-[var(--color-foreground)] mt-2 font-display">
					Choose the right plan for you
				</p>
				<p className="mx-auto mt-4 max-w-xl text-base sm:text-lg font-normal tracking-tight text-[var(--color-muted)]">
					Choose an affordable plan that’s packed with the best features for
					engaging your audience, creating customer loyalty, and driving sales.
				</p>
			</div>
			<div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
				{tiers.map((tier, tierIdx) => (
					<div
						key={tier.id}
						className={classNames(
							tier.featured
								? "bg-[var(--color-surface)] shadow-2xl"
								: "bg-[var(--color-surface)] sm:mx-8 lg:mx-0",
							tier.featured
								? ""
								: tierIdx === 0
								? "rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl"
								: "sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none",
							"rounded-3xl p-8 ring-1 ring-[var(--color-border)] sm:p-10"
						)}
					>
						<h3
							id={tier.id}
							className={classNames(
								tier.featured
									? "text-[var(--color-primary-hover)]"
									: "text-[var(--color-primary)]",
								"text-base font-semibold"
							)}
						>
							{tier.name}
						</h3>
						<p className="mt-4 flex items-baseline gap-x-2">
							<span
								className={classNames(
									tier.featured
										? "text-white"
										: "text-[var(--color-foreground)]",
									"text-5xl font-semibold tracking-tight"
								)}
							>
								{tier.priceMonthly}
							</span>
							<span
								className={classNames(
									tier.featured
										? "text-[var(--color-muted)]"
										: "text-[var(--color-muted)]",
									"text-base"
								)}
							>
								/month
							</span>
						</p>
						<p
							className={classNames(
								tier.featured
									? "text-[var(--color-muted)]"
									: "text-[var(--color-muted)]",
								"mt-6 text-base"
							)}
						>
							{tier.description}
						</p>
						<ul
							role="list"
							className={classNames(
								tier.featured
									? "text-[var(--color-muted)]"
									: "text-[var(--color-muted)]",
								"mt-8 space-y-3 text-sm sm:mt-10"
							)}
						>
							{tier.features.map((feature) => (
								<li key={feature} className="flex gap-x-3">
									<CheckIcon
										aria-hidden="true"
										className={classNames(
											tier.featured
												? "text-[var(--color-primary-hover)]"
												: "text-[var(--color-primary)]",
											"h-6 w-5 flex-none"
										)}
									/>
									{feature}
								</li>
							))}
						</ul>
						<a
							href={tier.href}
							aria-describedby={tier.id}
							className={classNames(
								tier.featured
									? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] focus-visible:outline-[var(--color-primary)]"
									: "text-[var(--color-primary)] ring-1 ring-[var(--color-primary-hover)] hover:ring-[var(--color-primary)] focus-visible:outline-[var(--color-primary)]",
								"mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10"
							)}
						>
							Get started today
						</a>
					</div>
				))}
			</div>
		</div>
	);
}
