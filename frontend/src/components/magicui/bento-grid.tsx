import { ArrowRightIcon } from "@radix-ui/react-icons";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full max-w-5xl mx-auto auto-rows-[14rem] grid-cols-4 gap-3",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-lg",
      // dark theme styles to match website
      "bg-neutral-900/60 backdrop-blur-sm border border-neutral-800/60",
      "transform-gpu [box-shadow:0_0_0_1px_rgba(255,255,255,.03),0_2px_4px_rgba(0,0,0,.2),0_12px_24px_rgba(0,0,0,.15)]",
      "hover:bg-neutral-800/70 transition-all duration-300",
      className,
    )}
    {...props}
  >
    <div>{background}</div>
    <div className="p-3">
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-6">
        <div className="flex justify-center items-center mb-2">
          <Icon className="h-8 w-8 transform-gpu text-neutral-300 transition-all duration-300 ease-in-out group-hover:scale-75" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-100 text-center">
          {name}
        </h3>
        <p className="max-w-lg text-sm text-neutral-400 text-center">{description}</p>
      </div>

      <div
        className={cn(
          "lg:hidden pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
        )}
      >
        <a 
          href={href}
          className="pointer-events-auto text-sm text-indigo-400 hover:text-indigo-300 transition-colors flex items-center"
        >
          {cta}
          <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
        </a>
      </div>
    </div>

    <div
      className={cn(
        "hidden lg:flex pointer-events-none absolute bottom-0 w-full translate-y-10 transform-gpu flex-row items-center p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <a 
        href={href}
        className="pointer-events-auto text-sm text-indigo-400 hover:text-indigo-300 transition-colors flex items-center"
      >
        {cta}
        <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
      </a>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-neutral-700/10" />
  </div>
);

export { BentoCard, BentoGrid };
