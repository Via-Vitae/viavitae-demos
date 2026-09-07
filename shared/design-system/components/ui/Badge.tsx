import { type HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info";
}

/**
 * Badge — small label for status, tier, or category indicators.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={twMerge(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
          variant === "default" && "bg-primary/10 text-primary",
          variant === "success" && "bg-green-100 text-green-800",
          variant === "warning" && "bg-yellow-100 text-yellow-800",
          variant === "danger" && "bg-red-100 text-red-800",
          variant === "info" && "bg-blue-100 text-blue-800",
          className,
        )}
        {...props}
      />
    );
  },
);

Badge.displayName = "Badge";
