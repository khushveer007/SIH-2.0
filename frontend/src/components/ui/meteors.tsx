"use client";

import { cn } from "../utils/cn";

interface MeteorsProps {
  number?: number;
  minDelay?: number;
  maxDelay?: number;
  minDuration?: number;
  maxDuration?: number;
  angle?: number;
  className?: string;
}

export function Meteors({
  number = 8,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 1.5,
  maxDuration = 3,
  angle = 215,
  className,
}: MeteorsProps) {
  const meteors = Array.from({ length: number }, (_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * (maxDelay - minDelay) + minDelay}s`,
      animationDuration: `${Math.random() * (maxDuration - minDuration) + minDuration}s`,
      transform: `rotate(${angle}deg)`,
    },
  }));

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className={cn(
            "absolute h-0.5 w-0.5 rounded-full bg-blue-500 shadow-[0_0_0_1px_#ffffff10] animate-meteor",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-1/2 before:w-12 before:h-px before:bg-gradient-to-r before:from-transparent before:via-blue-500 before:to-transparent"
          )}
          style={meteor.style}
        />
      ))}
    </div>
  );
}