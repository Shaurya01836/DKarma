import { BentoGridSecondDemo } from "@/components/layout/BentoGridSecondDemo";
import { Footer } from "@/components/layout/Footer";
import { GlareCardDemo } from "@/components/layout/GlareCardDemo";
import { HeroSection } from "@/components/layout/HeroSection";
import { NavbarDemo } from "@/components/layout/NavbarDemo";
import { PricingTable } from "@/components/layout/PricingTable";
import { WobbleCardDemo } from "@/components/layout/WobbleCardDemo";
import { Stick } from "next/font/google";
import ScrollVelocity from "../components/ui/ScrollVelocity";
import { LinkPreview } from "@/components/ui/link-preview";

import React from "react";

function page() {
  return (
    <div className="bg-background text-foreground ">
      <NavbarDemo />
      <HeroSection />
      <GlareCardDemo />
      <WobbleCardDemo />

      <ScrollVelocity
        velocity={100}
        texts={[
          <LinkPreview key="1" url="https://react.dev">
            React Docs
          </LinkPreview>,
          <LinkPreview key="2" url="https://scrollvelocity.vercel.app">
            Scroll Velocity
          </LinkPreview>,
        ]}
      />
      <BentoGridSecondDemo />
      <PricingTable />
      {/*  <PricingCards /> */}
      <Footer />
    </div>
  );
}

export default page;
