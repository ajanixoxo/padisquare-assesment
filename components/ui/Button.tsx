import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  const baseStyles =
    "px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantStyles =
    variant === "primary"
      ? "bg-gradient-to-r from-[#159C47] to-[#1fb85a] text-white hover:opacity-90"
      : "";

  const style =
    variant === "secondary"
      ? {
          borderColor: "var(--border-green)",
          color: "var(--text-primary)",
          backgroundColor: "var(--button-bg)",
        }
      : {};

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className}`}
      style={style}
      onMouseEnter={
        variant === "secondary"
          ? (e) => {
              e.currentTarget.style.backgroundColor = "var(--button-hover)";
            }
          : undefined
      }
      onMouseLeave={
        variant === "secondary"
          ? (e) => {
              e.currentTarget.style.backgroundColor = "var(--button-bg)";
            }
          : undefined
      }
    >
      {children}
    </button>
  );
}
