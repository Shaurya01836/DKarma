import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/layout/HeroSection";
import { NavbarDemo } from "@/components/layout/NavbarDemo";
import PricingTable from "@/components/layout/PricingTable";
import React from "react";
import BentoGridSecondDemo from "@/components/layout/BentoGridSecondDemo";

function page() {
  return (
    <div>
      <NavbarDemo />
      <HeroSection />
      <BentoGridSecondDemo />

      <PricingTable />
      <Footer />
    </div>
  );
}

export default page;
