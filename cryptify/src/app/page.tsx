import { BentoGridSecondDemo } from "@/components/layout/BentoGridSecondDemo";
import { CardHoverEffectDemo } from "@/components/layout/CardHoverEffectDemo";
import { HeroSection } from "@/components/layout/HeroSection";
import { NavbarDemo } from "@/components/layout/NavbarDemo";
import PricingCards from "@/components/layout/PricingCards";
import { StickyScrollRevealDemo } from "@/components/layout/StickyScrollRevealDemo";
import { Stick } from "next/font/google";

import React from "react";

function page() {
  return (
    <div className="bg-background text-foreground ">
      <NavbarDemo />
      <HeroSection />
      <CardHoverEffectDemo />
      <StickyScrollRevealDemo />
      <BentoGridSecondDemo />
      <PricingCards />
    </div>
  );
}

export default page;
