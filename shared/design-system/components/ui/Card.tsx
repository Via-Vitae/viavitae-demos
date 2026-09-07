import { type HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

/**
 * Card — container with border, rounded corners, and optional shadow.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          "rounded-lg border bg-card text-card-foreground shadow-sm",
          padding === "none" && "p-0",
          padding === "sm" && "p-3",
          padding === "md" && "p-6",
          padding === "lg" && "p-8",
          className,
        )}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";
