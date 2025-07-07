"use client";
import { SidebarDemo } from "@/components/dashboard/SidebarDemo";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

function TopBar() {
  const noop = () => { };
  return (
    <header className=" top-0 z-50 bg-[color:var(--color-surface)/0.8] backdrop-blur-2xl border-b border-[var(--color-border)] shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <div className="flex-1 max-w-lg relative">
          <PlaceholdersAndVanishInput
            placeholders={[
              "Find freelance gigs...",
              "Search by domain or org...",
              "Secure your contracts...",
              "Track payments live...",
              "Search tasks or clients...",
            ]}
            onChange={noop}
            onSubmit={noop}
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-12 w-12 bg-[var(--color-surface)] hover:bg-surface border border-[var(--color-border)] rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <Bell className="w-5 h-5 text-[var(--color-muted)]" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--color-error)] rounded-full animate-pulse"></div>
        </Button>
      </div>
    </header>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-root">
      <SidebarDemo>
        <div className="main-content">
          <TopBar />
          {children}
        </div>
      </SidebarDemo>
    </div>
  );
}
