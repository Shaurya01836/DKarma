export function PricingTable() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "For new freelancers exploring the platform",
      features: [
        "1 active contract",
        "Basic reputation profile",
        "Standard support",
      ],
      highlight: false,
    },
    {
      name: "Pro",
      price: "$12/mo",
      description: "Best for active freelancers and small teams",
      features: [
        "Unlimited contracts",
        "Verified badge",
        "Escrow protection",
        "Priority support",
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored for agencies and businesses",
      features: [
        "Team management",
        "Custom SLAs",
        "Dedicated manager",
        "Full API access",
      ],
      highlight: false,
    },
  ];

  return (
    <section className="bg-[var(--color-background)] text-[var(--color-foreground)] py-28 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Flexible Pricing for Every Team
        </h2>
        <p className="text-muted mt-4 text-lg max-w-2xl mx-auto">
          Whether you're just starting out or managing an agency — we’ve got you covered.
        </p>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 shadow-xl transition-all duration-300 ${
                plan.highlight
                  ? "ring-4 ring-[var(--color-primary)] scale-105 z-10"
                  : "hover:scale-105"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-primary)] text-white px-4 py-1.5 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-[var(--color-muted)] text-base mb-6">
                {plan.description}
              </p>
              <div className="text-5xl font-extrabold text-[var(--color-foreground)] mb-8">
                {plan.price}
              </div>
              <ul className="space-y-4 text-base text-[var(--color-muted)] mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="h-2 w-2 bg-[var(--color-success)] rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-auto w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-lg font-semibold py-3 px-6 rounded-lg transition-all duration-200">
                {plan.price === "Free" ? "Get Started" : "Choose Plan"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
