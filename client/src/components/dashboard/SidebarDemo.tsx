"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import {

  IconBrandTabler,
  IconCurrencyDollar,
  IconFocusCentered,
  IconMessage2Dollar,
  IconStatusChange,
  IconView360,
  IconBuilding,
  IconChecklist,
  IconCloudNetwork,
  IconContract,
  IconWallet,
  IconBasketBolt,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useUserType } from "@/context/UserTypeContext";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { SidebarLink } from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function ProfileSidebarButton({ profile, router }: { profile: { displayName?: string; photoURL?: string; email?: string } | null, router: ReturnType<typeof useRouter> }) {
  const { open } = useSidebar();
  const initials =
    profile?.displayName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <button
      onClick={() => router.push("/dashboard/profile")}
      className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl transition-all duration-200 hover:bg-primary/10 mt-auto mb-4 ${
        open ? "justify-start" : "justify-center"
      }`}
      title="Profile"
    >
      <Avatar className="h-10 w-10 border-2 border-white/20 shadow">
        {profile?.photoURL ? (
          <AvatarImage src={profile.photoURL} alt={profile.displayName || "User"} />
        ) : (
          <AvatarFallback>{initials}</AvatarFallback>
        )}
      </Avatar>
      {open && (
        <div className="flex flex-col items-start min-w-0">
          <span className="font-semibold text-white truncate max-w-[120px]">
            {profile?.displayName || "User"}
          </span>
          {profile?.email && (
            <span className="text-xs text-muted-foreground truncate max-w-[120px]">
              {profile.email}
            </span>
          )}
        </div>
      )}
    </button>
  );
}

// Restore Logo and LogoIcon components
const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Dkarma
      </motion.span>
    </Link>
  );
};

const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </Link>
  );
};

function SidebarLogoSwitcher() {
  const { open } = useSidebar();
  return open ? <Logo /> : <LogoIcon />;
}

export function SidebarDemo({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { userType } = useUserType();
  const { profile } = useUser();

  // Common links for both user types (without Profile and Logout)
  const commonLinks = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="h-6 w-6 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Payments",
      href: "/dashboard/payment",
      icon: (
        <IconCurrencyDollar className="h-6 w-6 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Message & Chats",
      href: "/dashboard/chats",
      icon: (
        <IconMessage2Dollar className="h-6 w-6 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  // Freelancer-specific links
  const freelancerLinks = [
    {
      label: "By Organization",
      href: "/dashboard/explore/by-organization",
      icon: (
        <IconBuilding className="h-6 w-6 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "By Tasks",
      href: "/dashboard/explore/by-tasks",
      icon: (
        <IconChecklist className="h-6 w-6 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Task Overview",
      href: "/dashboard/task-overview",
      icon: (
        <IconView360 className="h-6 w-6 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Dispute Center",
      href: "/dashboard/dispute",
      icon: (
        <IconFocusCentered className="h-6 w-6 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Proposal Status",
      href: "/dashboard/proposal",
      icon: (
        <IconStatusChange className="h-6 w-6 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  // Client-specific links (for minimal client sidebar)
  const minimalClientLinks = [
    {
      label: "My Tasks",
      href: "/dashboard/myTasks",
      icon: (
        <IconCloudNetwork className="h-6 w-6 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Contracts",
      href: "/dashboard/contracts",
      icon: (
        <IconContract className="h-6 w-6 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Wallet $ Funds",
      href: "/dashboard/walletNFunds",
      icon: (
        <IconWallet className="h-6 w-6 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Dispute Center",
      href: "/dashboard/dispute",
      icon: (
        <IconBasketBolt className="h-6 w-6 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  // Combine links based on user type
  const getLinks = () => {
    if (userType === 'freelancer') {
      // Only sidebar links, no profile or logout
      return [...commonLinks, ...freelancerLinks];
    } else if (userType === 'client') {
      // Only show My Tasks, Contracts, etc. for client
      return minimalClientLinks;
    }
    // Default to freelancer links if user type is not set
    return [...commonLinks, ...freelancerLinks];
  };

  const links = getLinks();

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden md:flex-row h-screen",
        "[&_.sidebar-custom]:border-r [&_.sidebar-custom]:border-white/10 dark:[&_.sidebar-custom]:border-white/10"
      )}
    >
      <div className="sidebar-custom scrollbar-hide">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10 scrollbar-hide border-r border-white/10 dark:border-white/10 bg-background">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              <SidebarLogoSwitcher />
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink link={link} key={idx} />
                ))}
              </div>
            </div>
            {/* Profile Icon at the bottom */}
            <ProfileSidebarButton profile={profile} router={router} />
          </SidebarBody>
        </Sidebar>
      </div>
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}