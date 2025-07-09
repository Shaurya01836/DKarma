"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconCurrencyDollar,
  IconFocusCentered,
  IconMessage2Dollar,
  IconStatusChange,
  IconUserBolt,
  IconView360,
  IconBuilding,
  IconChecklist,
  IconCloudNetwork,
  IconContract,
  IconWallet,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { signOutUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUserType } from "@/context/UserTypeContext";

export function SidebarDemo({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();
  const { userType } = useUserType();

  // Common links for both user types
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
    {
      label: "Logout",
      href: "#logout",
      icon: (
        <IconArrowLeft className="h-6 w-6 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  // Profile link to be placed above Logout
  const profileLink = {
    label: "Profile",
    href: "/dashboard/profile",
    icon: (
      <IconUserBolt className="h-6 w-6 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  };

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
      label: "Logout",
      href: "#logout",
      icon: (
        <IconArrowLeft className="h-6 w-6 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  // Combine links based on user type
  const getLinks = () => {
    if (userType === 'freelancer') {
      // Insert profileLink just before Logout
      const base = [...commonLinks.slice(0, -1), ...freelancerLinks];
      base.push(profileLink);
      base.push(commonLinks[commonLinks.length - 1]);
      return base;
    } else if (userType === 'client') {
      // Only show My Tasks, Contracts, and Logout for client
      return minimalClientLinks;
    }
    // Default to freelancer links if user type is not set
    const base = [...commonLinks.slice(0, -1), ...freelancerLinks];
    base.push(profileLink);
    base.push(commonLinks[commonLinks.length - 1]);
    return base;
  };

  const links = getLinks();

  const CustomSidebarLink = ({ link, idx }: {
    link: {
      label: string;
      href: string;
      icon: React.ReactNode;
      hasDropdown?: boolean;
      onClick?: () => void;
    };
    idx: number
  }) => {
    if (link.label === "Logout") {
      return (
        <div key={idx} onClick={() => setShowLogoutModal(true)} className="cursor-pointer">
          <SidebarLink link={link} noLink />
        </div>
      );
    }
    return <SidebarLink key={idx} link={link} />;
  };

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden md:flex-row h-screen",
        "[&_.sidebar-custom]:border-r [&_.sidebar-custom]:border-[var(--color-border)]"
      )}
    >
      <div className="sidebar-custom scrollbar-hide">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10 scrollbar-hide">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              {open ? <Logo /> : <LogoIcon />}

              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <CustomSidebarLink key={idx} link={link} idx={idx} />
                ))}
              </div>
            </div>

            <div>
              <SidebarLink
                link={{
                  label: "Manu Arora",
                  href: "#",
                  icon: (
                    <Image
                      src="https://assets.aceternity.com/manu.png"
                      className="h-7 w-7 shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-neutral-900 rounded-lg p-6 shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4 text-center">Confirm Logout</h2>
            <p className="mb-6 text-center">Are you sure you want to log out?</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 rounded bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-800 transition"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
                onClick={async () => {
                  await signOutUser();
                  setShowLogoutModal(false);
                  router.push("/");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

// Extract the D logo box as a reusable component

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