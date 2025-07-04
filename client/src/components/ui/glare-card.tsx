"use client";
import { cn } from "@/lib/utils";
import { useRef } from "react";

export const GlareCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const refElement = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;

    // Tilt: max 12deg
    const tiltX = (py - 0.5) * 16;
    const tiltY = (px - 0.5) * -16;

    // Glare position
    const glareX = px * 100;
    const glareY = py * 100;

    if (refElement.current) {
      refElement.current.style.setProperty(
        "transform",
        `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
      );
      refElement.current.style.setProperty("--glare-x", `${glareX}%`);
      refElement.current.style.setProperty("--glare-y", `${glareY}%`);
    }
  };

  const handlePointerLeave = () => {
    if (refElement.current) {
      refElement.current.style.setProperty("transform", `rotateX(0deg) rotateY(0deg)`);
      refElement.current.style.setProperty("--glare-x", `50%`);
      refElement.current.style.setProperty("--glare-y", `50%`);
    }
  };

  return (
    <div
      ref={refElement}
      className={cn(
        "relative w-[120px] aspect-square rounded-xl overflow-hidden transition-transform duration-300 will-change-transform bg-[var(--color-surface)] hover:scale-105 hover:shadow-xl cursor-pointer",
        className
      )}
      style={{
        "--glare-x": "50%",
        "--glare-y": "50%",
      } as React.CSSProperties}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Subtle blue glare */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(59,130,246,0.10) 0%, transparent 70%)",
          transition: "background-position 0.2s",
        }}
      />
      <div className="relative z-20 h-full w-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};
