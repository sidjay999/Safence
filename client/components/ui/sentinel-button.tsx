import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sentinelButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sentinel-green disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-sentinel-green text-white hover:bg-sentinel-green/90",
        ghost: "bg-transparent text-sentinel-muted hover:text-sentinel-text",
      },
      size: {
        default: "h-10 px-4 py-2",
        lg: "h-[40px] px-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface SentinelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sentinelButtonVariants> {
  asChild?: boolean;
}

const SentinelButton = React.forwardRef<HTMLButtonElement, SentinelButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(sentinelButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
SentinelButton.displayName = "SentinelButton";

export { SentinelButton, sentinelButtonVariants };
