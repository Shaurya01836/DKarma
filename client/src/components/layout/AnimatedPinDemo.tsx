"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PinContainer } from "../ui/3d-pin";
import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export function AnimatedPinDemo() {
  const cards = [
    {
      title: "Website Development",
      href: "/services/website-development",
      image:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_2.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156477/website-development.png",
    },
    {
      title: "Video Editing",
      href: "/services/video-editing",
      image:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_2.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156494/video-editing.png",
    },
    {
      title: "Software Development",
      href: "/services/software-development",
      image:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_2.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156476/software-development.png",
    },
    {
      title: "SEO",
      href: "/services/seo",
      image:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_2.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156488/seo.png",
    },
    {
      title: "Architecture & Interior Design",
      href: "/services/architecture-interior-design",
      image:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_2.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156473/architecture-design.png",
    },
    {
      title: "Book Design",
      href: "/services/book-design",
      image:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_2.0/v1/attachments/generic_asset/asset/af48c6702af221956ea7adf0055854e6-1745826082297/Book%20Design.png",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.08),transparent_50%)]" />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <StarIcon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-slate-300">
              Popular Services
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Trending Services
            <br />
            <span className="bg-gradient-to-r from-primary via-primary-hover to-primary bg-clip-text text-transparent">
              in High Demand
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-300 leading-relaxed">
            Discover the most sought-after services that are transforming
            businesses and creating opportunities for talented professionals
            worldwide.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="flex flex-wrap justify-center w-full gap-6 md:gap-10 xl:gap-20 max-w-full">
          {cards.map((card, index) => {
            const isInternal = card.href && card.href.startsWith("/");
            const cardContent = (
              <PinContainer
                key={index}
                title={card.title}
                href={card.href}
                containerClassName="flex-none w-[8rem] h-[10rem]"
              >
                <div className="w-[10rem] h-[10rem]">
                  <Image
                    src={card.image as string}
                    alt={card.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </PinContainer>
            );
            return isInternal ? (
              <Link href={card.href} key={index} legacyBehavior>
                <a style={{ textDecoration: "none" }}>{cardContent}</a>
              </Link>
            ) : (
              cardContent
            );
          })}
        </div>
      </div>
    </section>
  );
}
