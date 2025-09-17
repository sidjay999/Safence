import { cn } from "@/lib/utils";

interface ChevronDownProps {
  className?: string;
  size?: number;
}

export function ChevronDown({ className, size = 16 }: ChevronDownProps) {
  return (
    <svg
      className={cn("", className)}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5462 5.51631C11.8078 5.25465 12.232 5.25465 12.4936 5.51631C12.7553 5.77796 12.7553 6.20207 12.4936 6.46373L8.47359 10.4837C8.21195 10.7454 7.78784 10.7454 7.52621 10.4837L3.50619 6.46373L3.46039 6.4127C3.24576 6.14953 3.26089 5.7616 3.50619 5.51631C3.75149 5.27101 4.13942 5.25587 4.40258 5.47051L4.45361 5.51631L7.9999 9.06261L11.5462 5.51631Z"
        fill="currentColor"
      />
    </svg>
  );
}
