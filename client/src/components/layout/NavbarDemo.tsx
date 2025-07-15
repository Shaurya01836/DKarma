"use client";
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function NavbarDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Docs",
      link: "/docs",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleNavClick = (link: string) => {
    if (link === "#pricing") {
      // Scroll to PricingTable if on homepage
      const pricingSection = document.getElementById("pricing-table-section");
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: "smooth" });
        return;
      }
      // If not on homepage, go to homepage and scroll after navigation
      router.push("/");
      setTimeout(() => {
        const pricingSection = document.getElementById("pricing-table-section");
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    } else if (link.startsWith("#")) {
      window.location.hash = link;
    } else {
      router.push(link);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-[100]">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <div className="hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-sans text-muted transition duration-200 hover:text-primary pointer-events-auto lg:flex lg:space-x-2">
            {navItems.map((item, idx) => (
              <button
                key={`link-${idx}`}
                onClick={() => handleNavClick(item.link)}
                className="relative px-4 py-2 text-muted hover:text-primary pointer-events-auto bg-transparent border-none outline-none cursor-pointer"
                style={{ background: "none" }}
              >
                <span className="relative z-20">{item.name}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <NavbarButton
              as="button"
              variant="secondary"
              onClick={() => router.push("/auth/login")}
            >
              Login
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          {isMobileMenuOpen && (
            <div className="absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-surface text-foreground px-4 py-8 shadow-md">
              {navItems.map((item, idx) => (
                <button
                  key={`mobile-link-${idx}`}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleNavClick(item.link);
                  }}
                  className="relative text-neutral-600 dark:text-neutral-300 bg-transparent border-none outline-none cursor-pointer"
                  style={{ background: "none" }}
                >
                  <span className="block">{item.name}</span>
                </button>
              ))}
              <div className="flex w-full flex-col gap-4">
                <NavbarButton
                  as="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push("/auth/login");
                  }}
                  variant="primary"
                  className="w-full"
                >
                  Login
                </NavbarButton>
              </div>
            </div>
          )}
        </MobileNav>
      </Navbar>
    </div>
  );
}
