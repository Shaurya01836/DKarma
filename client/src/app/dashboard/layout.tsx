"use client";
import { SidebarDemo } from "@/components/dashboard/SidebarDemo";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useUserType } from "@/context/UserTypeContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function TopBar() {
  const noop = () => { };
  return (
    <header className=" top-0 z-50 bg-[color:var(--color-surface)/0.8] backdrop-blur-2xl shadow-2xl">
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
  const { userType, userTypeLoaded } = useUserType();
  const router = useRouter();

  useEffect(() => {
    if (userTypeLoaded && !userType) {
      router.replace("/auth/choose-role");
    }
  }, [userType, userTypeLoaded, router]);

  if (!userTypeLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  if (!userType) {
    return null; // or a spinner, but redirect will happen
  }

  return (
    <div className="dashboard-root relative min-h-screen">
      {/* Global Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(255,255,255)_1px,_transparent_0)] bg-[length:80px_80px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary-hover1/10" />
      </div>
      {/* Global Animated Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-primary/15 to-primary-hover1/15 blur-3xl animate-pulse"
             style={{ animation: 'pulse 12s ease-in-out infinite' }}
        />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-gradient-to-br from-primary/15 to-primary-hover1/15 blur-3xl animate-pulse"
             style={{ animation: 'pulse 15s ease-in-out infinite 3s' }}
        />
      </div>
      {/* Global Subtle Grid Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:120px_120px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_95%)] pointer-events-none z-0" />
      <SidebarDemo>
        <div className="main-content relative z-10">
          <TopBar />
          {children}
        </div>
      </SidebarDemo>
    </div>
  );
}
