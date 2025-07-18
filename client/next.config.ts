import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['wagmi', 'viem'],
  transpilePackages: ['@rainbow-me/rainbowkit'],
  images: {
    domains: [
      "api.microlink.io", // Microlink Image Preview
      "assets.aceternity.com", // Allow avatar image in SidebarDemo
      "startup-template-sage.vercel.app", // Allow hero video thumbnails
      "ui.aceternity.com", // Allow linear webp images
      "fiverr-res.cloudinary.com", // Allow Fiverr images
      "tailwindcss.com", // Allow Tailwind component images
      "res.cloudinary.com", // Allow Cloudinary images
    ],
  },
};

export default nextConfig;
