"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconCurrencyDollar,
  IconFocusCentered,
  IconMapSearch,
  IconMessage2Dollar,
  IconScoreboard,
  IconSettings,
  IconStatusChange,
  IconUserBolt,
  IconView360,
  IconBuilding, // Added for By Organization
  IconChecklist, // Added for By Tasks
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SidebarDemo({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [exploreDropdownOpen, setExploreDropdownOpen] = useState<number | null>(
    null
  );

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Explore Work",
      href: "/dashboard/explore",
      icon: (
        <IconMapSearch className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      hasDropdown: true,
    },
    {
      label: "Task Overview",
      href: "/dashboard/task-overview",
      icon: (
        <IconView360 className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Dispute Center",
      href: "/dashboard/dispute",
      icon: (
        <IconFocusCentered className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Proposal Status",
      href: "/dashboard/proposal",
      icon: (
        <IconStatusChange className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Payments",
      href: "/dashboard/payment",
      icon: (
        <IconCurrencyDollar className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Message & Chats",
      href: "/dashboard/chats",
      icon: (
        <IconMessage2Dollar className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Dkarma Scores",
      href: "/dashboard/dscore",
      icon: (
        <IconScoreboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "/logout",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  const CustomSidebarLink = ({ link, idx }: { link: any; idx: number }) => {
    if (link.hasDropdown && link.label === "Explore Work") {
      return (
        <motion.div
          className="relative"
          onMouseEnter={() => setExploreDropdownOpen(idx)}
          onMouseLeave={() => setExploreDropdownOpen(null)}
          layout // Enable layout animation for smooth push-down
        >
          <SidebarLink link={link} />
          {/* Animated sub-links below Explore Work */}
          <AnimatePresence initial={false}>
            {exploreDropdownOpen === idx && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex flex-col gap-2 mt-2 ml-6"
                layout // Animate height/layout for smooth sidebar movement
              >
                <SidebarLink
                  link={{
                    label: "By Organization",
                    href: "/dashboard/explore/by-organization",
                    icon: (
                      <IconBuilding className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                    ),
                  }}
                  className="pl-7"
                />
                <SidebarLink
                  link={{
                    label: "By Tasks",
                    href: "/dashboard/explore/by-tasks",
                    icon: (
                      <IconChecklist className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                    ),
                  }}
                  className="pl-7"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
    }
    return <SidebarLink key={idx} link={link} />;
  };

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden md:flex-row",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
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
                  <img
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

      {/* Render the page content */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}

const Logo = () => {
  return (
    <Link
      href="#"
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
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </Link>
  );
};