"use client";
import React from "react";
import { PinContainer } from "../ui/3d-pin";

export function AnimatedPinDemo() {
  const cards = [
    {
      title: "Website Development",
      href: "#",
      image:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_2.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156477/website-development.png",
    },
    {
      title: "Video Editing",
      href: "#",
      image:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_2.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156494/video-editing.png",
    },
    {
      title: "Software Development",
      href: "#",
      image:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_2.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156476/software-development.png",
    },
    {
      title: "SEO",
      href: "#",
      image:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_2.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156488/seo.png",
    },
    {
      title: "Architecture & Interior Design",
      href: "#",
      image:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_2.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156473/architecture-design.png",
    },
    {
      title: "Book Design",
      href: "#",
      image:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_2.0/v1/attachments/generic_asset/asset/af48c6702af221956ea7adf0055854e6-1745826082297/Book%20Design.png",
    },
  ];

  return (
    <div className="w-full mx-auto py-16 px-4 overflow-hidden">
      <div className="flex flex-wrap justify-center w-full gap-6 md:gap-10 xl:gap-20 max-w-full">
        {cards.map((card, index) => (
          <PinContainer
            key={index}
            title={card.title}
            href={card.href}
            containerClassName="flex-none w-[8rem] h-[10rem]"
          >
            <div className="flex flex-col p-2 tracking-tight text-slate-100/50 w-[10rem] h-[10rem]">
              <h3 className="text-sm font-bold text-slate-100 mb-2">
                {card.title}
              </h3>
              <div
                className="flex-1 w-full rounded-md bg-cover bg-center"
                style={{
                  backgroundImage: `url(${card.image})`,
                }}
              />
            </div>
          </PinContainer>
        ))}
      </div>
    </div>
  );
}
