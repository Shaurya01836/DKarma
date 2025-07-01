import { HeroSection } from "@/components/layout/HeroSection";
import { NavbarDemo } from "@/components/layout/NavbarDemo";

import React from "react";

function page() {
  return (
    <div className="bg-background text-foreground ">
      <NavbarDemo />
      <HeroSection />
    </div>
  );
}

export default page;
