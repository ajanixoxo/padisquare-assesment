import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className = "", onClick }: CardProps) {
  const baseStyles =
    "border border-[rgba(21,156,71,0.35)] rounded-lg bg-[rgba(5,11,7,0.8)] backdrop-blur-sm";
  const interactiveStyles = onClick
    ? "cursor-pointer hover:border-[rgba(21,156,71,0.5)] transition-colors"
    : "";

  return (
    <div
      className={`${baseStyles} ${interactiveStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
