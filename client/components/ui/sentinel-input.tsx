import * as React from "react";
import { cn } from "@/lib/utils";

export interface SentinelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const SentinelInput = React.forwardRef<HTMLInputElement, SentinelInputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-2 sm:gap-3.5">
        {label && (
          <label className="text-xs font-medium text-sentinel-muted">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-[37px] w-full rounded-md border border-sentinel-border bg-sentinel-bg px-3 py-2 text-sm text-sentinel-text placeholder:text-sentinel-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sentinel-green disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
SentinelInput.displayName = "SentinelInput";

export { SentinelInput };
