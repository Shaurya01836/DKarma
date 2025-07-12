import { CheckIcon } from "@heroicons/react/20/solid";

const plans = [
  {
    name: "Free",
    id: "plan-free",
    price: "$0",
    period: "/yearly",
    description: "For Individuals",
    features: [
      "Browse Projects",
      "Submit Proposals",
      "Basic Smart Contract Payments",
      "Community Support",
    ],
    featured: false,
    button: "Get Started",
    border: "border-primary/20",
    badge: "bg-primary/10 text-primary",
    buttonColor: "bg-primary text-white hover:bg-primary-hover1",
    iconColor: "text-primary",
  },
  {
    name: "Enterprise",
    id: "plan-enterprise",
    price: "$149",
    period: "/yearly",
    description: "For Large Teams & Corporates",
    features: [
      "Up to 30 Team Members",
      "Dedicated Account Manager",
      "Custom Integrations",
      "Advanced Analytics",
      "24/7 Support",
    ],
    featured: true,
    button: "Contact Sales",
    border: "border-purple-500/20",
    badge: "bg-purple-500/10 text-purple-300",
    buttonColor: "bg-gradient-to-r from-primary to-purple-500 text-white hover:from-primary hover:to-purple-400 shadow-lg",
    iconColor: "text-purple-400",
  },
];

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function PricingTable() {
  return (
    <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8 bg-black min-h-screen">
      <div className="mx-auto max-w-4xl text-center mb-6">
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500 inline-block tracking-tight">
          Power up your freelance journey
        </h2>
        <div className="flex justify-center mt-2 mb-2">
          <span className="block w-16 h-1 rounded-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-70"></span>
        </div>
        <p className="text-lg font-semibold text-slate-300 mt-2 font-display">
          Get access to more. Tune up your next project.
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-y-8 sm:grid-cols-2 gap-x-8 justify-center ">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={classNames(
              "rounded-3xl p-8 flex flex-col items-center border backdrop-blur-sm bg-black/80 transition-all duration-300",
              plan.border,
              plan.featured
                ? "shadow-2xl scale-105 border-2 border-purple-500/40 z-10"
                : "shadow-lg border-cyan-500/20",
            )}
          >
            <div className="mb-2 w-full flex justify-between items-center">
              <span className={classNames(
                "text-xs font-semibold px-3 py-1 rounded-full",
                plan.badge
              )}>
                {plan.name}
              </span>
            
            </div>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-4xl font-bold text-white">{plan.price}</span>
              <span className="text-base text-slate-400">{plan.period}</span>
            </div>
            <div className="text-slate-400 text-sm mb-4 mt-1">{plan.description}</div>
            <ul className="mt-4 mb-6 space-y-3 w-full">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-slate-200">
                  <CheckIcon className={classNames("h-5 w-5", plan.iconColor)} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className={classNames(
                "w-full py-2 rounded-lg font-semibold text-base transition-all",
                plan.buttonColor
              )}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
