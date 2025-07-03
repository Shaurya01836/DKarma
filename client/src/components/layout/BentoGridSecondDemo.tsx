import React from "react";

function BentoGridSecondDemo() {
  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base/7 font-semibold text-primary">
          Empowering Freelancers with Web3
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
          Redefining Trust, Ownership & Work in the Decentralized Era
        </p>

        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {/* DID */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-surface lg:rounded-l-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-foreground max-lg:text-center">
                  Decentralized Identity
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-foreground max-lg:text-center">
                  Manage your Web3 profile, portfolio, and credentials using
                  secure, self-sovereign identities (DIDs).
                </p>
              </div>
              <div className="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                  <img
                    alt="Decentralized Identity"
                    src="/assets/did-profile.png"
                    className="size-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 lg:rounded-l-4xl" />
          </div>

          {/* Trustless Escrow */}
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-surface max-lg:rounded-t-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-foreground max-lg:text-center">
                  Trustless Escrow
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-muted max-lg:text-center">
                  Funds are securely locked in smart contracts and auto-released
                  on milestone delivery—no middleman needed.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                <img
                  alt="Escrow Illustration"
                  src="/assets/escrow-contract.png"
                  className="w-full max-lg:max-w-xs"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl" />
          </div>

          {/* Reputation */}
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-surface" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-foreground max-lg:text-center">
                  On-chain Reputation
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-muted max-lg:text-center">
                  Build a transparent, verifiable reputation based on completed
                  work, ratings, and community endorsements.
                </p>
              </div>
              <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                <img
                  alt="Reputation System"
                  src="/assets/reputation-score.png"
                  className="h-[min(152px,40cqw)] object-cover"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5" />
          </div>

          {/* Smart Contract APIs */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-surface max-lg:rounded-b-4xl lg:rounded-r-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-foreground max-lg:text-center">
                  Open Smart Contract APIs
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Seamlessly integrate escrow logic, payments, and profiles
                  using modular smart contract APIs.
                </p>
              </div>
              <div className="relative min-h-120 w-full grow">
                <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl outline outline-white/10">
                  <div className="flex bg-gray-900 outline outline-white/5">
                    <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                      <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                        escrow.sol
                      </div>
                      <div className="border-r border-gray-600/10 px-4 py-2">
                        freelancerRegistry.sol
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pt-6 pb-14 text-xs text-gray-300 font-mono">
                    {/* Add a snippet of a Solidity contract or pseudocode here */}
                    <pre>
                      {`function releasePayment() public {
  require(workApproved, "Approval needed");
  payable(freelancer).transfer(escrowAmount);
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BentoGridSecondDemo;
