import { BentoGridSecondDemo } from "@/components/layout/BentoGridSecondDemo";
import { GlareCardDemo } from "@/components/layout/GlareCardDemo";
import { HeroSection } from "@/components/layout/HeroSection";
import { NavbarDemo } from "@/components/layout/NavbarDemo";
import PricingCards from "@/components/layout/PricingCards";
import { WobbleCardDemo } from "@/components/layout/WobbleCardDemo";
import { Stick } from "next/font/google";

import React from "react";

function page() {
  return (
    <div className="bg-background text-foreground ">
      <NavbarDemo />
      <HeroSection />
      <GlareCardDemo />
      <WobbleCardDemo />
      <BentoGridSecondDemo />
      {/*  <PricingCards /> */}
    </div>
  );
}

export default page;
