import { BentoGridSecondDemo } from "@/components/layout/BentoGridSecondDemo";
import { Footer } from "@/components/layout/Footer";
import { GlareCardDemo } from "@/components/layout/GlareCardDemo";
import { HeroSection } from "@/components/layout/HeroSection";
import { NavbarDemo } from "@/components/layout/NavbarDemo";
import { PricingTable } from "@/components/layout/PricingTable";
import { WobbleCardDemo } from "@/components/layout/WobbleCardDemo";
import { Stick } from "next/font/google";
import ScrollVelocity from "../components/ui/ScrollVelocity";

import React from "react";
import { AnimatedPinDemo } from "@/components/layout/AnimatedPinDemo";

function page() {
  return (
    <div className="bg-background text-foreground ">
      <NavbarDemo />
      <HeroSection />
      <GlareCardDemo />
      <AnimatedPinDemo />
      <WobbleCardDemo />

      <ScrollVelocity
        velocity={100}
        texts={["React Docs ", "  Scroll Velocity"]}
      />
      <BentoGridSecondDemo />
      <PricingTable />
      {/*  <PricingCards /> */}
      <Footer />
    </div>
  );
}

export default page;
