"use client";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

export const GlareCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const refElement = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;

    const tiltX = (py - 0.5) * 16;
    const tiltY = (px - 0.5) * -16;
    const glareX = px * 100;
    const glareY = py * 100;

    if (refElement.current) {
      refElement.current.style.setProperty("transform", `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`);
      refElement.current.style.setProperty("--glare-x", `${glareX}%`);
      refElement.current.style.setProperty("--glare-y", `${glareY}%`);
    }

    setHovered(true);
  };

  const handlePointerLeave = () => {
    if (refElement.current) {
      refElement.current.style.setProperty("transform", `rotateX(0deg) rotateY(0deg)`);
      refElement.current.style.setProperty("--glare-x", `50%`);
      refElement.current.style.setProperty("--glare-y", `50%`);
    }
    setHovered(false);
  };

  return (
    <div
      ref={refElement}
      className={cn(
        "relative w-[120px] aspect-square rounded-xl overflow-hidden transition-transform duration-300 will-change-transform cursor-pointer",
        className
      )}
      style={{
        "--glare-x": "50%",
        "--glare-y": "50%",
      } as React.CSSProperties}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Blue glare effect using #3b82f6 */}
      <div
        className={cn(
          "absolute inset-0 z-10 pointer-events-none transition-opacity duration-300",
          hovered ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `radial-gradient(
            100px circle at var(--glare-x) var(--glare-y),
            rgba(59, 130, 246, 0.35),
            transparent 70%
          )`,
        }}
      />
      <div className="relative z-20 h-full w-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};
