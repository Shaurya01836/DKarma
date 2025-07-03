import { Footer } from "@/components/layout/Footer";
import { GlareCardDemo } from "@/components/layout/GlareCardDemo";
import { HeroSection } from "@/components/layout/HeroSection";
import { NavbarDemo } from "@/components/layout/NavbarDemo";
import PricingTable from "@/components/layout/PricingTable";
import { WobbleCardDemo } from "@/components/layout/WobbleCardDemo";
import React from "react";
import { AnimatedPinDemo } from "@/components/layout/AnimatedPinDemo";
import BentoGridSecondDemo from "@/components/layout/BentoGridSecondDemo";
import { AnimatedBeamDemo } from "@/components/layout/AnimatedBeamDemo";

function page() {
  return (
    <div className="bg-background text-foreground ">
      <NavbarDemo />
      <HeroSection />
      <GlareCardDemo />
      <AnimatedPinDemo />
      <WobbleCardDemo />
      <BentoGridSecondDemo />
      <AnimatedBeamDemo />
      <PricingTable />

      <Footer />
    </div>
  );
}

export default page;
