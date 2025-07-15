import React from "react";
import { NavbarDemo } from "@/components/layout/NavbarDemo";
import { Footer } from "@/components/layout/Footer";

export default function DocsPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Global Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(255,255,255)_1px,_transparent_0)] bg-[length:80px_80px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary-hover1/10" />
      </div>
      {/* Global Animated Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-primary/15 to-primary-hover1/15 blur-3xl animate-pulse" 
             style={{ animation: 'pulse 12s ease-in-out infinite' }}
        />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-gradient-to-br from-primary/15 to-primary-hover1/15 blur-3xl animate-pulse" 
             style={{ animation: 'pulse 15s ease-in-out infinite 3s' }}
        />
      </div>
      {/* Global Subtle Grid Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:120px_120px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_95%)] pointer-events-none z-0" />
      <div className="relative z-10">
        <NavbarDemo />
        <main className="max-w-3xl mx-auto px-4 py-24">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 text-center">DKarma Documentation</h1>
          <p className="text-lg text-slate-300 mb-12 text-center max-w-2xl mx-auto">
            Welcome to DKarma! This guide will help you connect your wallet and use the platform as a freelancer or a client.
          </p>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-primary mb-4">Connecting Your Wallet</h2>
            <ul className="list-disc pl-6 text-slate-200 space-y-2">
              <li>Click the <span className="font-semibold text-primary">Wallet Connect</span> button in the navigation bar or on the login/register page.</li>
              <li>Select your preferred wallet provider (e.g., MetaMask, WalletConnect).</li>
              <li>Approve the connection in your wallet app.</li>
              <li>Once connected, your wallet address will be linked to your DKarma account for secure authentication and transactions.</li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-primary mb-4">Using DKarma as a Freelancer</h2>
            <ul className="list-disc pl-6 text-slate-200 space-y-2">
              <li>Complete your profile and set your skills, rates, and availability.</li>
              <li>Browse available projects and submit proposals to clients.</li>
              <li>Manage your active contracts, deliver work, and communicate with clients.</li>
              <li>Receive payments securely via smart contracts and track your earnings.</li>
              <li>Participate in dispute resolution if needed, and build your reputation on the platform.</li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-primary mb-4">Using DKarma as a Client</h2>
            <ul className="list-disc pl-6 text-slate-200 space-y-2">
              <li>Post new projects or tasks with clear requirements and budgets.</li>
              <li>Review freelancer proposals and select the best fit for your needs.</li>
              <li>Manage contracts, approve milestones, and communicate with freelancers.</li>
              <li>Make secure payments through escrow smart contracts.</li>
              <li>Resolve disputes fairly and rate freelancers after completion.</li>
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-primary mb-4">Support & Community</h2>
            <ul className="list-disc pl-6 text-slate-200 space-y-2">
              <li>For help, visit our support page or join the DKarma community for tips and updates.</li>
              <li>Stay tuned for new features and improvements!</li>
            </ul>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
} 