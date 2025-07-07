import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "api.microlink.io", // Microlink Image Preview
      "assets.aceternity.com", // Allow avatar image in SidebarDemo
    ],
  },
};

export default nextConfig;
