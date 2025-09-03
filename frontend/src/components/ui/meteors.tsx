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
  const meteors = Array.from({ length: number }, (_, i) => {
    const duration = Math.random() * (maxDuration - minDuration) + minDuration;
    const delay = Math.random() * (maxDelay - minDelay) + minDelay;
    
    return {
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        '--duration': `${duration}s`,
        transform: `rotate(${angle}deg)`,
      } as React.CSSProperties & { '--duration': string },
    };
  });

  // Debug log
  console.log('Meteors rendered:', meteors.length);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className={cn(
            "absolute h-2 w-2 rounded-full bg-white shadow-[0_0_8px_4px_rgba(255,255,255,0.3)] animate-meteor",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-1/2 before:w-20 before:h-0.5 before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent"
          )}
          style={meteor.style}
        />
      ))}
    </div>
  );
}