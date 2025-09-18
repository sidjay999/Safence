import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "./chevron-down";

export interface SentinelDropdownProps {
  label?: string;
  value?: string;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
}

const SentinelDropdown = React.forwardRef<
  HTMLButtonElement,
  SentinelDropdownProps
>(
  (
    { className, label, value, options = [], placeholder, onChange, ...props },
    ref,
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleSelect = (optionValue: string) => {
      onChange?.(optionValue);
      setIsOpen(false);
    };

    const selectedOption = options.find((option) => option.value === value);

    return (
      <div className="relative">
        {label && (
          <label className="mb-2 sm:mb-3.5 block text-sm font-medium text-sentinel-muted">
            {label}
          </label>
        )}
        <button
          type="button"
          className={cn(
            "flex h-[39px] w-full items-center justify-between rounded-md border border-sentinel-border bg-sentinel-bg px-3 py-2 text-sm text-sentinel-text focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sentinel-green",
            className,
          )}
          onClick={() => setIsOpen(!isOpen)}
          ref={ref}
          {...props}
        >
          <span
            className={cn(
              selectedOption ? "text-sentinel-text" : "text-sentinel-muted",
            )}
          >
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 text-sentinel-text" />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full z-20 mt-1 w-full rounded-md border border-sentinel-border bg-sentinel-container shadow-lg">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className="w-full px-3 py-2 text-left text-sm text-sentinel-text hover:bg-sentinel-border focus:bg-sentinel-border focus:outline-none"
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  },
);
SentinelDropdown.displayName = "SentinelDropdown";

export { SentinelDropdown };
