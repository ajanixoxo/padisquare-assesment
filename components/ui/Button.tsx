import * as React from "react";
import { cn } from "@/lib/utils/cn"; // Need to create this or use existing

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm",
      secondary: "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100",
      outline: "border border-neutral-200 bg-transparent hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900 text-neutral-900 dark:text-white",
      ghost: "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400",
      danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
    };

    const sizes = {
      sm: "h-9 px-3 text-xs",
      md: "h-11 px-6 text-sm",
      lg: "h-12 px-8 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
