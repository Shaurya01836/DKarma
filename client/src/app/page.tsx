import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/layout/HeroSection";
import { NavbarDemo } from "@/components/layout/NavbarDemo";
import PricingTable from "@/components/layout/PricingTable";
import React from "react";
import { AnimatedPinDemo } from "@/components/layout/AnimatedPinDemo";
import { GlareCardDemo } from "@/components/layout/GlareCardDemo";
import AnimatedBeamDemo from "@/components/layout/AnimatedBeamDemo";

function page() {
  return (
    <div className="relative min-h-screen">
      {/* Global Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(255,255,255)_1px,_transparent_0)] bg-[length:80px_80px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary-hover1/10" />
      </div>

      {/* Global Animated Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-primary/15 to-primary-hover1/15 blur-3xl animate-pulse" 
             style={{
               animation: 'pulse 12s ease-in-out infinite',
             }}
        />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-gradient-to-br from-primary/15 to-primary-hover1/15 blur-3xl animate-pulse" 
             style={{
               animation: 'pulse 15s ease-in-out infinite 3s',
             }}
        />
      </div>

      {/* Global Subtle Grid Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:120px_120px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_95%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        <NavbarDemo />
        <HeroSection />
        <GlareCardDemo />
        <AnimatedPinDemo />
        <AnimatedBeamDemo />
        <div id="pricing-table-section">
          <PricingTable />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default page;
